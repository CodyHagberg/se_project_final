import "./Solutions.css";

function Solutions() {
  const solutions = [
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

  return (
    <section id="solutions" className="solutions">
      <div className="solutionsHeader">
        <h2 className="solutionsTitle">Solutions</h2>
        <h3 className="solutionsSubTitle">Stop Losing Deals Before They Start</h3>
        <p className="solutionsDescription">
          ALEI eliminates the blind call — so every conversation your team has is already worth having.
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
    </section>
  );
}

export default Solutions;
