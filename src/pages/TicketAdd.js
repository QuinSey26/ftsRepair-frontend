import React from "react";
import TicketAddForm from "../components/TicketAddForm";

/**
 * TicketAdd component is responsible for rendering the form to add a new repair ticket.
 * It imports the TicketAddForm component and renders it within a div.
 */
const TicketAdd = () => {
  return (
    <div>
      <h2>Add New Repair Ticket</h2>
      <div>
        <TicketAddForm />
      </div>
    </div>
  );
};

export default TicketAdd;
