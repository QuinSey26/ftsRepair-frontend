import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


 // The Home component represents the home page of the application.
const Home = () => {
  // Get the current date and time
  const currentDate = new Date().toLocaleString();

  // State variable to store the total number of open tickets
  const [totalOpenTickets, setTotalOpenTickets] = useState(0);

  // Fetch the total number of open tickets from the server
  useEffect(() => {
    const fetchTotalOpenTickets = async () => {
      try {
        // Send a GET request to the "/api/tickets/open" endpoint
        const response = await fetch("/api/tickets/open");

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        // Parse the response as JSON
        const json = await response.json();

        // Update the state with the total number of open tickets
        setTotalOpenTickets(json.length);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchTotalOpenTickets function when the component mounts
    fetchTotalOpenTickets();
  }, []);

  return (
    <div className="home">
      <h2>Welcome</h2>

      <div className="time">
        <p><strong>Current Date and Time:</strong> {currentDate}</p>
      </div>

      <div className="open-total">
        <h4>Total Number Open Tickets</h4>
        <p>{totalOpenTickets}</p>
      </div>

      <div className="home-links">
        <Link to="/open">Open Tickets</Link>
        <Link to="/add-ticket">Add Tickets</Link>
      </div>
    </div>
  );
};

export default Home;