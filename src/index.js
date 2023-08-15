import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

// Create a root element to render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application inside the root element
root.render(
  // Enable strict mode for additional checks and warnings in development mode
  <React.StrictMode>
    {/* Provide the authentication context to the application */}
    <AuthContextProvider>
      <TicketProvider>
        {/* Render the main App component */}
        <App />
      </TicketProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
