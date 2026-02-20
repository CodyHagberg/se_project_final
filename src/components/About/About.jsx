/**
 * About.jsx
 * Single "About LEAI" card: static intro on top, Core Capabilities
 * step-through below (one capability at a time with prev/next arrows).
 * id="about" for header anchor links.
 */
import { useState } from "react";
import "./About.css";

const capabilities = [
  {
    title: "Industry-Specific Intelligence",
    description:
      "LEAI doesn't just \"chat\"—it understands the unique pain points, jargon, and business models of sectors like Real Estate, SaaS, Medical, and E-commerce."
  },
  {
    title: "Automated Lead Qualification",
    description:
      "Instantly identifies high-value prospects by asking the right discovery questions before a human rep ever has to pick up the phone."
  },
  {
    title: "Instant Contextual Greetings",
    description:
      "Replaces generic \"Hello\" messages with personalized, industry-aware introductions that prove LEAI (and your brand) understands the user's business from second one."
  },
  {
    title: "24/7 Discovery Pipeline",
    description:
      "While your team sleeps, LEAI is busy engaging visitors, capturing intent, and organizing your pipeline for the next morning."
  }
];

function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? capabilities.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === capabilities.length - 1 ? 0 : prev + 1));
  };

  const current = capabilities[activeIndex];

  return (
    <section id="about" className="about">
      <div className="aboutCard">
        <h1 className="aboutTitle">About LEAI</h1>
        <p className="aboutIntro">
          LEAI is a next-generation Sales Discovery Assistant designed to bridge
          the gap between cold leads and closed deals. By leveraging
          industry-specific intelligence, LEAI automates the most time-consuming
          part of the sales cycle: the initial discovery and qualification phase.
        </p>

        <hr className="aboutDivider" />

        <div className="aboutCapabilities">
          <div className="aboutCapabilitiesHeader">
            <h3 className="aboutSubtitle">Core Capabilities</h3>
            <div className="aboutControls">
              <button className="aboutArrow" onClick={goPrev} aria-label="Previous">
                ‹
              </button>
              <span className="aboutCounter">
                {activeIndex + 1} / {capabilities.length}
              </span>
              <button className="aboutArrow" onClick={goNext} aria-label="Next">
                ›
              </button>
            </div>
          </div>

          <div className="aboutCapabilityContent">
            <h4 className="aboutCapabilityTitle">{current.title}</h4>
            <p className="aboutCapabilityDesc">{current.description}</p>
          </div>

          <div className="aboutDots">
            {capabilities.map((_, index) => (
              <button
                key={index}
                className={`aboutDot ${index === activeIndex ? "aboutDotActive" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to capability ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
