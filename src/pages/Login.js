import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

// Login component for user authentication.
const Login = () => {
  const [email, setEmail] = useState(""); // State for storing the email value
  const [password, setPassword] = useState(""); // State for storing the password value
  const [role, setRole] = useState(""); // State for storing the role value
  const { login, error, isLoading } = useLogin(); // Custom hook for handling login functionality
  const navigate = useNavigate(); // Hook for navigating to different routes

  // Handles the form submission.

  /* This function is called when the login form is submitted.
     It prevents the default form submission behavior, calls the login function with the
     email, password, and role values, and redirects to the home page after successful login.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password, role); // Call the login function with email, password, and role
    navigate("/"); // Redirect to home page after successful login
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

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

      <label>Role:</label>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="Tech">Tech</option>
        <option value="Admin">Admin</option>
      </select>

      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
