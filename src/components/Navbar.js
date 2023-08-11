import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import fieldTyreServicesLogo from "../images/Logo.png";
import fieldTyreServices from "../images/fieldtyreservices.png";

// Navbar component displays the navigation bar at the top of the page.
// It includes the logo, links to different pages, and user authentication options.
const Navbar = () => {
  // Get the logout function from the useLogout hook
  const { logout } = useLogout();

  // Get the user object from the useAuthContext hook
  const { user } = useAuthContext();

  // Handle click event for the logout button.
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        {/* Display the logo */}
        <img
          className="logo"
          src={fieldTyreServicesLogo}
          alt="Field Tyre Services"
        />

        {/* Link to the home page */}
        <Link to="/" className="link">
          <img
            className="fts"
            src={fieldTyreServices}
            alt="Field Tyre Services"
          />
          <h1>Repair Tickets</h1>
        </Link>

        <nav>
          {/* Display the navigation links */}
          {user && (
            <ul className="menu">
              <li>
                <Link to="/open">Open Tickets</Link>
              </li>
              <li>
                <Link to="/closed">Closed Tickets</Link>
              </li>
              <li>
                <Link to="/add-ticket">Add Tickets</Link>
              </li>
              <li>
                {/* Display the "Users" link only if the user role is "Admin" */}
                {user.role === "Admin" && <Link to="/admin">Users</Link>}
              </li>
            </ul>
          )}

          {/* Display user authentication options */}
          {user ? (
            <div className="user-info">
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          ) : (
            <div className="user-info">
              <Link className="login-btn" to="/login">
                Login
              </Link>
              <Link className="signup-btn" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
