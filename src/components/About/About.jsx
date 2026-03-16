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
      "No more blind calls. LEAI asks the hard discovery questions — budget, timeline, pain points — so your reps only touch leads that are ready to talk.",
  },
  {
    title: "Instant Contextual Greetings",
    description:
      "First impressions close deals. LEAI greets every visitor by name with messaging tailored to their industry — in the first second of interaction.",
  },
  {
    title: "24/7 Discovery Pipeline",
    description:
      "Your best rep doesn't sleep. LEAI works nights, weekends, and holidays — capturing intent and warming leads while your team recharges.",
  },
];

function About() {
  return (
    <section id="about" className="about">
      <div className="aboutHero">
        <h2 className="aboutTitle">The Engine Behind Closed Deals</h2>
        <p className="aboutIntro">
        Most leads go cold before a human ever says hello. LEAI changes that — a native audio and chat assistant that qualifies, engages, and organizes your pipeline the moment a prospect shows up.
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
