import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { TicketContext } from "../context/TicketContext";
import { useContext } from "react";

// Component for displaying ticket details and allowing editing and closing of the ticket.
const TicketDetails = ({ ticket, handleCloseTicket }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState({ ...ticket });
  const { setEditedTickets } = useContext(TicketContext);

  // Handles the input change event and updates the corresponding field in the updated ticket state.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Sets the isEditing state to true, enabling the editing mode.
  const handleEdit = () => {
    setIsEditing(true);
  };

  //  Handles the save action by sending an API request to update the ticket details.
  // If successful, updates the state and adds the updated ticket to the edited tickets list.

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://fts-repairs-backend.onrender.com/api/tickets/${ticket._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTicket),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }

      setUpdatedTicket(updatedTicket);
      setIsEditing(false);

      setEditedTickets((prevEditedTickets) => [
        ...prevEditedTickets,
        updatedTicket,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // Handles the close action by sending an API request to update the ticket status to "closed".
  // If successful, calls the handleCloseTicket function to remove the ticket from the list.
  const handleClose = async () => {
    try {
      const response = await fetch(
        `https://fts-repairs-backend.onrender.com/api/tickets/${ticket._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "closed" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to close ticket");
      }

      handleCloseTicket(ticket._id);
    } catch (error) {
      console.log(error);
    }
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
          <h4>{updatedTicket.title}</h4>
          <p>
            <strong>Description: </strong>
            {updatedTicket.text}
          </p>
          <p>
            <strong>Open/Close: </strong>
            {updatedTicket.status}
          </p>
          <p>
            <strong>Technician: </strong>
            {updatedTicket.tech}
          </p>
          <p>
            <strong>Date Created: </strong>
            {formatDistanceToNow(new Date(updatedTicket.createdAt), {
              addSuffix: true,
            })}
          </p>
          {updatedTicket.status === "open" && (
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
