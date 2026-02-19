import "./Pages.css";
import { useNavigate } from "react-router-dom";
import PricingCards from "../components/PricingCards/PricingCards";
import Solutions from "../components/Solutions/Solutions";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <section id="about">
        <h1 className="pageTitle">About LEAI</h1>
        <p>
        LEAI is a next-generation Sales Discovery Assistant designed to bridge the gap between cold leads and closed deals. By leveraging industry-specific intelligence, LEAI automates the most time-consuming part of the sales cycle: the initial discovery and qualification phase.

Core Capabilities
Industry-Specific Intelligence: LEAI doesn't just "chat"—it understands the unique pain points, jargon, and business models of sectors like Real Estate, SaaS, Medical, and E-commerce.

Automated Lead Qualification: Instantly identifies high-value prospects by asking the right discovery questions before a human rep ever has to pick up the phone.

Instant Contextual Greetings: Replaces generic "Hello" messages with personalized, industry-aware introductions that prove LEAI (and your brand) understands the user's business from second one.

24/7 Discovery Pipeline: While your team sleeps, LEAI is busy engaging visitors, capturing intent, and organizing your pipeline for the next morning.
        </p>
      </section>

      <Solutions />

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