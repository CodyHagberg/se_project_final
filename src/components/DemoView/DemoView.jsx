import EmbeddableWidget from "../EmbeddableWidget/EmbeddableWidget";
import { SITE_PUB_KEY } from "../../utils/constants";
import "../../pages/Pages.css";
import "./DemoView.css";

function DemoView() {
  return (
    <div className="demoView">
      <div className="demoView__header">
        <h1 className="demoView__title">Join the Enterprise Waitlist</h1>
        <p className="demoView__subtitle">
          Enterprise and Enterprise+ plans are available by invitation. Fill out the form below
          to join the waitlist — our team will follow up with next steps.
        </p>
      </div>
      <EmbeddableWidget apiKey={SITE_PUB_KEY} />
    </div>
  );
}

export default DemoView;
