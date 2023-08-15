import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// Component for displaying ticket details and allowing editing.
const TicketDetails = ({ ticket, handleCloseTicket }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState({ ...ticket });

  // Event handler for input change.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Event handler for editing the ticket.
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Event handler for saving the updated ticket.
  const handleSave = async () => {
    try {
      const response = await fetch(`https://fts-repairs-backend.onrender.com/api/tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTicket),
      });

      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }

      const updatedTicketData = await response.json();
      setUpdatedTicket(updatedTicketData);
      setIsEditing(false);

    } catch (error) {
      console.log(error);
    }
  };

  // Event handler for closing the ticket.
  const handleClose = () => {
    handleCloseTicket(ticket._id);

   
   
  };

  return (
    <div>
      {isEditing ? (
        <div className="ticket-details">
          <input
            type="text"
            name="title"
            value={updatedTicket.title}
            onChange={handleInputChange}
          />
          <textarea
            name="text"
            value={updatedTicket.text}
            onChange={handleInputChange}
          />

          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <div className="ticket-details">
          <h4>{ticket.title}</h4>
          <p>
            <strong>Description: </strong>
            {ticket.text}
          </p>
          <p>
            <strong>Open/Close: </strong>
            {ticket.status}
          </p>
          <p>
            <strong>Technician: </strong>
            {ticket.tech}
          </p>
          <p>
            <strong>Date Created: </strong>
            {formatDistanceToNow(new Date(ticket.createdAt), {
              addSuffix: true,
            })}
          </p>
          {ticket.status === "open" && (
            <button className="close" onClick={handleClose}>
              Close
            </button>
          )}
          <button className="edit" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
