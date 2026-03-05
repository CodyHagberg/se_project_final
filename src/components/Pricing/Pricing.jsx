import PricingCards from "../PricingCards/PricingCards";
import "./Pricing.css";

function Pricing() {
  return (
    <section id="pricing" className="pricing pageSection">
      <div className="pricingTitleBubble">
        <h2 className="pricingTitle">Pricing</h2>
      </div>
      <PricingCards />
    </section>
  );
}

export default Pricing;
