import "./Pages.css";
import { useNavigate } from "react-router-dom";
import PricingCards from "../components/PricingCards/PricingCards";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <section id="about">
        <h1 className="pageTitle">About LEAI</h1>
        <p>
          LEAI is your sales discovery assistant, helping qualify leads by
          industry and kickstart personalized conversations.
        </p>
      </section>

      <section id="pricing" className="pageSection">
        <h2 className="pageTitle">Pricing</h2>
        <PricingCards />
      </section>

      <section id="faq" className="pageSection">
        <h2 className="pageTitle">FAQ</h2>
        <p>
          Common questions about how LEAI works and how it fits into your sales
          workflow will appear here.
        </p>
      </section>
    </div>
  );
}

export default Home;