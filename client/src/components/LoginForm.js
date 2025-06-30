import { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((user) => onLogin(user));
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Something went wrong. Try again.");
      });
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>

      {/* Optional Sign Up link */}
      <p style={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <a
          href="/signup"
          style={{ color: "#00d9ff", textDecoration: "underline" }}
        >
          Sign up here
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
