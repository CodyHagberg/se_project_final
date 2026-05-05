import { useState } from "react";
import "./SolutionsDeepDive.css";

import customizeWidgetImg from "../../assets/how-it-works/01-customize-widget.png";
import configureAiImg from "../../assets/how-it-works/02-configure-ai.png";
import embedSnippetImg from "../../assets/how-it-works/03-embed-snippet.png";
import customerChoiceImg from "../../assets/how-it-works/04-customer-choice.png";
import dashboardViewImg from "../../assets/how-it-works/05-dashboard-view.png";
import conversationImg from "../../assets/how-it-works/06-conversation.png";

import featureConversationImg from "../../assets/solutions-features/conversation.png";
import featureContentSetsImg from "../../assets/solutions-features/content-sets.png";
import featureBookingImg from "../../assets/solutions-features/booking.png";

const howItWorksSteps = [
  {
    label: "Step 01",
    title: "Customize Your Widget",
    description:
      "Start by shaping the widget to match your brand. Set the form title, submit button copy, greeting screen, and lead capture fields — everything visitors see before they start a conversation.",
    image: customizeWidgetImg,
    alt: "Widget Customizer screen with live preview of the lead capture form",
  },
  {
    label: "Step 02",
    title: "Configure Your AI",
    description:
      "Teach ALEI who you are. Name your assistant, describe your company, and load a system instruction and greeting template so every conversation sounds like it came from your best rep.",
    image: configureAiImg,
    alt: "AI Sales Config screen for customizing assistant behavior",
  },
  {
    label: "Step 03",
    title: "Embed The Snippet",
    description:
      "Copy a single iframe snippet and paste it into your site before the closing </body> tag. No plugins, no complex setup — your AI sales assistant is live in seconds.",
    image: embedSnippetImg,
    alt: "Widget Setup screen showing the copy-paste embed snippet",
  },
  {
    label: "Step 04",
    title: "Visitors Choose Voice Or Text",
    description:
      "Once a visitor submits the form, they're greeted by name and given the choice to speak with ALEI in real time or chat by text — whichever feels most natural to them.",
    image: customerChoiceImg,
    alt: "Customer-facing screen offering Voice Conversation or Text Chat",
  },
  {
    label: "Step 05",
    title: "Track It All In Your Dashboard",
    description:
      "Every lead, every conversation, every outcome — organized in one place. Monitor usage, lead activity, and pipeline status at a glance so nothing slips through the cracks.",
    image: dashboardViewImg,
    alt: "Dashboard overview with leads, monthly usage, and lead activity chart",
  },
  {
    label: "Step 06",
    title: "Review Real Conversations",
    description:
      "Drill into full conversation transcripts between ALEI and your leads. See exactly what was asked, how it was answered, and where to follow up — all searchable and saved.",
    image: conversationImg,
    alt: "Conversation transcript between ALEI and a lead",
  },
];

const builtInFeatures = [
  {
    label: "Feature 01",
    title: "Conversations That Actually Convert",
    description:
      "Every conversation ALEI has is intentional — pre-qualifying leads, capturing context, and moving buyers forward. For your team, that means no more cold calls and no more starting from scratch. For your customers, it means instant answers, zero hold times, and a buying experience that respects their time.",
    image: featureConversationImg,
    alt: "ALEI conversation transcript showing AI engaging a lead",
  },
  {
    label: "Feature 02",
    title: "Content Sets: Show, Don't Just Tell",
    description:
      "Attach menus, PDFs, pricing sheets, product demos, or any file directly inside ALEI's responses. When a buyer asks about your services, ALEI doesn't just describe them — it delivers the right visual at the right moment. Content Sets make every conversation richer, faster, and more convincing.",
    image: featureContentSetsImg,
    alt: "Content Set configuration screen showing items with file links",
  },
  {
    label: "Feature 03",
    title: "Book the Meeting Before They Leave",
    description:
      "When a conversation reaches its natural close, ALEI automatically surfaces a \"Book a Call\" button tied to your Google Calendar, Calendly, or any scheduling link. No follow-up email, no chasing — the meeting gets booked while interest is still at its peak.",
    image: featureBookingImg,
    alt: "Appointment Scheduling section with booking link field",
  },
];

function SolutionsDeepDive() {
  const [view, setView] = useState("how-it-works");

  const isHowItWorks = view === "how-it-works";
  const items = isHowItWorks ? howItWorksSteps : builtInFeatures;

  return (
    <section className="sdd">
      <div className="sddHeader">
        <h3 className="sddTitle">
          {isHowItWorks ? "How ALEI Works" : "Built-In Features"}
        </h3>

        <div className="sddToggle">
          <button
            className={`sddToggleBtn ${isHowItWorks ? "sddToggleBtn--active" : ""}`}
            onClick={() => setView("how-it-works")}
          >
            How It Works
          </button>
          <button
            className={`sddToggleBtn ${!isHowItWorks ? "sddToggleBtn--active" : ""}`}
            onClick={() => setView("features")}
          >
            Built-In Features
          </button>
        </div>

        <p className="sddSubtitle">
          {isHowItWorks
            ? "From setup to signed deal, here's the full journey — in six steps."
            : "Three capabilities that transform every conversation from a cold exchange into a warm, informed handoff."}
        </p>
      </div>

      <ol className="sddList">
        {items.map((item, index) => (
          <li key={`${view}-${index}`} className="sddStep">
            <div className="sddCopy">
              <span className="sddLabel">{item.label}</span>
              <h4 className="sddStepTitle">{item.title}</h4>
              <p className="sddStepDesc">{item.description}</p>
            </div>
            <div className="sddImageWrap">
              <img
                src={item.image}
                alt={item.alt}
                className="sddImage"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default SolutionsDeepDive;
