import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("Going");
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");


  function fetchEvent() {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
      setEvent(data);
      setTitle(data.title);
      setDescription(data.description);
      setDate(data.date);
      setLocation(data.location);
        if (data.rsvp_status) {
          setStatus(data.rsvp_status);
        }
      });
  }
  function fetchComments() {
    fetch(`/comments?event_id=${id}`)
      .then((r) => r.json())
      .then(setComments);
  }


  useEffect(() => {
    fetchEvent();
    fetchComments();
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

  function handleDelete() {
    fetch(`/events/${event.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        alert("Event deleted!");
        navigate("/events");
      }
    });
  }

  function handleEdit() {
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setLocation(event.location);
    setIsEditing(true);
    }

  function handleEditSubmit(e) {
    e.preventDefault();
    fetch(`/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        date,
        location,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setEvent(data);
        setIsEditing(false);
      });
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: commentInput, event_id: event.id }),
    })
      .then((r) => r.json())
      .then((newComment) => setComments([...comments, newComment]));
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
      <div>
        {/* ✅ UPDATED: Conditional rendering of form or event details */}
        {isEditing ? (
          <form onSubmit={handleEditSubmit} style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <br />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
            <br />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
          </>
        )}

        <p>Status: {status}</p>
        <button onClick={handleRSVP}>
          {status === "Going" ? "Cancel RSVP" : "RSVP"}
        </button>

        {/* ✅ Edit button (only shows if not editing) */}
        {!isEditing && (
          <button onClick={handleEdit} style={{ marginLeft: "10px" }}>
            Edit Event
          </button>
        )}
      </div>

      {event.attendees && event.attendees.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <h4>Attendees:</h4>
          <ul>
            {event.attendees.map((user, index) => (
              <li key={`${user.id}-${index}`}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}
      {currentUser && event.user_id === currentUser.id && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {currentUser && (
        <div style={{ marginTop: "2rem" }}>
          <h4>Comments:</h4>
          <form onSubmit={handleCommentSubmit} style={{ marginBottom: "1rem" }}>
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              style={{
                padding: "0.5rem",
                width: "80%",
                marginRight: "0.5rem",
                borderRadius: "6px",
              }}
            />
            <button type="submit">Post</button>
          </form>
          <ul>
            {comments.map((c, index) => (
              <li key={`${c.id}-${index}`}>
                <strong>{c.user?.username || "Unknown"}:</strong> {c.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
