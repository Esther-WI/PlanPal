#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Event, RSVP
# Add your model imports


# Views go here!

class Signup(Resource):
    def post(self):
        data = request.get_json()
        user = User(
            username= data['username'],
            email = data['email'],
        )
        user.password = data['password']
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return user.to_dict(), 201
    
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username = data['username']).first()
        if user and user.authenticate(data['password']):
            session['user_id']=user.id
            return user.to_dict(),200
        return {'error': 'Invalid credentials'}, 401
    
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            return user.to_dict(), 200
        return {'error': 'Not logged in'}, 401
    

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': 'Logged out successfully'}, 200
    
class Events(Resource):
    def get(self):
        return[e.to_dict() for e in Event.query.all()], 200
    
    def post(self):
        data = request.get_json()
        new_event =  Event(
            title = data['title'],
            description = data.get('description'),
            date = data['date'],
            location = data['location'],
            user_id = session.get('user_id')
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict(), 201
    
class EventByID(Resource):
    def get(self, id):
        event = Event.query.get(id)
        if event:
            event_dict = event.to_dict()
            event_dict['attendees'] = [u.to_dict() for u in event.attendees]
            user_id = session.get('user_id')
            if user_id:
                rsvp = RSVP.query.filter_by(event_id=id, user_id=user_id).first()
                if rsvp:
                    event_dict['rsvp_status'] = rsvp.status
            return event_dict, 200
        return {'error': 'Event not found'}, 404

    

class RSVPs(Resource):
    def post(self):
        data = request.get_json()
        new_rsvp = RSVP(
            status=data['status'],
            event_id=data['event_id'],
            user_id=session.get('user_id')
        )
        db.session.add(new_rsvp)
        db.session.commit()
        return new_rsvp.to_dict(), 201


    
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(Events, '/events')
api.add_resource(EventByID, '/events/<int:id>')
api.add_resource(RSVPs, '/rsvps')





if __name__ == '__main__':
    app.run(port=5555, debug=True)

