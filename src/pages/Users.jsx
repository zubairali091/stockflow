
import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users as UsersIcon,
  ShieldCheck,
  X,
} from "lucide-react";
import "./Users.css";

const initialUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@stockflow.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Ali Hassan",
    email: "ali@stockflow.com",
    role: "Staff",
    status: "Active",
  },
  {
    id: 3,
    name: "Sara Ahmed",
    email: "sara@stockflow.com",
    role: "Staff",
    status: "Inactive",
  },
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Staff",
    status: "Active",
  });

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const openAddModal = () => {
    setEditingUser(null);
    setForm({
      name: "",
      email: "",
      role: "Staff",
      status: "Active",
    });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const duplicateEmail = users.some(
      (user) =>
        user.email.toLowerCase() === form.email.trim().toLowerCase() &&
        user.id !== editingUser?.id
    );

    if (duplicateEmail) {
      alert("This email address already exists.");
      return;
    }

    const userData = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
    };

    if (editingUser) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? { ...user, ...userData }
            : user
        )
      );
    } else {
      setUsers((currentUsers) => [
        ...currentUsers,
        {
          id: Date.now(),
          ...userData,
        },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (user) => {
    if (user.role === "Admin") {
      alert("Admin users cannot be deleted from this demo.");
      return;
    }

    if (window.confirm(`Delete ${user.name}?`)) {
      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== user.id)
      );
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <span className="users-eyebrow">ACCESS CONTROL</span>
          <h1>Users Management</h1>
          <p>Manage team members and their access roles.</p>
        </div>

        <button className="users-primary-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="users-stats">
        <div className="users-stat-card">
          <div className="users-stat-icon blue">
            <UsersIcon size={21} />
          </div>
          <div>
            <span>Total Users</span>
            <h2>{users.length}</h2>
          </div>
        </div>

        <div className="users-stat-card">
          <div className="users-stat-icon green">
            <ShieldCheck size={21} />
          </div>
          <div>
            <span>Active Users</span>
            <h2>{activeUsers}</h2>
          </div>
        </div>
      </div>

      <section className="users-table-card">
        <div className="users-table-heading">
          <div>
            <h2>Team Members</h2>
            <p>View and manage registered users.</p>
          </div>

          <div className="users-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>USER</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th className="users-actions-heading">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="users-person">
                      <div className="users-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`users-role ${
                        user.role === "Admin" ? "admin" : "staff"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`users-status ${
                        user.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      <span className="users-status-dot" />
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <div className="users-actions">
                      <button
                        type="button"
                        className="users-icon-btn edit"
                        title="Edit user"
                        onClick={() => openEditModal(user)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="users-icon-btn delete"
                        title="Delete user"
                        onClick={() => handleDelete(user)}
                        disabled={user.role === "Admin"}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="users-empty">
                    No users found. Try another search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div
          className="users-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <section
            className="users-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="users-modal-title"
          >
            <div className="users-modal-header">
              <div>
                <h2 id="users-modal-title">
                  {editingUser ? "Edit User" : "Add New User"}
                </h2>
                <p>Enter the team member's details below.</p>
              </div>

              <button
                type="button"
                className="users-close-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="user-name">Full Name</label>
              <input
                id="user-name"
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />

              <label htmlFor="user-email">Email Address</label>
              <input
                id="user-email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />

              <div className="users-form-row">
                <div>
                  <label htmlFor="user-role">Role</label>
                  <select
                    id="user-role"
                    value={form.role}
                    onChange={(event) =>
                      setForm({ ...form, role: event.target.value })
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="user-status">Status</label>
                  <select
                    id="user-status"
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="users-modal-actions">
                <button
                  type="button"
                  className="users-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="users-primary-btn">
                  {editingUser ? "Save Changes" : "Add User"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default Users;
