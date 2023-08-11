import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Import pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import OpenTickets from "./pages/OpenTickets";
import ClosedTickets from "./pages/ClosedTickets";
import TicketAdd from "./pages/TicketAdd";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

/**
 * A protected route component that checks if the user is authenticated.
 * If the user is not authenticated, it redirects to the login page.
 * Otherwise, it renders the specified element.
 */
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Element userRole={user.role} {...rest} />;
};

// The main App component that renders the application.
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/open"
              element={<ProtectedRoute element={OpenTickets} />}
            />
            <Route
              path="/closed"
              element={<ProtectedRoute element={ClosedTickets} />}
            />
            <Route
              path="/add-ticket"
              element={<ProtectedRoute element={TicketAdd} />}
            />
            <Route path="/admin" element={<ProtectedRoute element={Users} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
