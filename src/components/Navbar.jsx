
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function Navbar({ activePage, onMenuClick }) {
  const pageTitle = {
    dashboard: "Dashboard",
    products: "Products",
    categories: "Categories",
    reports: "Reports",
    users: "Users",
  }[activePage] || "Dashboard";

  return (
    <header className="topbar">
      <button
        className="mobile-menu"
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      <div className="page-heading">
        <span className="breadcrumb">Workspace / {pageTitle}</span>
        <h1>{pageTitle}</h1>
      </div>

      <div className="topbar-actions">
        <label className="global-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search anything"
          />
          <kbd>Ctrl K</kbd>
        </label>

        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
          onClick={() => alert("You are all caught up!")}
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="profile-divider" />

        <button
          type="button"
          className="profile-button"
          aria-label="User profile"
          onClick={() => alert("Profile settings will be added later.")}
        >
          <div className="avatar">SA</div>
          <div className="profile-copy">
            <strong>Store Admin</strong>
            <span>Administrator</span>
          </div>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}
