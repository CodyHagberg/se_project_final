import "./AboutMission.css";
import codyImg from "../../assets/cody-hagberg.png";

function AboutMission() {
  return (
    <section className="aboutMission">
      <div className="aboutMissionHeader">
        <h3 className="aboutMissionTitle">Our Mission</h3>
        <p className="aboutMissionStatement">
          Make sure every lead gets the right conversation, the moment they raise
          their hand — and every rep walks into a call already knowing who
          they're talking to.
        </p>
      </div>

      <div className="aboutMissionBody">
        <div className="aboutMissionBlock">
          <h4 className="aboutMissionBlockTitle">Why ALEI Exists</h4>
          <p className="aboutMissionBlockText">
            Sales is broken on both sides of the form.
          </p>
          <p className="aboutMissionBlockText">
            Buyers fill out a form and wait an average of 42 hours for a
            response. By then, most of them have already gone with whoever called
            back first. On the other side of the inbox, sales reps are dialing
            blind — burning half their day on unqualified calls and trying to
            discover, qualify, and close in a single conversation.
          </p>
          <p className="aboutMissionBlockText">
            We built ALEI because the fix isn't another CRM field or a faster
            auto-responder. It's giving every lead a real conversation the second
            they hit submit, and giving every rep the full context of that
            conversation before they pick up the phone.
          </p>
          <p className="aboutMissionBlockText aboutMissionBlockText--accent">
            We call it Agentic Lead Engagement Intelligence. Most people just
            call it the unfair advantage.
          </p>
        </div>

        <div className="aboutMissionFounder">
          <div className="aboutMissionFounderImageWrap">
            <img
              src={codyImg}
              alt="Cody Hagberg, Founder & CEO"
              className="aboutMissionFounderImage"
            />
          </div>
          <div className="aboutMissionFounderInfo">
            <h4 className="aboutMissionFounderName">Cody Hagberg</h4>
            <span className="aboutMissionFounderRole">Founder & CEO</span>
            <p className="aboutMissionFounderBio">
              Cody spent five years inside a fast-moving restaurant tech startup,
              where he helped scale concepts to over 3,500 locations and shaped
              an AI-powered marketing tool now used by hundreds of operators.
              Working across marketing, operations, and onboarding, he watched
              the lead-response problem play out at scale — and built ALEI to fix
              it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMission;
