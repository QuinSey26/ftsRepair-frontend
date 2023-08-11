import React, { createContext, useEffect, useState } from "react";

// Create a WebSocket context
export const WebSocketContext = createContext();

// WebSocketProvider component
export const WebSocketProvider = ({ children }) => {
  // State to store the WebSocket connection and tickets
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    // Create a new WebSocket connection
    const socket = new WebSocket("ws://localhost:8000");

    // Event handler for when the WebSocket connection is opened
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    // Event handler for when a message is received from the WebSocket server
    socket.onmessage = (event) => {
      // Parse the received data as a JSON object
      const updatedTicket = JSON.parse(event.data);
      setWebSocket((prevWebSocket) => {
        // Update the ticket in the current WebSocket data
        const updatedTickets = prevWebSocket.tickets.map((ticket) =>
          ticket._id === updatedTicket._id ? updatedTicket : ticket
        );
        return { ...prevWebSocket, tickets: updatedTickets };
      });
    };

    // Event handler for when the WebSocket connection is closed
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Set the WebSocket connection and initial tickets state
    setWebSocket({ socket, tickets: [] });

    // Clean up function to close the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  // Render the WebSocket context provider with the WebSocket connection as the value
  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};