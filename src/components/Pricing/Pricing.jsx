import PricingCards from "../PricingCards/PricingCards";
import "./Pricing.css";

function Pricing() {
  return (
    <section id="pricing" className="pricing pageSection">
      <h2 className="pricingTitle">Pricing</h2>
      <PricingCards />
    </section>
  );
}

export default Pricing;
