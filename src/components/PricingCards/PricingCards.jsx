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
