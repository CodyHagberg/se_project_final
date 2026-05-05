import "./AboutTeam.css";
import codyImg from "../../assets/cody-hagberg.png";

const team = [
  {
    name: "Cody Hagberg",
    role: "Founder & CEO",
    image: codyImg,
    bio: "Cody spent five years inside a fast-moving restaurant tech startup, where he helped scale concepts to over 3,500 locations and shaped an AI-powered marketing tool now used by hundreds of operators. Working across marketing, operations, and onboarding, he watched the lead-response problem play out at scale — and built ALEI to fix it.",
  },
];

function AboutTeam() {
  return (
    <section className="aboutTeam">
      <div className="aboutTeamHeader">
        <h3 className="aboutTeamTitle">Meet Our Team</h3>
        <p className="aboutTeamSubtitle">
          The people behind the platform — and the problem they set out to solve.
        </p>
      </div>

      <div className="aboutTeamGrid">
        {team.map((member, index) => (
          <div key={index} className="aboutTeamCard">
            <div className="aboutTeamImageWrap">
              <img
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                className="aboutTeamImage"
              />
            </div>
            <div className="aboutTeamInfo">
              <h4 className="aboutTeamName">{member.name}</h4>
              <span className="aboutTeamRole">{member.role}</span>
              <p className="aboutTeamBio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutTeam;
