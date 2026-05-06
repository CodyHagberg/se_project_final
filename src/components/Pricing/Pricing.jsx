import { Link } from "react-router-dom";
import PricingCards from "../PricingCards/PricingCards";
import pricingVideo from "../../assets/ALEI — Your Form Just Got a Brain (Flat Vector).mp4";
import "./Pricing.css";

function Pricing({ showLearnMoreCta = false }) {
  return (
    <section id="pricing" className="pricing pageSection">
      <div className="pricingHeader">
        <h2 className="pricingTitle">Pricing</h2>
        <p className="pricingDescription">
          Simple, transparent plans that scale with your pipeline. Start small,
          grow into Enterprise — no surprises, no gotchas.
        </p>
      </div>
      {!showLearnMoreCta && (
        <div className="pricingVideoWrap">
          <video
            className="pricingVideo"
            src={pricingVideo}
            controls
            playsInline
          />
        </div>
      )}
      <PricingCards />
      {showLearnMoreCta && (
        <div className="pricingLearnMoreWrap">
          <Link to="/pricing" className="pricingLearnMore">
            Learn more
          </Link>
        </div>
      )}
    </section>
  );
}

export default Pricing;
