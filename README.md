#  PlanPal

PlanPal is a full-stack event management app where users can view events, RSVP to them, comment, and even create, edit, or delete events. It’s designed to help users stay informed, involved, and organized in their social or community life.

---

## Live Demo

- **Frontend**: [planpal-frontend-owkh.onrender.com](https://planpal-frontend-owkh.onrender.com)
- **Backend API**: [planpal-backend-iney.onrender.com](https://planpal-backend-iney.onrender.com)

---

##  Features

- View a list of all events.
- RSVP to an event with a selected status ("Going", "Maybe", "Not Going").
- Comment on any event.
- Logged-in users can create, edit, and delete their own events.
- Responsive and user-friendly interface.

---

## Project Structure

### Frontend (React - `/client`)

#### `App.jsx`
- Main React component.
- Defines the routes using React Router.
- Includes navigation and renders all other pages.

#### `EventDetails.jsx`
- Fetches single event info using its ID.
- Displays event details and attendee list.
- Allows RSVP and editing/deleting if current user is the creator.
- Shows a form to post a comment.

#### `EventList.jsx`
- Displays all events fetched from the API.
- Clicking an event takes you to its details page.

#### `SignupForm.jsx` / `LoginForm.jsx`
- Handle user signup and login using controlled form inputs and fetch to backend `/signup` and `/login`.

#### `NavBar.jsx`
- Renders navigation links between Home, Events, Login, Signup, and Logout.

---

### Backend (Flask - `/server`)

#### `app.py`
- Main entry point of the Flask app.
- Registers routes and resources for:
  - `/events` (GET, POST)
  - `/events/<id>` (PATCH, DELETE)
  - `/comments` (GET, POST)
  - `/rsvps` (POST)
  - `/signup`, `/login`, `/logout`

#### `models.py`
- Defines models:
  - `User` – has many events, comments, and RSVPs.
  - `Event` – belongs to a user, has many RSVPs and comments.
  - `Comment` – belongs to both a user and an event.
  - `RSVP` – many-to-many link between users and events, includes a `status` field.

#### `config.py`
- Sets up database and app configurations.
- Initializes SQLAlchemy, Marshmallow, CORS, and session settings.

---

##  API Endpoints

### Events
- `GET /events` – get all events.
- `POST /events` – create new event.
- `PATCH /events/<id>` – update event details.
- `DELETE /events/<id>` – remove an event.

### Comments
- `GET /comments?event_id=<id>` – get comments for specific event.
- `POST /comments` – add new comment.

### RSVPs
- `POST /rsvps` – submit or update RSVP for an event.

### Auth
- `POST /signup` – create new user.
- `POST /login` – log in existing user.
- `DELETE /logout` – log out user.

---

##  Tools & Tech

- **Frontend**: React, JSX, CSS, Netlify
- **Backend**: Flask, Flask-Restful, SQLAlchemy, Marshmallow, Render
- **Database**: SQLite (development)
- **Deployment**: Netlify (client), Render (server)

---

## CRUD Actions Implemented

- **Create**: Events, comments, users, RSVPs
- **Read**: All events, single event, comments, RSVP status
- **Update**: Events (PATCH), RSVP status
- **Delete**: Events, logout session

---

## Validation & Forms

- Formik is used for signup and login forms (with required field validation).
- Backend performs type and presence validation for model attributes like `title`, `date`, and `status`.

---

##  Routes

- `/` – Home
- `/events` – All events
- `/events/:id` – Event details
- `/login`, `/signup` – Auth pages

---

## Acknowledgements

- Moringa School Phase 4 Curriculum  
- Flask and React official docs  
- [React Router Docs](https://reactrouter.com)  
- [Formik Docs](https://formik.org)

---

##  License

This project is for educational purposes only.

