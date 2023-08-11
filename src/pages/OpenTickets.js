import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../context/WebSocketContext";
import TicketDetails from "../components/TicketDetails";

// Component to display open tickets and handle ticket updates
const OpenTickets = () => {
  const webSocket = useContext(WebSocketContext);
  const [tickets, setTickets] = useState(null);

  // Fetches the open tickets from the server.
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets/open");

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const json = await response.json();
        setTickets(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTickets();
  }, []);

  // Listens for ticket updates from the WebSocket and updates the ticket list accordingly.
  useEffect(() => {
    if (webSocket && webSocket.socket) {
      webSocket.socket.onmessage = (event) => {
        const updatedTicket = JSON.parse(event.data);
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket._id === updatedTicket._id ? updatedTicket : ticket
          )
        );
      };
    }
  }, [webSocket]);

  // Handles the closing of a ticket.
  const handleCloseTicket = async (ticketId) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "closed" }),
      });

      if (!response.ok) {
        throw new Error("Failed to close ticket");
      }

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tickets">
      <h2>Open Tickets</h2>
      <div className="tickets">
        {tickets &&
          tickets.map((ticket) => (
            <TicketDetails
              ticket={ticket}
              handleCloseTicket={handleCloseTicket}
              key={ticket._id}
            />
          ))}
      </div>
    </div>
  );
};

export default OpenTickets;
