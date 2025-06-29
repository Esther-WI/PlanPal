import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import EventList from "./EventList";
import EventDetails from "./EventDetails";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) r.json().then(setCurrentUser);
    });
  }, []);

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) setCurrentUser(null);
    });
  }

  return (
    <Router>
      <header>
        <h1>PenPal</h1>
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Please login or sign up</p>
        )}
        <nav>
          <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> |{" "}
          <Link to="/events">Events</Link>
        </nav>
      </header>

      <main>
        <Switch>
          <Route path="/login">
            <LoginForm onLogin={setCurrentUser} />
          </Route>
          <Route path="/signup">
            <SignupForm onSignup={setCurrentUser} />
          </Route>
          <Route exact path="/events">
            <EventList />
          </Route>
          <Route path="/events/:id">
            <EventDetails currentUser={currentUser} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
