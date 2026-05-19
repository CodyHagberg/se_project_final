import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Solutions from "../Solutions/Solutions";
import Pricing from "../Pricing/Pricing";
import FAQ from "../FAQ/FAQ";
import DemoView from "../DemoView/DemoView";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
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
import TenantUsers from "../TenantUsers/TenantUsers";
import Integrations from "../../pages/Integrations/Integrations";
import SolutionsDeepDive from "../SolutionsDeepDive/SolutionsDeepDive";
import AboutMission from "../AboutMission/AboutMission";
import TermsOfService from "../Terms/TermsOfService";
import PrivacyPolicy from "../Terms/PrivacyPolicy";
import AUP from "../Terms/AUP";
import SubProcessors from "../Terms/SubProcessors";
import DPA from "../Terms/DPA";
import LegalIndex from "../Terms/LegalIndex";
import { SITE_PUB_KEY } from "../../utils/constants";
import "../../pages/Pages.css";
import "./App.css";

/** Redirects non-enterprise (and non-admin) users to the overview page. */
function EnterpriseRoute({ children }) {
  const { user } = useAuth();
  const { isAdminActing } = useActingBusinessId();
  if (user?.role === "admin" || isAdminActing) return children;
  if (user?.plan !== "enterprise") return <Navigate to="/dashboard/overview" replace />;
  return children;
}

function DashboardRedirect() {
  const { user } = useAuth();
  const { actingBusinessId } = useActingBusinessId();

  if (user?.role === "admin" && actingBusinessId) {
    return (
      <Navigate
        to={`/dashboard/overview?businessId=${encodeURIComponent(actingBusinessId)}`}
        replace
      />
    );
  }
  if (user?.role === "admin") {
    return <Navigate to="/dashboard/admin/businesses" replace />;
  }
  return <Navigate to="/dashboard/overview" replace />;
}

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/change-password";
  const isDemo = location.pathname === "/demo";
  const isSupportBubble = location.pathname === "/support-bubble";
  const isWidget = location.pathname === "/widget";
  const showHeader = !isDashboard && !isSupportBubble && !isWidget;
  const showFooter = !isDashboard && !isDemo && !isAuthPage && !isSupportBubble && !isWidget;

  const hasGradient = !isDashboard && !isSupportBubble && !isWidget;

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;
    const id = location.hash.slice(1);
    if (!id) return;
    const run = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    requestAnimationFrame(run);
  }, [location.pathname, location.hash]);

  // Start every new page at the top. Skip when a hash is present so in-page
  // anchor scrolls (e.g. "/#pricing", "/#faq") still work.
  useEffect(() => {
    if (location.hash) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className={hasGradient ? "appHome" : undefined}>
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="page">
                <About showLearnMoreCta />
                <Solutions showLearnMoreCta />
                <Pricing showLearnMoreCta />
                <FAQ />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="page">
                <About />
                <AboutMission />
              </div>
            }
          />
          <Route
            path="/solutions"
            element={
              <div className="page">
                <Solutions />
                <SolutionsDeepDive />
              </div>
            }
          />
          <Route
            path="/pricing"
            element={
              <div className="page">
                <Pricing />
              </div>
            }
          />
          <Route path="/demo" element={<DemoView />} />
          <Route path="/legal" element={<LegalIndex />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/aup" element={<AUP />} />
          <Route path="/sub-processors" element={<SubProcessors />} />
          <Route path="/dpa" element={<DPA />} />
          <Route path="/support-bubble" element={<SupportBubble />} />
          <Route path="/widget" element={<EmbeddableWidget />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
            <Route path="support-config" element={<EnterpriseRoute><SupportConfig /></EnterpriseRoute>} />
            <Route path="integrations" element={<EnterpriseRoute><Integrations /></EnterpriseRoute>} />
            <Route
              path="users"
              element={
                <ProtectedRoute requiredRole="business">
                  <TenantUsers />
                </ProtectedRoute>
              }
            />
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
