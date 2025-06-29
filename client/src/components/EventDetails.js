import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails({ currentUser }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then(setEvent);
  }, [id]);

  function handleRSVP() {
    fetch("/rsvps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: id, status: "Going" }),
    }).then(() => alert("RSVP submitted!"));
  }

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <button onClick={handleRSVP}>RSVP</button>
    </div>
  );
}
export default EventDetails;
