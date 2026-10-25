import {
  Package,
  Boxes,
  AlertTriangle,
  ClipboardList,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function ManagerDashboard({
  products = [],
  onNavigate,
}) {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.quantity || 0),
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

  return (
    <div className="dashboard-content">
      <section className="welcome-row">
        <div>
          <div className="welcome-eyebrow">
            <span className="welcome-dot" />
            MANAGER WORKSPACE
          </div>

          <h2>Welcome back, Manager 👋</h2>

          <p>
            Monitor products, stock levels and daily inventory
            operations.
          </p>
        </div>

        <div className="welcome-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => onNavigate("products")}
          >
            <Package size={17} />
            Manage Products
          </button>
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <div className="stat-top">
            <div className="stat-icon blue">
              <Package size={21} />
            </div>
          </div>

          <p className="stat-title">Total Products</p>

          <h2 className="stat-value">
            {totalProducts.toLocaleString("en-PK")}
          </h2>

          <div className="stat-bottom">
            <span className="trend up">
              <TrendingUp size={15} />
              Catalog
            </span>

            <span className="stat-subtitle">
              Available products
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <div className="stat-icon violet">
              <Boxes size={21} />
            </div>
          </div>

          <p className="stat-title">Stock Units</p>

          <h2 className="stat-value">
            {totalStock.toLocaleString("en-PK")}
          </h2>

          <div className="stat-bottom">
            <span className="trend up">
              Current
            </span>

            <span className="stat-subtitle">
              Units in inventory
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <div className="stat-icon amber">
              <AlertTriangle size={21} />
            </div>
          </div>

          <p className="stat-title">Low Stock</p>

          <h2 className="stat-value">
            {lowStock.length}
          </h2>

          <div className="stat-bottom">
            <span className="trend down">
              Attention
            </span>

            <span className="stat-subtitle">
              Products need restocking
            </span>
          </div>
        </article>

        <article className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">
              <ClipboardList size={21} />
            </div>
          </div>

          <p className="stat-title">Out of Stock</p>

          <h2 className="stat-value">
            {outOfStock.length}
          </h2>

          <div className="stat-bottom">
            <span className="trend down">
              Review
            </span>

            <span className="stat-subtitle">
              Unavailable products
            </span>
          </div>
        </article>
      </section>

      <section className="overview-grid">
        <article className="panel stock-panel">
          <div className="panel-header">
            <div>
              <h3>Inventory Operations</h3>
              <p>Manager quick actions</p>
            </div>

            <span className="panel-icon">
              <Boxes size={19} />
            </span>
          </div>

          <div className="manager-actions">
            <button
              type="button"
              className="manager-action"
              onClick={() => onNavigate("products")}
            >
              <div>
                <strong>Manage Products</strong>
                <span>
                  Add and maintain inventory products
                </span>
              </div>

              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="manager-action"
              onClick={() => onNavigate("categories")}
            >
              <div>
                <strong>Product Categories</strong>
                <span>
                  Organize products by category
                </span>
              </div>

              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="manager-action"
              onClick={() => onNavigate("reports")}
            >
              <div>
                <strong>Inventory Reports</strong>
                <span>
                  Review inventory performance
                </span>
              </div>

              <ArrowRight size={18} />
            </button>
          </div>
        </article>

        <article className="panel attention-panel">
          <div className="panel-header">
            <div>
              <h3>Restock Required</h3>
              <p>Products requiring attention</p>
            </div>

            <span className="attention-count">
              {lowStock.length + outOfStock.length}
            </span>
          </div>

          <div className="attention-list">
            {[...outOfStock, ...lowStock]
              .slice(0, 5)
              .map((product) => (
                <div
                  className="attention-item"
                  key={product.id}
                >
                  <div
                    className={`product-avatar ${
                      product.color || ""
                    }`}
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

            {lowStock.length + outOfStock.length === 0 && (
              <p className="empty-state">
                All products currently have healthy stock.
              </p>
            )}
          </div>
        </article>
      </section>
    </div>
  );
}