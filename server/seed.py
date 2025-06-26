#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app

from models import User, Event, RSVP
from config import app, db
import random

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Clearing db...")
        User.query.delete()
        Event.query.delete()
        RSVP.query.delete()

        print("Seeding users...'")
        users = []
        for _ in range(5):
            user = User(
                username = fake.user_name(),
                email = fake.email()
                )
            user.password = "test123"
            db.session.add(user)
            users.append(user)

        print("Seeding events...")
        events = []
        for _ in range(5):
            event = Event(
                title = fake.catch_phrase(),
                description = fake.text(),
                date = fake.date_time_this_year(),
                location = fake.city(),
                user=random.choice(users)
            )
            db.session.add(event)
            events.append(event)

        print("Seeding RSVPs...")
        for _ in range(10):
            rsvp = RSVP(
                status = random.choice(['Going', 'Not Going', 'Maybe']),
                user=random.choice(users),
                event=random.choice(events)
                )
            db.session.add(rsvp)
        db.session.commit()
        print("Seeding complete!")

