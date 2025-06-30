import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate(); // ✅

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onSignup(user);
          navigate("/events"); // ✅ Redirect to events
        });
      } else {
        r.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        value={formData.password}
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
