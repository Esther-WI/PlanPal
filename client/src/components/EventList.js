import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/events")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <button
        onClick={() => navigate("/add-event")}
        style={{ marginBottom: "1rem" }}
      >
        + Create New Event
      </button>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {events.map((e) => (
          <li key={e.id}>
            <Link
              to={`/events/${e.id}`}
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default EventList;
