/**
 * About.jsx
 * Landing "About LEAI" section: intro copy and Core Capabilities list
 * (industry intelligence, lead qualification, contextual greetings, 24/7 pipeline).
 * id="about" for header anchor links.
 */
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <h1 className="aboutTitle">About LEAI</h1>
      <p className="aboutIntro">
        LEAI is a next-generation Sales Discovery Assistant designed to bridge the gap between cold leads and closed deals. By leveraging industry-specific intelligence, LEAI automates the most time-consuming part of the sales cycle: the initial discovery and qualification phase.
      </p>
      <div className="aboutCapabilities">
        <h3 className="aboutSubtitle">Core Capabilities</h3>
        <ul className="aboutList">
          <li>
            <strong>Industry-Specific Intelligence:</strong> LEAI doesn't just "chat"—it understands the unique pain points, jargon, and business models of sectors like Real Estate, SaaS, Medical, and E-commerce.
          </li>
          <li>
            <strong>Automated Lead Qualification:</strong> Instantly identifies high-value prospects by asking the right discovery questions before a human rep ever has to pick up the phone.
          </li>
          <li>
            <strong>Instant Contextual Greetings:</strong> Replaces generic "Hello" messages with personalized, industry-aware introductions that prove LEAI (and your brand) understands the user's business from second one.
          </li>
          <li>
            <strong>24/7 Discovery Pipeline:</strong> While your team sleeps, LEAI is busy engaging visitors, capturing intent, and organizing your pipeline for the next morning.
          </li>
        </ul>
      </div>
    </section>
  );
}

export default About;
