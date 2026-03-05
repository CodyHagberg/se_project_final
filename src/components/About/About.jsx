import "./About.css";

const capabilities = [
  {
    title: "Industry-Specific Intelligence",
    description:
      "LEAI understands the unique pain points, jargon, and business models of sectors like Real Estate, SaaS, Medical, and E-commerce.",
  },
  {
    title: "Automated Lead Qualification",
    description:
      "Instantly identifies high-value prospects by asking the right discovery questions before a human rep ever has to pick up the phone.",
  },
  {
    title: "Instant Contextual Greetings",
    description:
      "Replaces generic messages with personalized, industry-aware introductions that prove your brand understands the user's business.",
  },
  {
    title: "24/7 Discovery Pipeline",
    description:
      "While your team sleeps, LEAI is busy engaging visitors, capturing intent, and organizing your pipeline for the next morning.",
  },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="aboutHero">
        <div className="aboutTitleBubble">
          <h2 className="aboutTitle">About LEAI</h2>
        </div>
        <p className="aboutIntro">
          LEAI is a next-generation Sales Discovery Assistant designed to bridge
          the gap between cold leads and closed deals. By leveraging
          industry-specific intelligence, LEAI automates the most time-consuming
          part of the sales cycle: the initial discovery and qualification phase.
        </p>
      </div>
      <div className="aboutGrid">
        {capabilities.map((cap, index) => (
          <div key={index} className="aboutFeatureCard">
            <span className="aboutFeatureNumber">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="aboutFeatureTitle">{cap.title}</h4>
            <p className="aboutFeatureDesc">{cap.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
