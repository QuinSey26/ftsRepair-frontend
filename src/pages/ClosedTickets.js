import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../context/WebSocketContext";
import TicketDetails from "../components/TicketDetails";


 // A React component that displays a list of closed tickets.
const ClosedTickets = () => {
  const webSocket = useContext(WebSocketContext);
  const [tickets, setTickets] = useState(null);

   // Fetches the closed tickets from the server.
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("https://fts-repairs-backend.onrender.com/api/tickets/closed");

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

  
   // Listens for updates from the WebSocket and updates the ticket list accordingly.
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

  return (
    <div className="closed-tickets">
      <h2>Closed Tickets</h2>
      <div className="tickets">
        {tickets &&
          tickets.map((ticket) => (
            <TicketDetails ticket={ticket} key={ticket._id} />
          ))}
      </div>
    </div>
  );
};

export default ClosedTickets;