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
import DashboardOverview from "../DashboardOverview/DashboardOverview";
import Dojo from "../Dojo/Dojo";
import SupportConfig from "../SupportConfig/SupportConfig";
import SupportBubble from "../SupportBubble/SupportBubble";
import EmbeddableWidget from "../EmbeddableWidget/EmbeddableWidget";
import WidgetCustomizer from "../WidgetCustomizer/WidgetCustomizer";
import Integrations from "../../pages/Integrations/Integrations";
import Terms from "../Terms/Terms";
import TermsOfService from "../Terms/TermsOfService";
import PrivacyPolicy from "../Terms/PrivacyPolicy";
import { SITE_PUB_KEY } from "../../utils/constants";
import "../../pages/Pages.css";
import "./App.css";

function DashboardRedirect() {
  const { user } = useAuth();
  if (user?.role === "admin") return <Navigate to="/dashboard/admin/businesses" replace />;
  return <Navigate to="/dashboard/overview" replace />;
}

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/change-password";
  const isDemo = location.pathname === "/demo";
  const isSupportBubble = location.pathname === "/support-bubble";
  const isWidget = location.pathname === "/widget";
  const showHeader = !isDashboard && !isSupportBubble && !isWidget;
  const showFooter = !isDashboard && !isDemo && !isAuthPage && !isSupportBubble && !isWidget;

  const hasGradient = !isDashboard && !isSupportBubble && !isWidget;

  return (
    <div className={hasGradient ? "appHome" : undefined}>
      {showHeader && <Header />}
      <main>
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
          <Route path="/terms" element={<Terms />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/support-bubble" element={<SupportBubble />} />
          <Route path="/widget" element={<EmbeddableWidget />} />
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
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="leads" element={<LeadsList />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            <Route path="ai-config" element={<AIConfig />} />
            <Route path="widget" element={<WidgetSetup />} />
            <Route path="testing-center" element={<Dojo />} />
            <Route path="dojo" element={<Navigate to="/dashboard/testing-center" replace />} />
            <Route path="widget-customizer" element={<WidgetCustomizer />} />
            <Route path="support-config" element={<SupportConfig />} />
            <Route path="integrations" element={<Integrations />} />
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
      {showFooter && SITE_PUB_KEY && <SupportBubble apiKey={SITE_PUB_KEY} />}
    </div>
  );
}

export default App;
