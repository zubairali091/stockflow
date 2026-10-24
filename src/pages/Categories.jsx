
import { useState } from "react";
import "./Categories.css";

const initialCategories = [
  {
    id: 1,
    name: "Electronics",
    description: "Electronic devices and accessories",
  },
  {
    id: 2,
    name: "Clothing",
    description: "Clothes and fashion products",
  },
  {
    id: 3,
    name: "Accessories",
    description: "Everyday accessories and essentials",
  },
  {
    id: 4,
    name: "Home & Living",
    description: "Home improvement and living products",
  },
];

function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  const filteredCategories = categories.filter((category) =>
    `${category.name} ${category.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function openAddForm() {
    setEditingId(null);
    setForm({ name: "", description: "" });
    setError("");
    setShowForm(true);
  }

  function openEditForm(category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      description: category.description,
    });
    setError("");
    setShowForm(true);
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();

    if (!name) {
      setError("Please enter a category name.");
      return;
    }

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.id !== editingId
    );

    if (duplicate) {
      setError("This category already exists.");
      return;
    }

    if (editingId !== null) {
      setCategories((current) =>
        current.map((category) =>
          category.id === editingId
            ? { ...category, name, description }
            : category
        )
      );
    } else {
      setCategories((current) => [
        ...current,
        {
          id: Date.now(),
          name,
          description,
        },
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", description: "" });
    setError("");
  }

  function handleDelete(category) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (confirmed) {
      setCategories((current) =>
        current.filter((item) => item.id !== category.id)
      );
    }
  }

  return (
    <main className="categories-page">
      <div className="categories-header">
        <div>
          <span className="categories-eyebrow">
            INVENTORY MANAGEMENT
          </span>
          <h1>Categories</h1>
          <p>Organize and manage your inventory categories.</p>
        </div>

        <button className="category-primary-btn" onClick={openAddForm}>
          <span aria-hidden="true">＋</span> Add Category
        </button>
      </div>

      <section className="category-summary">
        <div className="category-summary-icon" aria-hidden="true">
          ▦
        </div>
        <div>
          <span>Total Categories</span>
          <strong>{categories.length}</strong>
          <small>Categories in your inventory</small>
        </div>
      </section>

      <section className="category-panel">
        <div className="category-panel-header">
          <div>
            <h2>All Categories</h2>
            <p>View and manage your product categories.</p>
          </div>

          <label className="category-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search categories..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search categories"
            />
          </label>
        </div>

        <div className="category-table-wrapper">
          <table className="category-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th className="category-actions-heading">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="category-name-cell">
                      <span className="category-row-icon" aria-hidden="true">
                        ▦
                      </span>
                      <strong>{category.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="category-description">
                      {category.description || "No description"}
                    </span>
                  </td>
                  <td>
                    <span className="category-status">Active</span>
                  </td>
                  <td>
                    <div className="category-row-actions">
                      <button
                        className="category-edit-btn"
                        onClick={() => openEditForm(category)}
                        aria-label={`Edit ${category.name}`}
                      >
                        Edit
                      </button>
                      <button
                        className="category-delete-btn"
                        onClick={() => handleDelete(category)}
                        aria-label={`Delete ${category.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="4" className="category-empty">
                    No categories found. Try another search or add a category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="category-panel-footer">
          Showing {filteredCategories.length} of {categories.length} categories
        </div>
      </section>

      {showForm && (
        <div
          className="category-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
              setError("");
            }
          }}
        >
          <section
            className="category-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-form-title"
          >
            <div className="category-modal-header">
              <div>
                <span className="categories-eyebrow">CATEGORY DETAILS</span>
                <h2 id="category-form-title">
                  {editingId !== null ? "Edit Category" : "Add Category"}
                </h2>
              </div>

              <button
                className="category-close-btn"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
                aria-label="Close form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="category-form-field">
                Category Name <span>*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Electronics"
                  maxLength={80}
                  required
                  autoFocus
                />
              </label>

              <label className="category-form-field">
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe this category..."
                  rows={4}
                  maxLength={300}
                />
              </label>

              {error && (
                <p className="category-form-error" role="alert">
                  {error}
                </p>
              )}

              <div className="category-form-actions">
                <button
                  type="button"
                  className="category-cancel-btn"
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="category-primary-btn">
                  {editingId !== null ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Categories;
