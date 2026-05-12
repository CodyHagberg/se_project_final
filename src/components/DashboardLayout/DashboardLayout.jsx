import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import WelcomeModal from "../WelcomeModal/WelcomeModal";
import "./DashboardLayout.css";

// Nav links available to all tenant roles (business owners and members).
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

// Nav links exclusive to the business owner role (not visible to members).
const TENANT_OWNER_NAV = [{ path: "/dashboard/users", label: "Team" }];

/**
 * Renders the standard tenant navigation links.
 * `searchSuffix` is appended to each path so that an admin acting as a tenant
 * carries the `?businessId=` query param across all nav transitions.
 */
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

/**
 * Renders nav links that are only available to the business owner (e.g. Team management).
 */
function TenantOwnerNavLinks({ searchSuffix, navClassName }) {
  return TENANT_OWNER_NAV.map(({ path, label }) => (
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

/**
 * Shell layout for all authenticated dashboard routes.
 *
 * Renders a persistent sidebar with role-aware navigation and an <Outlet> for
 * nested route content. Three navigation states are supported:
 *   - Plain admin: only admin-level links (Businesses, Onboard Business).
 *   - Admin acting as tenant: tenant links + admin links, with the active
 *     tenant identified via the `?businessId=` query param on every link.
 *   - Business owner / member: tenant links; owners additionally see Team.
 *
 * When an admin is impersonating a tenant, a dismissible banner is shown at
 * the top of the main content area so the context is always visible.
 */
function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    actingBusinessId,
    actingCompanyName,
    isAdminActing,
    clearActingTenant,
  } = useActingBusinessId();

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user?.role === "business" && user?.id) {
      const key = `leai_welcomed_${user.id}`;
      if (!localStorage.getItem(key)) {
        setShowWelcome(true);
      }
    }
  }, [user?.id, user?.role]);

  // Build the query string that scopes all tenant API calls to the impersonated
  // business. Empty string when the admin is not acting as a tenant.
  const actingSearch =
    actingBusinessId != null && actingBusinessId !== ""
      ? `?businessId=${encodeURIComponent(actingBusinessId)}`
      : "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Clears the impersonated tenant from context and returns the admin to the
  // businesses list.
  const exitTenantView = () => {
    clearActingTenant();
    navigate("/dashboard/admin/businesses");
  };

  // While an admin is acting as a tenant, show the tenant's company name and a
  // contextual subtitle instead of the admin's own profile info.
  const sidebarTitle = isAdminActing
    ? actingCompanyName || "Tenant dashboard"
    : user?.companyName;
  const sidebarSubtitle = isAdminActing
    ? "Admin · tenant view"
    : user?.role;

  return (
    <div className="dashboard">
      {showWelcome && (
        <WelcomeModal userId={user.id} onClose={() => setShowWelcome(false)} />
      )}
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
            {(user?.role === "business" || user?.role === "member") && (
              <>
                <TenantNavLinks searchSuffix="" navClassName="dashboard__navLink" />
                {user?.role === "business" && (
                  <TenantOwnerNavLinks searchSuffix="" navClassName="dashboard__navLink" />
                )}
              </>
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
