
import {
  FileText,
  Package,
  Boxes,
  AlertTriangle,
  Wallet,
  Download,
} from "lucide-react";

import { formatMoney, getStockStatus } from "../data/products";
import "./Reports.css";

function Reports({ products = [] }) {
  const totalUnits = products.reduce(
    (total, product) => total + Number(product.quantity || 0),
    0
  );

  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) * Number(product.quantity || 0),
    0
  );

  const lowStock = products.filter((product) => {
    const quantity = Number(product.quantity || 0);
    return quantity > 0 && quantity <= 5;
  }).length;

  const outOfStock = products.filter(
    (product) => Number(product.quantity || 0) === 0
  ).length;

  function exportReport() {
    const headers = [
      "Product ID",
      "Product Name",
      "Category",
      "Price",
      "Quantity",
      "Stock Status",
      "Inventory Value",
    ];

    const rows = products.map((product) => [
      product.id,
      product.name,
      product.category,
      product.price,
      product.quantity,
      getStockStatus(Number(product.quantity || 0)).label,
      Number(product.price || 0) * Number(product.quantity || 0),
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "stockflow-inventory-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const reportCards = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "blue",
    },
    {
      label: "Total Stock Units",
      value: totalUnits.toLocaleString("en-PK"),
      icon: Boxes,
      color: "violet",
    },
    {
      label: "Low Stock Items",
      value: lowStock,
      icon: AlertTriangle,
      color: "amber",
    },
    {
      label: "Inventory Value",
      value: formatMoney(inventoryValue),
      icon: Wallet,
      color: "green",
    },
  ];

  return (
    <main className="reports-page">
      <header className="reports-header">
        <div>
          <span className="reports-eyebrow">BUSINESS INSIGHTS</span>
          <h1>Inventory Reports</h1>
          <p>
            Review your inventory performance and export stock data.
          </p>
        </div>

        <button
          type="button"
          className="reports-export-btn"
          onClick={exportReport}
        >
          <Download size={17} />
          Export CSV
        </button>
      </header>

      <section className="reports-summary">
        {reportCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="report-stat-card" key={card.label}>
              <div className={`report-stat-icon ${card.color}`}>
                <Icon size={21} />
              </div>

              <p>{card.label}</p>
              <h2>{card.value}</h2>
            </article>
          );
        })}
      </section>

      <section className="reports-panel">
        <div className="reports-panel-header">
          <div className="reports-panel-title">
            <FileText size={19} />
            <div>
              <h2>Stock Detail Report</h2>
              <p>Product-level inventory overview</p>
            </div>
          </div>

          <span className="reports-count">
            {products.length} products
          </span>
        </div>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Stock Value</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const quantity = Number(product.quantity || 0);
                const price = Number(product.price || 0);
                const status = getStockStatus(quantity);

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="report-product-name">
                        <strong>{product.name}</strong>
                        <small>{product.id}</small>
                      </div>
                    </td>

                    <td>{product.category || "Uncategorized"}</td>
                    <td>{formatMoney(price)}</td>
                    <td>{quantity}</td>
                    <td className="report-value">
                      {formatMoney(price * quantity)}
                    </td>
                    <td>
                      <span
                        className={`report-status ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="reports-empty">
                    No product data available. Add products to generate
                    a report.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="reports-footer">
          <span>
            Out of stock: <strong>{outOfStock}</strong>
          </span>
          <span>
            Report generated:{" "}
            <strong>{new Date().toLocaleDateString()}</strong>
          </span>
        </footer>
      </section>

      <p className="reports-note">
        Inventory value is calculated using current unit price × available
        quantity. This report uses the product data currently held in the app.
      </p>
    </main>
  );
}

export default Reports;
