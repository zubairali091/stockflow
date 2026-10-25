
import {
  Package,
  Boxes,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

export default function StaffDashboard({
  products = [],
  onNavigate,
}) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  const lowStock = products.filter(
    (product) =>
      Number(product.quantity) > 0 &&
      Number(product.quantity) <= 5
  );

  const outOfStock = products.filter(
    (product) => Number(product.quantity) === 0
  );

  const attentionProducts = products.filter(
    (product) => Number(product.quantity) <= 5
  );

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "blue",
    },
    {
      title: "Available Units",
      value: totalStock,
      icon: Boxes,
      color: "violet",
    },
    {
      title: "Low Stock Items",
      value: lowStock.length,
      icon: AlertTriangle,
      color: "amber",
    },
    {
      title: "Out of Stock",
      value: outOfStock.length,
      icon: ClipboardList,
      color: "green",
    },
  ];

  return (
    <div className="dashboard-content">
      <section className="welcome-row">
        <div>
          <div className="welcome-eyebrow">
            <span className="welcome-dot" />
            STAFF WORKSPACE
          </div>

          <h2>Welcome back, Staff</h2>

          <p>
            View inventory products and current stock levels.
          </p>
        </div>

        <div className="welcome-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => onNavigate("products")}
          >
            View Products
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article className="stat-card" key={item.title}>
              <div className="stat-top">
                <div className={`stat-icon ${item.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <p className="stat-title">{item.title}</p>

              <h2 className="stat-value">
                {item.value.toLocaleString("en-PK")}
              </h2>

              <div className="stat-bottom">
                <span className="stat-subtitle">
                  Current inventory
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="panel attention-panel">
        <div className="panel-header">
          <div>
            <h3>Products Requiring Attention</h3>
            <p>Items with five or fewer units remaining</p>
          </div>

          <span className="attention-count">
            {attentionProducts.length}
          </span>
        </div>

        <div className="attention-list">
          {attentionProducts.map((product) => (
            <div className="attention-item" key={product.id}>
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

          {attentionProducts.length === 0 && (
            <p className="empty-state">
              All products have healthy stock.
            </p>
          )}
        </div>

        <div className="attention-footer">
          <AlertTriangle size={15} />
          Review products that need restocking.
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>
          © {new Date().getFullYear()} StockFlow Inventory System
        </span>
        <span>Staff Workspace</span>
      </footer>
    </div>
  );
}
