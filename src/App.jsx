
import { useState } from "react";

import {
  Package,
  Boxes,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  MoreHorizontal,
  Clock3,
  CheckCircle2,
  XCircle,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import SettingsPage from "./pages/Settings";

import {
  initialProducts,
  formatMoney,
  getStockStatus,
} from "./data/products";

import "./App.css";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  direction,
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon ${color}`}>
          <Icon size={21} />
        </div>

        <button
          className="card-more"
          type="button"
          aria-label={`More about ${title}`}
          onClick={() => alert(`${title}: ${subtitle}`)}
        >
          <MoreHorizontal size={21} />
        </button>
      </div>

      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>

      <div className="stat-bottom">
        <span className={`trend ${direction}`}>
          {direction === "up" ? (
            <ArrowUpRight size={15} />
          ) : (
            <ArrowDownRight size={15} />
          )}
          {trend}
        </span>

        <span className="stat-subtitle">{subtitle}</span>
      </div>
    </article>
  );
}

function Dashboard({ products, onNavigate }) {
  const totalQuantity = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  const healthyStockCount = products.filter(
    (product) => Number(product.quantity) > 5
  ).length;

  const lowStockCount = products.filter(
    (product) =>
      Number(product.quantity) > 0 &&
      Number(product.quantity) <= 5
  ).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.quantity) === 0
  ).length;

  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
        Number(product.quantity || 0),
    0
  );

  const totalProducts = products.length;

  return (
    <div className="dashboard-content">
      <section className="welcome-row">
        <div>
          <div className="welcome-eyebrow">
            <span className="welcome-dot" />
            INVENTORY OVERVIEW
          </div>

          <h2>Welcome back, Admin 👋</h2>

          <p>
            Here's what's happening with your inventory today.
          </p>
        </div>

        <div className="welcome-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => window.print()}
          >
            <Download size={17} />
            Export / Print
          </button>

          <button
            type="button"
            className="button button-primary"
            onClick={() => onNavigate("products")}
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </section>

      <section
        className="stats-grid"
        aria-label="Inventory statistics"
      >
        <StatCard
          title="Total Products"
          value={totalProducts.toLocaleString("en-PK")}
          subtitle="Products in catalog"
          icon={Package}
          color="blue"
          trend="Catalog"
          direction="up"
        />

        <StatCard
          title="Total Stock Units"
          value={totalQuantity.toLocaleString("en-PK")}
          subtitle="Units available"
          icon={Boxes}
          color="violet"
          trend="Current"
          direction="up"
        />

        <StatCard
          title="Low Stock Items"
          value={lowStockCount.toString().padStart(2, "0")}
          subtitle={`${outOfStockCount} out of stock`}
          icon={AlertTriangle}
          color="amber"
          trend="Attention"
          direction="down"
        />

        <StatCard
          title="Inventory Value"
          value={formatMoney(inventoryValue)}
          subtitle="Based on available stock"
          icon={Wallet}
          color="green"
          trend="Stock value"
          direction="up"
        />
      </section>

      <section className="overview-grid">
        <article className="panel stock-panel">
          <div className="panel-header">
            <div>
              <h3>Stock Overview</h3>
              <p>Current inventory health</p>
            </div>

            <span className="panel-icon">
              <TrendingUp size={19} />
            </span>
          </div>

          <div className="stock-total">
            <div>
              <span className="muted-label">Total units</span>
              <h2>{totalQuantity}</h2>
            </div>

            <span className="stock-period">
              <CalendarDays size={14} />
              Current stock
            </span>
          </div>

          <div
            className="stock-bar"
            aria-label="Stock health distribution"
          >
            <span
              className="bar-in"
              style={{
                width: `${
                  totalProducts
                    ? (healthyStockCount / totalProducts) * 100
                    : 0
                }%`,
              }}
            />

            <span
              className="bar-low"
              style={{
                width: `${
                  totalProducts
                    ? (lowStockCount / totalProducts) * 100
                    : 0
                }%`,
              }}
            />

            <span
              className="bar-out"
              style={{
                width: `${
                  totalProducts
                    ? (outOfStockCount / totalProducts) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="stock-legend">
            <div>
              <span className="legend-dot dot-in" />
              <span>Healthy stock</span>
              <strong>{healthyStockCount}</strong>
            </div>

            <div>
              <span className="legend-dot dot-low" />
              <span>Low stock</span>
              <strong>{lowStockCount}</strong>
            </div>

            <div>
              <span className="legend-dot dot-out" />
              <span>Out of stock</span>
              <strong>{outOfStockCount}</strong>
            </div>
          </div>
        </article>

        <article className="panel attention-panel">
          <div className="panel-header">
            <div>
              <h3>Needs Attention</h3>
              <p>Products that need restocking</p>
            </div>

            <span className="attention-count">
              {lowStockCount + outOfStockCount}
            </span>
          </div>

          <div className="attention-list">
            {products
              .filter(
                (product) => Number(product.quantity) <= 5
              )
              .map((product) => (
                <div
                  className="attention-item"
                  key={product.id}
                >
                  <div
                    className={`product-avatar ${product.color || ""}`}
                  >
                    {product.initials ||
                      product.name?.charAt(0) ||
                      "P"}
                  </div>

                  <div className="attention-product">
                    <strong>{product.name}</strong>
                    <span>{product.id}</span>
                  </div>

                  <div className="attention-quantity">
                    <strong>{product.quantity}</strong>
                    <span>units left</span>
                  </div>
                </div>
              ))}

            {lowStockCount + outOfStockCount === 0 && (
              <p className="empty-state">
                All products have healthy stock.
              </p>
            )}
          </div>

          <div className="attention-footer">
            <AlertTriangle size={15} />
            Review these products before restocking.
          </div>
        </article>
      </section>

      <section className="panel products-panel">
        <div className="panel-header products-header">
          <div>
            <h3>Recent Products</h3>
            <p>A quick look at your inventory catalog</p>
          </div>

          <button
            type="button"
            className="button button-secondary view-all"
            onClick={() => onNavigate("products")}
          >
            View all products
            <ArrowUpRight size={16} />
          </button>
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
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {products.slice(0, 5).map((product) => {
                const status = getStockStatus(
                  Number(product.quantity || 0)
                );

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product">
                        <div
                          className={`product-avatar ${product.color || ""}`}
                        >
                          {product.initials ||
                            product.name?.charAt(0) ||
                            "P"}
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
                      {formatMoney(
                        Number(product.price || 0)
                      )}
                    </td>

                    <td>
                      <span className="quantity-cell">
                        {product.quantity} units
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${status.className}`}
                      >
                        {status.className === "in" ? (
                          <CheckCircle2 size={14} />
                        ) : status.className === "low" ? (
                          <Clock3 size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {totalProducts === 0 && (
                <tr>
                  <td colSpan="6">
                    <p className="empty-state">
                      No products found. Add your first product.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>
            Showing{" "}
            <strong>{Math.min(5, totalProducts)}</strong>{" "}
            of {totalProducts} products
          </span>

          <span className="sample-notice">
            <span className="sample-dot" />
            Preview data
          </span>
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>
          © {new Date().getFullYear()} StockFlow Inventory System
        </span>

        <span>
          Built for smarter inventory management
        </span>
      </footer>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = (newProduct) => {
    setProducts((previousProducts) => [
      newProduct,
      ...previousProducts,
    ]);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            products={products}
            onNavigate={handleNavigate}
          />
        );

      case "products":
        return (
          <Products
            products={products}
            onAddProduct={handleAddProduct}
          />
        );

      case "categories":
        return <Categories />;

      case "reports":
        return <Reports products={products} />;

      case "users":
        return <Users />;

      case "settings":
        return <SettingsPage />;

      default:
        return (
          <Dashboard
            products={products}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={
          mobileMenuOpen
            ? "sidebar-wrap mobile-open"
            : "sidebar-wrap"
        }
      >
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
        />
      </div>

      <main className="main-content">
        <Navbar
          activePage={activePage}
          onMenuClick={() =>
            setMobileMenuOpen((isOpen) => !isOpen)
          }
        />

        {renderPage()}
      </main>
    </div>
  );
}
