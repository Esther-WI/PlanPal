import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate(); // ✅

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/events"); // ✅ Redirect to events
        });
      } else {
        r.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        value={formData.password}
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
