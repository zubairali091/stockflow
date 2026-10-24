
import { useState, useMemo } from "react";

import {
  Package,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  X,
} from "lucide-react";

import {
  formatMoney,
  getStockStatus,
} from "../data/products";

import "./Products.css";

const ITEMS_PER_PAGE = 5;

const emptyForm = {
  name: "",
  category: "",
  price: "",
  quantity: "",
  supplier: "",
};

const categoryOptions = [
  "Electronics",
  "Stationery",
  "Accessories",
  "General",
];

export default function Products({ products, onAddProduct }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.id.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || product.category === category;

      const status = getStockStatus(product.quantity);

      const matchesStock =
        stockFilter === "All" || status.label === stockFilter;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, category, stockFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleStock = (event) => {
    setStockFilter(event.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStockFilter("All");
    setCurrentPage(1);
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setFormError("");
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setForm(emptyForm);
    setFormError("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const supplier = form.supplier.trim();
    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (
      !name ||
      !form.category ||
      !supplier ||
      form.price === "" ||
      form.quantity === ""
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setFormError("Enter a valid price greater than zero.");
      return;
    }

    if (
      !Number.isSafeInteger(quantity) ||
      quantity < 0
    ) {
      setFormError("Quantity must be a whole number, zero or greater.");
      return;
    }

    const nextId =
      Math.max(
        1000,
        ...products.map((product) => {
          const match = /^PRD-(\d+)$/.exec(product.id);
          return match ? Number(match[1]) : 1000;
        })
      ) + 1;

    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

    const colors = {
      Electronics: "blue",
      Stationery: "orange",
      Accessories: "purple",
      General: "green",
    };

    const newProduct = {
      id: `PRD-${nextId}`,
      name,
      category: form.category,
      price,
      quantity,
      supplier,
      initials,
      color: colors[form.category] || "blue",
    };

    onAddProduct(newProduct);

    clearFilters();
    closeAddForm();

    setSuccessMessage(
      `${newProduct.name} (${newProduct.id}) added successfully.`
    );
  };

  return (
    <div className="products-page">
      <div className="products-page-heading">
        <div>
          <div className="welcome-eyebrow">
            <span className="welcome-dot" />
            INVENTORY MANAGEMENT
          </div>

          <h2>Product Management</h2>

          <p>
            Organize, monitor and manage your inventory
            in one place.
          </p>
        </div>

        <button
          className="button button-primary"
          type="button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {successMessage && (
        <div className="product-success" role="status">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>

          <button
            type="button"
            aria-label="Dismiss message"
            onClick={() => setSuccessMessage("")}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="products-summary">
        <div className="products-summary-card">
          <div className="summary-icon summary-blue">
            <Package size={21} />
          </div>

          <div>
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="products-summary-card">
          <div className="summary-icon summary-green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>In Stock</span>
            <strong>
              {products.filter((p) => p.quantity > 5).length}
            </strong>
          </div>
        </div>

        <div className="products-summary-card">
          <div className="summary-icon summary-orange">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Low Stock</span>
            <strong>
              {
                products.filter(
                  (p) => p.quantity > 0 && p.quantity <= 5
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="products-summary-card">
          <div className="summary-icon summary-red">
            <XCircle size={21} />
          </div>

          <div>
            <span>Out of Stock</span>
            <strong>
              {products.filter((p) => p.quantity === 0).length}
            </strong>
          </div>
        </div>
      </div>

      <section className="panel inventory-panel">
        <div className="inventory-panel-header">
          <div>
            <h3>All Products</h3>
            <p>
              Browse and manage your complete product catalog.
            </p>
          </div>

          <span className="product-count-label">
            {filteredProducts.length} Products
          </span>
        </div>

        <div className="product-toolbar">
          <label className="product-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search product name or ID..."
              value={search}
              onChange={handleSearch}
            />
          </label>

          <div className="toolbar-filters">
            <Filter size={17} />

            <select
              value={category}
              onChange={handleCategory}
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={handleStock}
              aria-label="Filter by stock status"
            >
              <option value="All">All Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="table-scroll">
          <table className="products-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>PRODUCT ID</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>SUPPLIER</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => {
                  const status = getStockStatus(product.quantity);

                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="table-product">
                          <div
                            className={`product-avatar ${product.color}`}
                          >
                            {product.initials}
                          </div>

                          <strong>{product.name}</strong>
                        </div>
                      </td>

                      <td>
                        <span className="product-id">
                          {product.id}
                        </span>
                      </td>

                      <td>
                        <span className="category-label">
                          {product.category}
                        </span>
                      </td>

                      <td className="price-cell">
                        {formatMoney(product.price)}
                      </td>

                      <td>
                        <span className="quantity-cell">
                          {product.quantity} units
                        </span>
                      </td>

                      <td>{product.supplier}</td>

                      <td>
                        <span
                          className={`status-badge ${status.className}`}
                        >
                          {status.className === "in" ? (
                            <CheckCircle2 size={14} />
                          ) : status.className === "low" ? (
                            <AlertTriangle size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}

                          {status.label}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="product-action-btn"
                          aria-label={`Actions for ${product.name}`}
                          onClick={() =>
                            alert(
                              "Edit and Delete will be implemented in the next module."
                            )
                          }
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8">
                    <div className="empty-products">
                      <Package size={35} />
                      <h3>No products found</h3>
                      <p>
                        Try another search or clear your filters.
                      </p>

                      <button
                        type="button"
                        className="button button-secondary"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="inventory-pagination">
          <span>
            {filteredProducts.length === 0
              ? "Showing 0 products"
              : `Showing ${startIndex + 1}–${Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredProducts.length
                )} of ${filteredProducts.length} products`}
          </span>

          <div className="pagination-controls">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage(safePage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={safePage === page ? "selected" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage(safePage + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {showAddForm && (
        <div
          className="product-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAddForm();
            }
          }}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
          >
            <div className="product-modal-header">
              <div>
                <h2 id="add-product-title">Add New Product</h2>
                <p>
                  Enter the product details to add it to your inventory.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                aria-label="Close form"
                onClick={closeAddForm}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="product-form-body">
                {formError && (
                  <div className="product-form-error" role="alert">
                    <AlertTriangle size={17} />
                    {formError}
                  </div>
                )}

                <div className="product-form-field">
                  <label htmlFor="product-name">
                    Product Name <span>*</span>
                  </label>
                  <input
                    id="product-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Wireless Keyboard"
                    value={form.name}
                    onChange={handleFormChange}
                    maxLength={100}
                    autoFocus
                    required
                  />
                </div>

                <div className="product-form-grid">
                  <div className="product-form-field">
                    <label htmlFor="product-category">
                      Category <span>*</span>
                    </label>
                    <select
                      id="product-category"
                      name="category"
                      value={form.category}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select category</option>
                      {categoryOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="product-form-field">
                    <label htmlFor="product-supplier">
                      Supplier <span>*</span>
                    </label>
                    <input
                      id="product-supplier"
                      name="supplier"
                      type="text"
                      placeholder="Supplier name"
                      value={form.supplier}
                      onChange={handleFormChange}
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="product-form-field">
                    <label htmlFor="product-price">
                      Unit Price (PKR) <span>*</span>
                    </label>
                    <input
                      id="product-price"
                      name="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      value={form.price}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="product-form-field">
                    <label htmlFor="product-quantity">
                      Opening Quantity <span>*</span>
                    </label>
                    <input
                      id="product-quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={form.quantity}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <p className="product-form-note">
                  Product ID and stock status will be generated automatically.
                </p>
              </div>

              <div className="product-modal-footer">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={closeAddForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="button button-primary"
                >
                  <Plus size={17} />
                  Save Product
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
