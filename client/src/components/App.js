import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import EventList from "./EventList";
import EventDetails from "./EventDetails";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();


  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) r.json().then(setCurrentUser);
    });
  }, []);

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
        history.push("/login"); // 👈 redirect to login page
      }
    });
  }


  return (
    <Router>
      <header
        style={{
          backgroundColor: "#141b34",
          padding: "1rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 0 15px #00d9ff55",
        }}
      >
        <h1
          style={{
            fontFamily: "Permanent Marker, cursive",
            fontSize: "2.5rem",
            margin: "0.5rem 0",
          }}
        >
          PenPal
        </h1>
        {currentUser ? (
          <div>
            <p style={{ marginBottom: "0.5rem" }}>
              Welcome, <strong>{currentUser.username}</strong>
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Please login or sign up</p>
        )}
        <nav style={{ marginTop: "1rem" }}>
          <Link to="/login" style={{ marginRight: "1rem" }}>
            Login
          </Link>
          <Link to="/signup" style={{ marginRight: "1rem" }}>
            Signup
          </Link>{" "}
          | <Link to="/events">Events</Link>
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
