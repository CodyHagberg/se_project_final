import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { startCheckout } from "../../utils/api";
import individualBg from "../../assets/tier-individual.png";
import smallBusinessBg from "../../assets/tier-small-business.png";
import enterpriseBg from "../../assets/tier-enterprise.png";
import enterprisePlusBg from "../../assets/tier-enterprise-plus.png";
import "./PricingCards.css";

function PricingCards() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");

  const pricingTiers = [
    {
      title: "Individual",
      image: individualBg,
      planSlug: "individual",
      features: [
        "25 conversations per month",
        "Additional conversations billed as you go",
        "Industry knowledge",
        "Analytics dashboard",
        "Email support",
        "1 Seat"
      ]
    },
    {
      title: "Small Business",
      image: smallBusinessBg,
      planSlug: "small_business",
      features: [
        "50 conversations per month",
        "Additional conversations billed as you go",
        "Industry knowledge",
        "Analytics dashboard",
        "Kickoff call",
        "Rep support",
        "5 Seats"
      ]
    },
    {
      title: "Enterprise",
      image: enterpriseBg,
      planSlug: null,
      features: [
        "Hundreds of conversations per month",
        "AI Support widget",
        "Custom integration support",
        "Dedicated account manager",
        "API access"
      ]
    },
    {
      title: "Enterprise+",
      image: enterprisePlusBg,
      planSlug: null,
      features: [
        "Everything in Enterprise",
        "White-label solution",
        "Custom AI model training",
        "On-premise deployment option",
        "24/7 phone support",
        "SLA guarantee"
      ]
    }
  ];

  async function handleGetStarted(planSlug) {
    setCheckoutError("");

    // Not logged in — send to signup so they can create an account first.
    if (!user) {
      navigate(`/signup?plan=${planSlug}`);
      return;
    }

    try {
      setLoadingPlan(planSlug);
      const { url } = await startCheckout(planSlug);
      window.location.href = url;
    } catch (err) {
      setCheckoutError(err.message || "Failed to start checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="pricingCards">
      {checkoutError && (
        <p className="pricingCardsError">{checkoutError}</p>
      )}
      {pricingTiers.map((tier, index) => (
        <div key={index} className="pricingCard">
          <div className="pricingCardHeader">
            <h3 className="pricingCardTitle">{tier.title}</h3>
          </div>
          <div
            className="pricingCardImage"
            style={{ backgroundImage: `url(${tier.image})` }}
          />
          <div className="pricingCardBody">
            <ul className="pricingCardFeatures">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="pricingCardFeature">
                  {feature}
                </li>
              ))}
            </ul>
            {tier.planSlug ? (
              <button
                className="pricingCardButton"
                onClick={() => handleGetStarted(tier.planSlug)}
                disabled={loadingPlan === tier.planSlug}
              >
                {loadingPlan === tier.planSlug ? "Redirecting..." : "Get Started"}
              </button>
            ) : (
              <button
                className="pricingCardButton"
                onClick={() => navigate("/demo")}
              >
                Contact Us
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PricingCards;
