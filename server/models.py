from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import datetime

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    events = db.relationship('Event', backref = 'user', cascade='all, delete-orphan')
    rsvps = db.relationship('RSVP', backref='user', cascade='all, delete-orphan')

    attending_events = association_proxy('rsvps', 'event')
    serialize_rules = ('-password_hash', '-events.user', '-rsvps.user')

    @property
    def password(self):
        raise AttributeError("Password is not readable")
    @password.setter
    def password(self, plain_text):
        self._password_hash = generate_password_hash(plain_text)

    def authenticate(self, password_input):
        return check_password_hash(self._password_hash, password_input)
    
    @validates('email')
    def validate_email(self, key, value):
        if '@' not in value:
            raise ValueError('Invalid email address')
        return value
    

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    location = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    rsvps = db.relationship('RSVP', backref='event', cascade='all, delete-orphan')

    attendees = association_proxy('rsvps', 'user')
    serialize_rules = ('-user.events', '-rsvps.event')
    
   
class RSVP(db.Model, SerializerMixin):
    __tablename__ = 'rsvps'
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    serialize_rules = ('-user.rsvps', '-event.rsvps')