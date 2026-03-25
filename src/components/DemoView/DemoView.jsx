import EmbeddableWidget from "../EmbeddableWidget/EmbeddableWidget";
import { SITE_PUB_KEY } from "../../utils/constants";
import "../../pages/Pages.css";
import "./DemoView.css";

function DemoView() {
  return (
    <div className="demoView">
      <h1 className="demoViewTitle">Demo</h1>
      <EmbeddableWidget apiKey={SITE_PUB_KEY} />
    </div>
  );
}

export default DemoView;
