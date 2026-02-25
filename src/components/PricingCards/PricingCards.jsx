import { useNavigate } from "react-router-dom";
import individualBg from "../../assets/individual.svg";
import smallBusinessBg from "../../assets/small business.svg";
import enterpriseBg from "../../assets/enterprise.svg";
import enterprisePlusBg from "../../assets/enterprise_plus.svg";
import "./PricingCards.css";

function PricingCards() {
  const navigate = useNavigate();

  const pricingTiers = [
    {
      title: "Individual",
      image: individualBg,
      features: [
        "Up to 10 conversations per month",
        "Basic industry qualification",
        "Email support",
        "Standard response time"
      ]
    },
    {
      title: "Small Business",
      image: smallBusinessBg,
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
      image: enterpriseBg,
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
      image: enterprisePlusBg,
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
            <button
              className="pricingCardButton"
              onClick={() => navigate("/demo")}
            >
              Try Demo
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PricingCards;
