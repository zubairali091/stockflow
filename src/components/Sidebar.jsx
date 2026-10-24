
import {
  LayoutDashboard,
  Package,
  Tags,
  BarChart3,
  Settings,
  Users,
  Boxes,
  ChevronRight,
  CircleHelp,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    page: "dashboard",
  },
  {
    label: "Products",
    icon: Package,
    page: "products",
  },
  {
    label: "Categories",
    icon: Tags,
    page: "categories",
  },
  {
    label: "Reports",
    icon: BarChart3,
    page: "reports",
  },
  {
    label: "Users",
    icon: Users,
    page: "users",
  },
  {
    label: "Settings",
    icon: Settings,
    page: "settings",
  },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Boxes size={25} />
        </div>

        <div className="brand-copy">
          <h2>StockFlow</h2>
          <span>INVENTORY SYSTEM</span>
        </div>
      </div>

      <div className="workspace">
        <span className="workspace-label">WORKSPACE</span>

        <span className="workspace-name">
          <span className="workspace-dot" />
          Main Warehouse
          <ChevronRight size={16} />
        </span>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <span className="nav-heading">MENU</span>

        {menuItems.map(({ label, icon: Icon, page }) => {
          const isActive = activePage === page;

          const isAvailable = [
            "dashboard",
            "products",
            "categories",
            "reports",
            "users",
            "settings",
          ].includes(page);

          return (
            <button
              type="button"
              key={page}
              className={`nav-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (isAvailable) {
                  onNavigate(page);
                } else {
                  alert(`${label} module will be added later.`);
                }
              }}
            >
              <Icon size={19} strokeWidth={1.8} />

              <span>{label}</span>

              {isActive && <span className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon">
            <CircleHelp size={20} />
          </div>

          <strong>Need help?</strong>

          <p>Manage your inventory with confidence.</p>
        </div>

        <div className="sidebar-footer">
          <span className="online-dot" />
          All systems operational
        </div>
      </div>
    </aside>
  );
}
