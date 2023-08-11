import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';

// Create a root element to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application inside the root element
root.render(
  // Enable strict mode for additional checks and warnings in development mode
  <React.StrictMode>
    {/* Provide the authentication context to the application */}
    <AuthContextProvider>
      {/* Provide the WebSocket context to the application */}
      <WebSocketProvider>
        {/* Render the main App component */}
        <App />
      </WebSocketProvider>
    </AuthContextProvider>
  </React.StrictMode>
);