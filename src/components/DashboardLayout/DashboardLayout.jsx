import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./DashboardLayout.css";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        <div className="dashboard__sidebarTop">
          <div className="dashboard__userInfo">
            <span className="dashboard__companyName">{user?.companyName}</span>
            <span className="dashboard__role">{user?.role}</span>
          </div>
          <nav className="dashboard__nav">
            {user?.role === "admin" && (
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
            {user?.role === "business" && (
              <>
                <NavLink
                  to="/dashboard/leads"
                  className={({ isActive }) =>
                    `dashboard__navLink ${isActive ? "dashboard__navLink--active" : ""}`
                  }
                >
                  Leads
                </NavLink>
                <NavLink
                  to="/dashboard/ai-config"
                  className={({ isActive }) =>
                    `dashboard__navLink ${isActive ? "dashboard__navLink--active" : ""}`
                  }
                >
                  AI Config
                </NavLink>
                <NavLink
                  to="/dashboard/widget"
                  className={({ isActive }) =>
                    `dashboard__navLink ${isActive ? "dashboard__navLink--active" : ""}`
                  }
                >
                  Widget Setup
                </NavLink>
              </>
            )}
          </nav>
        </div>
        <button className="dashboard__logoutBtn" onClick={handleLogout}>
          Sign Out
        </button>
      </aside>
      <div className="dashboard__content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
