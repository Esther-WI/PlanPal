import { useState } from "react";
import { Link } from "react-router-dom";

function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onSignup(user));
      } else {
        alert("Signup failed");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <input
        name="username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="Username"
      />
      <input
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>

      <p style={{ marginTop: "1rem" }}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "#00d9ff", textDecoration: "underline" }}
        >
          Login here
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
