import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails({ currentUser }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("Going");

  function fetchEvent() {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEvent(data);
        if (data.rsvp_status) {
          setStatus(data.rsvp_status);
        }
      });
  }

  useEffect(() => {
    fetchEvent();
  }, [id]);

  function handleRSVP() {
    fetch("/rsvps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: id, status: status }),
    }).then(() => {
      alert("RSVP submitted!");
      fetchEvent(); // 🔁 refresh attendees list
    });
  }

  if (!event) return <p>Loading...</p>;

  return (
    <div
      style={{
        backgroundColor: "#141b34",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "700px",
        margin: "2rem auto",
        boxShadow: "0 0 20px #00d9ff33",
      }}
    >
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Going">Going</option>
        <option value="Not Going">Not Going</option>
        <option value="Maybe">Maybe</option>
      </select>
      <button onClick={handleRSVP}>RSVP</button>

      {event.attendees && event.attendees.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <h4>Attendees:</h4>
          <ul>
            {event.attendees.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
