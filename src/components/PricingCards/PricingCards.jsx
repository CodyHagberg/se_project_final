/**
 * PricingCards.jsx
 * Four pricing tiers (Individual, Small Business, Enterprise, Enterprise+)
 * with feature bullets and a "Try Demo" button that routes to /demo.
 */
import { useNavigate } from "react-router-dom";
import "./PricingCards.css";

function PricingCards() {
  const navigate = useNavigate();

  const pricingTiers = [
    {
      title: "Individual",
      features: [
        "Up to 10 conversations per month",
        "Basic industry qualification",
        "Email support",
        "Standard response time"
      ]
    },
    {
      title: "Small Business",
      features: [
        "Up to 50 conversations per month",
        "Advanced industry qualification",
        "Priority email support",
        "Custom greeting templates",
        "Analytics dashboard"
      ]
    },
    {
      title: "Enterprise",
      features: [
        "Unlimited conversations",
        "Full industry qualification suite",
        "Dedicated account manager",
        "Custom integration support",
        "Advanced analytics & reporting",
        "API access"
      ]
    },
    {
      title: "Enterprise +",
      features: [
        "Everything in Enterprise",
        "White-label solution",
        "On-premise deployment option",
        "Custom AI model training",
        "24/7 phone support",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <div className="pricingCards">
      {pricingTiers.map((tier, index) => (
        <div key={index} className="pricingCard">
          <h3 className="pricingCardTitle">{tier.title}</h3>
          <ul className="pricingCardFeatures">
            {tier.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="pricingCardFeature">
                {feature}
              </li>
            ))}
          </ul>
          <button
            className="pricingCardButton"
            onClick={() => navigate("/demo")}
          >
            Try Demo
          </button>
        </div>
      ))}
    </div>
  );
}

export default PricingCards;
