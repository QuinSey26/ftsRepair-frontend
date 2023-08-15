import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Custom hook for handling login functionality.
export const useLogin = () => {
  const [error, setError] = useState(null); // State variable to store error message
  const [isLoading, setIsLoading] = useState(null); // State variable to track loading state
  const { dispatch } = useAuthContext(); // Access the authentication context

  // Function to handle user login.
  const login = async (email, password, role) => {
    setIsLoading(true); // Set loading state to true
    setError(null); // Clear any previous error

    // Send a POST request to the login endpoint with user credentials and role
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const json = await response.json(); // Parse the response as JSON

    if (!response.ok) {
      setIsLoading(false); // Set loading state to false
      setError(json.error); // Set the error message
    }

    if (response.ok) {
      // Save the user and role to local storage
      localStorage.setItem("user", JSON.stringify(json));
      localStorage.setItem("role", role);

      // Update the authentication context
      dispatch({ type: "LOGIN", payload: json });

      // Update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error }; // Return the login function, isLoading state, and error state
};
