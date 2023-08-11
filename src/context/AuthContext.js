import { createContext, useReducer, useEffect } from "react";

// Create a new context for authentication
export const AuthContext = createContext();

// Define the authentication reducer function
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Create the authentication context provider component
export const AuthContextProvider = ({ children }) => {
  // Use the authReducer to manage the state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    role: localStorage.getItem("role") || "Tech",
  });

  // Load user data from local storage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Dispatch the LOGIN action to update the state with the user data
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Log the current state to the console
  console.log("AuthContext state:", state);

  // Render the AuthContext.Provider component with the state and dispatch function as value
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
