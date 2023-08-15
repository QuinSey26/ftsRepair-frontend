import React, { useState, useEffect } from "react";

// Component for displaying and managing user details.
const UserDetails = () => {
  // State variables for managing users and form inputs
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");

  // Fetch users data from API on component mount
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  // Handle editing a user.
  const handleEditUser = (user) => {
    setEditingUserId(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setRole(user.role);
    setActive(user.active);
  };

  // Handle saving the edited user.
  const handleSaveEdit = (id) => {
    const updates = { firstName, lastName, role, active };

    fetch(`https://fts-repairs-backend.onrender.com/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = users.map((user) =>
          user._id === data._id ? data : user
        );
        setUsers(updatedUsers);
        setEditingUserId(null);
        setFirstName("");
        setLastName("");
        setRole("");
        setActive("");
      })
      .catch((error) => console.error(error));
  };

  // Handle deleting a user.
  const handleDeleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      fetch(`https://fts-repairs-backend.onrender.com/api/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedUsers = users.filter((user) => user._id !== id);
          setUsers(updatedUsers);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <h3>All Users</h3>
      {users.map((user) => (
        <div
          key={user._id}
          className={
            user.active === "Inactive" ? "inactive-user" : "active-user"
          }
        >
          <div className="user-details">
            <p>Email: {user.email}</p>
            <p>
              Name: {user.firstName} {user.lastName}
            </p>
            <p>Role: {user.role}</p>
            <p>Status: {user.active}</p>
            {editingUserId === user._id ? (
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Tech">Tech</option>
                  <option value="Admin">Admin</option>
                </select>
                <select
                  value={active}
                  onChange={(e) => setActive(e.target.value)}
                >
                  <option value="Inactive">Inactive</option>
                  <option value="Active">Active</option>
                </select>
                <button
                  className="save"
                  onClick={() => handleSaveEdit(user._id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <button className="edit" onClick={() => handleEditUser(user)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetails;
