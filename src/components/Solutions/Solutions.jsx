/**
 * Solutions.jsx
 * Value-prop section with four circular cards: Cut Discovery Time (75%),
 * Pre-Qualify Leads (3x), Quality Assurance (100%), Warm Lead Handoff (40%).
 * Renders between About and Pricing on the home page.
 */
import "./Solutions.css";

function Solutions() {
  const solutions = [
    {
      title: "Cut Discovery Time",
      stat: "75%",
      description: "Reduce initial discovery calls from 30 minutes to under 5 minutes. LEAI pre-qualifies leads and gathers essential information before your team even connects."
    },
    {
      title: "Pre-Qualify Leads",
      stat: "3x",
      description: "Increase conversion rates by identifying high-intent prospects early. Our AI asks the right questions to separate hot leads from cold inquiries."
    },
    {
      title: "Quality Assurance",
      stat: "100%",
      description: "Ensure consistent, professional interactions with every lead. LEAI maintains your brand voice and never misses critical qualification questions."
    },
    {
      title: "Warm Lead Handoff",
      stat: "40%",
      description: "Empower your sales team with fully qualified, warm leads. Sales reps start conversations with complete context and ready-to-close opportunities."
    }
  ];

  return (
    <section id="solutions" className="solutions">
      <h2 className="solutionsTitle">Solutions</h2>
      <h3 className="solutionsSubTitle">Enhancing Your Sales Process with LEAI</h3>
      <div className="solutionsGrid">
        {solutions.map((solution, index) => (
          <div key={index} className="solutionCard">
            <div className="solutionStat">{solution.stat}</div>
            <h3 className="solutionCardTitle">{solution.title}</h3>
            <p className="solutionCardDescription">{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Solutions;
