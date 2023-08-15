import { useState } from "react";
import { useNavigate } from "react-router-dom";

// A form component for adding a new ticket.
const TicketAddForm = () => {
  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tech, setTech] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  // Hook for navigation
  const navigate = useNavigate();

  // Handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a ticket object with the form input values
    const ticket = { title, text, tech, status };

    // Send a POST request to the server to add the ticket
    const response = await fetch("https://fts-repairs-backend.onrender.com/api/tickets", {
      method: "POST",
      body: JSON.stringify(ticket),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the request is successful, reset the form and navigate to the 'open' page
    if (response.ok) {
      setError(null);
      setTitle("");
      setTech("");
      setText("");
      setStatus("");
      console.log("New ticket added:", ticket);
      navigate("/open");
    }
  };

  return (
    <form className="add" onSubmit={handleSubmit}>
      <h3>Add a New Ticket</h3>

      <label>Customer:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <label>Responsible Tech:</label>
      <input
        type="text"
        onChange={(e) => setTech(e.target.value)}
        value={tech}
      />

      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>

      <button>Add Repair</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TicketAddForm;
