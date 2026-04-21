import { useState } from "react";
import { Link } from "react-router-dom";
import "./Solutions.css";

const teamSolutions = [
  {
    title: "Kill the Blind Call",
    stat: "Cut discovery by 75%",
    description:
      "30-minute discovery calls are killing your team's momentum. ALEI handles pre-qualification in under 5 minutes — so reps show up to conversations that actually matter.",
  },
  {
    title: "Only Talk to Buyers",
    stat: "60% fewer wasted calls",
    description:
      "ALEI separates serious buyers from tire-kickers the moment they engage — tripling your conversion rate before a human ever dials.",
  },
  {
    title: "Consistent. Every Time.",
    stat: "Zero off days",
    description:
      "Every lead gets the same sharp, on-brand experience. No off days, no missed questions, no inconsistent pitches — just a flawless first impression, every time.",
  },
  {
    title: "Hand Off, Not Cold Call",
    stat: "2x faster to close",
    description:
      "Your reps inherit full context — budget, pain points, timeline — from the first hello. That's not a warm lead, that's a loaded conversation.",
  },
];

const buyerSolutions = [
  {
    title: "No More Waiting",
    stat: "Response in seconds",
    description:
      "After filling a form, buyers wait 42 hours on average before anyone responds. ALEI answers the moment they submit — so the conversation starts when their interest is highest.",
  },
  {
    title: "Get Real Answers, Fast",
    stat: "Instant product clarity",
    description:
      "Instead of silence followed by a sales call, buyers get immediate, relevant answers about the product, pricing, and fit — tailored to their industry from the first message.",
  },
  {
    title: "Talk on Your Terms",
    stat: "24/7 availability",
    description:
      "Most buyers research nights and weekends. ALEI is always available — whether they prefer typing or talking, at 2pm or 2am, without waiting for business hours.",
  },
  {
    title: "Never Repeat Yourself",
    stat: "Zero cold handoffs",
    description:
      "Every detail shared with ALEI travels with the buyer. When a human rep joins the conversation, they already know the context — no starting over, no repeating yourself.",
  },
];

function Solutions({ showLearnMoreCta = false }) {
  const [view, setView] = useState("team");
  const solutions = view === "team" ? teamSolutions : buyerSolutions;

  return (
    <section id="solutions" className="solutions">
      <div className="solutionsHeader">
        <h2 className="solutionsTitle">Solutions</h2>

        <div className="solutionsToggle">
          <button
            className={`solutionsToggleBtn ${view === "team" ? "solutionsToggleBtn--active" : ""}`}
            onClick={() => setView("team")}
          >
            For Your Team
          </button>
          <button
            className={`solutionsToggleBtn ${view === "buyers" ? "solutionsToggleBtn--active" : ""}`}
            onClick={() => setView("buyers")}
          >
            For Your Buyers
          </button>
        </div>

        <h3 className="solutionsSubTitle">
          {view === "team"
            ? "Stop Losing Deals Before They Start"
            : "A Better Buying Experience From the First Click"}
        </h3>
        <p className="solutionsDescription">
          {view === "team"
            ? "ALEI eliminates the blind call — so every conversation your team has is already worth having."
            : "ALEI gives your buyers instant answers, real conversations, and zero friction — so they never feel like just another lead in a queue."}
        </p>
      </div>
      <div className="solutionsGrid">
        {solutions.map((solution, index) => (
          <div key={index} className="solutionCard">
            <h3 className="solutionCardTitle">{solution.title}</h3>
            <p className="solutionCardDescription">{solution.description}</p>
            <div className="solutionStat">{solution.stat}</div>
          </div>
        ))}
      </div>
      {showLearnMoreCta && (
        <div className="solutionsLearnMoreWrap">
          <Link to="/solutions" className="solutionsLearnMore">
            Learn more
          </Link>
        </div>
      )}
    </section>
  );
}

export default Solutions;
