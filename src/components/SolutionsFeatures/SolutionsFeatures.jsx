import "./SolutionsFeatures.css";

import conversationImg from "../../assets/solutions-features/conversation.png";
import contentSetsImg from "../../assets/solutions-features/content-sets.png";
import bookingImg from "../../assets/solutions-features/booking.png";

const features = [
  {
    label: "Feature 01",
    title: "Conversations That Actually Convert",
    description:
      "Every conversation ALEI has is intentional — pre-qualifying leads, capturing context, and moving buyers forward. For your team, that means no more cold calls and no more starting from scratch. For your customers, it means instant answers, zero hold times, and a buying experience that respects their time.",
    image: conversationImg,
    alt: "ALEI conversation transcript showing AI engaging a lead",
  },
  {
    label: "Feature 02",
    title: "Content Sets: Show, Don't Just Tell",
    description:
      "Attach menus, PDFs, pricing sheets, product demos, or any file directly inside ALEI's responses. When a buyer asks about your services, ALEI doesn't just describe them — it delivers the right visual at the right moment. Content Sets make every conversation richer, faster, and more convincing.",
    image: contentSetsImg,
    alt: "Content Set configuration screen showing items with file links",
  },
  {
    label: "Feature 03",
    title: "Book the Meeting Before They Leave",
    description:
      "When a conversation reaches its natural close, ALEI automatically surfaces a \"Book a Call\" button tied to your Google Calendar, Calendly, or any scheduling link. No follow-up email, no chasing — the meeting gets booked while interest is still at its peak.",
    image: bookingImg,
    alt: "Appointment Scheduling section with booking link field",
  },
];

function SolutionsFeatures() {
  return (
    <section className="solutionsFeatures">
      <div className="solutionsFeaturesHeader">
        <h3 className="solutionsFeaturesTitle">Built-In Features That Close Deals</h3>
        <p className="solutionsFeaturesSubtitle">
          Three capabilities that transform every conversation from a cold exchange into a warm, informed handoff.
        </p>
      </div>
      <ol className="solutionsFeaturesList">
        {features.map((feature, index) => (
          <li key={index} className="solutionsFeaturesStep">
            <div className="solutionsFeaturesCopy">
              <span className="solutionsFeaturesLabel">{feature.label}</span>
              <h4 className="solutionsFeaturesStepTitle">{feature.title}</h4>
              <p className="solutionsFeaturesStepDesc">{feature.description}</p>
            </div>
            <div className="solutionsFeaturesImageWrap">
              <img
                src={feature.image}
                alt={feature.alt}
                className="solutionsFeaturesImage"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default SolutionsFeatures;
