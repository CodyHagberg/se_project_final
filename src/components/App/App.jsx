import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Solutions from "../Solutions/Solutions";
import Pricing from "../Pricing/Pricing";
import FAQ from "../FAQ/FAQ";
import DemoView from "../DemoView/DemoView";
import "../../pages/Pages.css";
import "./App.css";

function App() {
  const location = useLocation();
  const isDemo = location.pathname === "/demo";

  return (
    <>
      <Header />
      <main className={!isDemo ? "mainHome" : ""}>
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
