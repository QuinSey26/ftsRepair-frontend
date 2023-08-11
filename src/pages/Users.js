import React from "react";
import UserDetails from "../components/UserDetails";

/**
 * This component represents a list of users.
 * It renders a heading "User List" and the UserDetails component.
 */
const Users = () => {
  return (
    <div>
      <h2>User List</h2>
      <UserDetails />
    </div>
  );
};

export default Users;
