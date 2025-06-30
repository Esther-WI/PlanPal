import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import Header from "./Header";
import AddEventForm from "./AddEventForm";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setCurrentUser(user);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Router>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/events" />
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? (
                <Navigate to="/events" />
              ) : (
                <SignupForm onSignup={setCurrentUser} />
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/events" />
              ) : (
                <LoginForm onLogin={setCurrentUser} />
              )
            }
          />
          <Route
            path="/events"
            element={currentUser ? <EventList /> : <Navigate to="/signup" />}
          />
          <Route
            path="/events/:id"
            element={
              currentUser ? (
                <EventDetails currentUser={currentUser} />
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
          <Route
            path="/add-event"
            element={currentUser ? <AddEventForm /> : <Navigate to="/signup" />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
