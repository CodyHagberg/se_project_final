/**
 * App.jsx
 * Root layout and routing. Composes the full LEAI site:
 * - Header (always visible)
 * - Home route (/): About, Solutions, Pricing, FAQ
 * - Demo route (/demo): DemoView only (lead form + AI chat)
 * - Footer shown only on home; hidden on demo for a focused experience.
 */
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Solutions from "../Solutions/Solutions";
import Pricing from "../Pricing/Pricing";
import FAQ from "../FAQ/FAQ";
import DemoView from "../DemoView/DemoView";
import "../../pages/Pages.css";

function App() {
  const location = useLocation();
  const isDemo = location.pathname === "/demo";

  return (
    <>
      <Header />
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
        </Routes>
      </main>
      {!isDemo && <Footer />}
    </>
  );
}

export default App;
