import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Custom hook for user signup functionality.
export const useSignup = () => {
  // Initialize state variables
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // Access the authentication context using the useAuthContext hook
  const { dispatch } = useAuthContext();

  // Function to handle user signup.
  const signup = async (email, password, firstName, lastName, role) => {
    // Set isLoading to true and clear any previous errors
    setIsLoading(true);
    setError(null);

    // Send a POST request to the signup endpoint with user data
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName, role }),
    });

    // Parse the response as JSON
    const json = await response.json();

    // If the response is not ok (status code other than 2xx), set error and stop loading
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    // If the response is ok, save the user to local storage, update the auth context, and stop loading
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // Update loading state
      setIsLoading(false);
    }
  };

  // Return an object with the signup function, isLoading state, and error state
  return { signup, isLoading, error };
};
