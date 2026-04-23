import "./HowItWorks.css";

import customizeWidgetImg from "../../assets/how-it-works/01-customize-widget.png";
import configureAiImg from "../../assets/how-it-works/02-configure-ai.png";
import embedSnippetImg from "../../assets/how-it-works/03-embed-snippet.png";
import customerChoiceImg from "../../assets/how-it-works/04-customer-choice.png";
import dashboardViewImg from "../../assets/how-it-works/05-dashboard-view.png";
import conversationImg from "../../assets/how-it-works/06-conversation.png";

const howItWorksSteps = [
  {
    title: "Customize Your Widget",
    description:
      "Start by shaping the widget to match your brand. Set the form title, submit button copy, greeting screen, and lead capture fields — everything visitors see before they start a conversation.",
    image: customizeWidgetImg,
    alt: "Widget Customizer screen with live preview of the lead capture form",
  },
  {
    title: "Configure Your AI",
    description:
      "Teach ALEI who you are. Name your assistant, describe your company, and load a system instruction and greeting template so every conversation sounds like it came from your best rep.",
    image: configureAiImg,
    alt: "AI Sales Config screen for customizing assistant behavior",
  },
  {
    title: "Embed The Snippet",
    description:
      "Copy a single iframe snippet and paste it into your site before the closing </body> tag. No plugins, no complex setup — your AI sales assistant is live in seconds.",
    image: embedSnippetImg,
    alt: "Widget Setup screen showing the copy-paste embed snippet",
  },
  {
    title: "Visitors Choose Voice Or Text",
    description:
      "Once a visitor submits the form, they're greeted by name and given the choice to speak with ALEI in real time or chat by text — whichever feels most natural to them.",
    image: customerChoiceImg,
    alt: "Customer-facing screen offering Voice Conversation or Text Chat",
  },
  {
    title: "Track It All In Your Dashboard",
    description:
      "Every lead, every conversation, every outcome — organized in one place. Monitor usage, lead activity, and pipeline status at a glance so nothing slips through the cracks.",
    image: dashboardViewImg,
    alt: "Dashboard overview with leads, monthly usage, and lead activity chart",
  },
  {
    title: "Review Real Conversations",
    description:
      "Drill into full conversation transcripts between ALEI and your leads. See exactly what was asked, how it was answered, and where to follow up — all searchable and saved.",
    image: conversationImg,
    alt: "Conversation transcript between ALEI and a lead",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="howItWorks">
      <div className="howItWorksHeader">
        <h3 className="howItWorksTitle">How ALEI Works</h3>
        <p className="howItWorksSubtitle">
          From setup to signed deal, here's the full journey — in six steps.
        </p>
      </div>
      <ol className="howItWorksList">
        {howItWorksSteps.map((step, index) => (
          <li key={index} className="howItWorksStep">
            <div className="howItWorksCopy">
              <span className="howItWorksStepNumber">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="howItWorksStepTitle">{step.title}</h4>
              <p className="howItWorksStepDesc">{step.description}</p>
            </div>
            <div className="howItWorksImageWrap">
              <img
                src={step.image}
                alt={step.alt}
                className="howItWorksImage"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default HowItWorks;
