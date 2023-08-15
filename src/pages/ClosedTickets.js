import { useEffect, useState } from "react";

import TicketDetails from "../components/TicketDetails";


 // A React component that displays a list of closed tickets.
const ClosedTickets = () => {

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