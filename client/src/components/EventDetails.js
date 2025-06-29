import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails({ currentUser }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("Going");


  useEffect(() => {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEvent(data);
        if (data.rsvp_status) {
          setStatus(data.rsvp_status);
        }
      });
  }, [id]);


  function handleRSVP() {
    fetch("/rsvps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: id, status: status }),
    }).then(() => alert("RSVP submitted!"));
  }

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong>
        {event.location}
      </p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Going">Going</option>
        <option value="Not Going">Not Going</option>
        <option value="Maybe">Maybe</option>
      </select>
      <button onClick={handleRSVP}>RSVP</button>
    </div>
  );
}
export default EventDetails;
