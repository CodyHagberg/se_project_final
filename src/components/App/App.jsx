import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Solutions from "../Solutions/Solutions";
import Pricing from "../Pricing/Pricing";
import FAQ from "../FAQ/FAQ";
import DemoView from "../DemoView/DemoView";
import Login from "../Login/Login";
import ChangePassword from "../ChangePassword/ChangePassword";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LeadsList from "../LeadsList/LeadsList";
import LeadDetail from "../LeadDetail/LeadDetail";
import AIConfig from "../AIConfig/AIConfig";
import WidgetSetup from "../WidgetSetup/WidgetSetup";
import AdminOnboard from "../AdminOnboard/AdminOnboard";
import AdminBusinesses from "../AdminBusinesses/AdminBusinesses";
import "../../pages/Pages.css";
import "./App.css";

function DashboardRedirect() {
  const { user } = useAuth();
  if (user?.role === "admin") return <Navigate to="/dashboard/admin/businesses" replace />;
  return <Navigate to="/dashboard/leads" replace />;
}

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/change-password";
  const isDemo = location.pathname === "/demo";
  const showHeader = !isDashboard;
  const showFooter = !isDashboard && !isDemo && !isAuthPage;

  return (
    <>
      {showHeader && <Header />}
      <main className={!isDemo && !isDashboard && !isAuthPage ? "mainHome" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="page">
                <About />
                <Solutions />
                <Pricing />
                <FAQ />
              </div>
            }
          />
          <Route path="/demo" element={<DemoView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardRedirect />} />
            <Route path="leads" element={<LeadsList />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            <Route path="ai-config" element={<AIConfig />} />
            <Route path="widget" element={<WidgetSetup />} />
            <Route
              path="admin/businesses"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminBusinesses />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/onboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminOnboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
