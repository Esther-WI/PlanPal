import { useNavigate } from "react-router-dom";

function Header({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
        navigate("/signup");
      }
    });
  }

  return (
    <header
      style={{
        backgroundColor: "#141b34",
        padding: "1rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 0 15px #00d9ff55",
      }}
    >
      <h1
        style={{
          fontFamily: "Permanent Marker, cursive",
          fontSize: "2.5rem",
          margin: "0.5rem 0",
        }}
      >
        PenPal
      </h1>
      {currentUser ? (
        <div>
          <p style={{ marginBottom: "0.5rem" }}>
            Welcome, <strong>{currentUser.username}</strong>
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Sign up to get started, or log in if you already have an account.</p>
      )}
    </header>
  );
}

export default Header;
