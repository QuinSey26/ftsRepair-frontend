import { createContext, useState } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [editedTickets, setEditedTickets] = useState([]);

  return (
    <TicketContext.Provider value={{ editedTickets, setEditedTickets }}>
      {children}
    </TicketContext.Provider>
  );
};
