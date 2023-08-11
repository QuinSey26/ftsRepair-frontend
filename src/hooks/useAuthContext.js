import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Custom hook to access the authentication context.

export const useAuthContext = () => {
  // Access the authentication context using the useContext hook
  const context = useContext(AuthContext);

  // Check if the context is available
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  // Return the authentication context
  return context;
};
