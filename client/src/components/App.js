import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import EventList from "./EventList"; // Your event list component
import AddEventForm from "./AddEventForm"; // Optional if you have event creation

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check session on load
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then(setUser);
      }
    });
  }, []);

  // ✅ Logout function
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null);
      navigate("/login");
    });
  }

  return (
    <div>
      <nav style={{ padding: "10px", background: "#f0f0f0" }}>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Welcome, {user.username}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        {/* ✅ Public Routes */}
        <Route
          path="/signup"
          element={
            user ? <Navigate to="/events" /> : <SignupForm onSignup={setUser} />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/events" /> : <LoginForm onLogin={setUser} />
          }
        />

        {/* ✅ Protected Route */}
        <Route
          path="/events"
          element={user ? <EventList user={user} /> : <Navigate to="/login" />}
        />

        {/* Optional: Add Event Page */}
        <Route
          path="/add-event"
          element={
            user ? <AddEventForm user={user} /> : <Navigate to="/login" />
          }
        />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={<Navigate to={user ? "/events" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default AppWrapper;
