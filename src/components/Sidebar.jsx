
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
    roles: ["admin", "manager", "staff"],
  },
  {
    label: "Products",
    icon: Package,
    page: "products",
    roles: ["admin", "manager", "staff"],
  },
  {
    label: "Categories",
    icon: Tags,
    page: "categories",
    roles: ["admin", "manager"],
  },
  {
    label: "Reports",
    icon: BarChart3,
    page: "reports",
    roles: ["admin", "manager"],
  },
  {
    label: "Users",
    icon: Users,
    page: "users",
    roles: ["admin"],
  },
  {
    label: "Settings",
    icon: Settings,
    page: "settings",
    roles: ["admin"],
  },
];

export default function Sidebar({
  activePage,
  onNavigate,
  role = "admin",
}) {
  const visibleMenu = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  const roleNames = {
    admin: "Administrator",
    manager: "Manager",
    staff: "Staff Member",
  };

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
        <span className="nav-heading">
          {roleNames[role] || "MENU"}
        </span>

        {visibleMenu.map(({ label, icon: Icon, page }) => {
          const isActive = activePage === page;

          return (
            <button
              type="button"
              key={page}
              className={`nav-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onNavigate(page)}
            >
              <Icon size={19} strokeWidth={1.8} />

              <span>{label}</span>

              {isActive && (
                <span className="active-indicator" />
              )}
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
