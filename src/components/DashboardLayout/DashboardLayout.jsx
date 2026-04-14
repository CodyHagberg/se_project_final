import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import "./DashboardLayout.css";

const TENANT_NAV = [
  { path: "/dashboard/overview", label: "Overview" },
  { path: "/dashboard/leads", label: "Leads" },
  { path: "/dashboard/ai-config", label: "AI Sales Config" },
  { path: "/dashboard/support-config", label: "AI Support Config" },
  { path: "/dashboard/widget", label: "Widget Setup" },
  { path: "/dashboard/widget-customizer", label: "Widget Customizer" },
  { path: "/dashboard/integrations", label: "Integrations" },
  { path: "/dashboard/testing-center", label: "Testing Center" },
];

function TenantNavLinks({ searchSuffix, navClassName }) {
  return TENANT_NAV.map(({ path, label }) => (
    <NavLink
      key={path}
      to={`${path}${searchSuffix}`}
      className={({ isActive }) =>
        `${navClassName} ${isActive ? `${navClassName}--active` : ""}`
      }
    >
      {label}
    </NavLink>
  ));
}

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    actingBusinessId,
    actingCompanyName,
    isAdminActing,
    clearActingTenant,
  } = useActingBusinessId();

  const actingSearch =
    actingBusinessId != null && actingBusinessId !== ""
      ? `?businessId=${encodeURIComponent(actingBusinessId)}`
      : "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const exitTenantView = () => {
    clearActingTenant();
    navigate("/dashboard/admin/businesses");
  };

  const sidebarTitle = isAdminActing
    ? actingCompanyName || "Tenant dashboard"
    : user?.companyName;
  const sidebarSubtitle = isAdminActing
    ? "Admin · tenant view"
    : user?.role;

  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        <div className="dashboard__sidebarTop">
          <div className="dashboard__userInfo">
            <span className="dashboard__companyName">{sidebarTitle}</span>
            <span className="dashboard__role">{sidebarSubtitle}</span>
          </div>
          <nav className="dashboard__nav">
            {user?.role === "admin" && !isAdminActing && (
              <>
                <NavLink
                  to="/dashboard/admin/businesses"
                  className={({ isActive }) =>
                    `dashboard__navLink ${isActive ? "dashboard__navLink--active" : ""}`
                  }
                >
                  Businesses
                </NavLink>
                <NavLink
                  to="/dashboard/admin/onboard"
                  className={({ isActive }) =>
                    `dashboard__navLink ${isActive ? "dashboard__navLink--active" : ""}`
                  }
                >
                  Onboard Business
                </NavLink>
              </>
            )}
            {user?.role === "admin" && isAdminActing && (
              <>
                <div className="dashboard__navSectionLabel">Tenant</div>
                <TenantNavLinks
                  searchSuffix={actingSearch}
                  navClassName="dashboard__navLink"
                />
                <div className="dashboard__navSectionLabel dashboard__navSectionLabel--spaced">
                  Admin
                </div>
                <NavLink
                  to="/dashboard/admin/businesses"
                  className={({ isActive }) =>
                    `dashboard__navLink ${isActive ? "dashboard__navLink--active" : ""}`
                  }
                >
                  Businesses
                </NavLink>
                <NavLink
                  to="/dashboard/admin/onboard"
                  className={({ isActive }) =>
                    `dashboard__navLink ${isActive ? "dashboard__navLink--active" : ""}`
                  }
                >
                  Onboard Business
                </NavLink>
              </>
            )}
            {user?.role === "business" && (
              <TenantNavLinks searchSuffix="" navClassName="dashboard__navLink" />
            )}
          </nav>
        </div>
        <button className="dashboard__logoutBtn" onClick={handleLogout}>
          Sign Out
        </button>
      </aside>
      <div className="dashboard__main">
        {isAdminActing && (
          <div className="dashboard__actingBanner" role="status">
            <div className="dashboard__actingBannerText">
              <strong>Viewing tenant dashboard</strong>
              <span className="dashboard__actingBannerMeta">
                {actingCompanyName ? `${actingCompanyName} · ` : ""}
                {actingBusinessId}
              </span>
            </div>
            <button
              type="button"
              className="dashboard__actingExitBtn"
              onClick={exitTenantView}
            >
              Exit tenant view
            </button>
          </div>
        )}
        <div className="dashboard__content">
          <Outlet />
        </div>
        <footer className="dashboard__footer">
          ALEI {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;
