import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((event) => {
          alert("Event created!");
          navigate(`/events/${event.id}`);
        });
      } else {
        alert("Failed to create event.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Event</h2>
      <input
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Event Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
      />
      <input
        type="datetime-local"
        name="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <input
        name="location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        placeholder="Location"
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default AddEventForm;
