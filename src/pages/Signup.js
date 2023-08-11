import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

// Signup component for user registration.
const Signup = () => {
  // State variables to store user input and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Custom hook for signup functionality
  const { signup, error, isLoading } = useSignup();

  // Navigation hook for redirecting after successful signup
  const navigate = useNavigate();

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      setErrorMessage("All fields must be filled");
      return;
    }

    // Call the signup function to register the user
    await signup(email, password, firstName, lastName, role);

    // Redirect to the home page after successful signup
    navigate("/");
  };

  // Render the signup form
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Role:</label>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="Tech">Tech</option>
        <option value="Admin">Admin</option>
      </select>

      {errorMessage && <div className="error">{errorMessage}</div>}
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
