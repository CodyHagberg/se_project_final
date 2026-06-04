import { useState } from "react";
import "./FAQ.css";

const faqItems = [
  {
    question: "What is ALEI?",
    answer:
      "ALEI (Agentic Lead Engagement Intelligence) is an AI-powered lead engagement platform that turns static website forms into live conversations. When a prospect submits a form, ALEI's AI instantly engages them — by name — via text or voice, qualifies them, and hands your sales team a full conversation transcript before the first human call.",
  },
  {
    question: "What makes ALEI different from a chatbot?",
    answer:
      "Most chatbots are reactive — they wait for the visitor to click a button. ALEI is an agentic AI that activates immediately upon form submission, engages the lead while their intent is highest, and builds a rich prospect profile. It's not a FAQ bot — it's a pre-sales intelligence engine.",
  },
  {
    question: "Does ALEI support voice conversations?",
    answer:
      "Yes. ALEI is built on Google Gemini Live API for native, real-time voice — not text-to-speech bolted on after the fact. Prospects can engage by voice or text, depending on their preference.",
  },
  {
    question: "What kind of businesses use ALEI?",
    answer:
      "ALEI is designed for any business with inbound lead volume: service companies (roofing, landscaping, contracting), SaaS teams running demo request flows, real estate agents, recruiting and hiring teams, and medical practices. If you have a contact form, ALEI can work for you.",
  },
  {
    question: "How does ALEI help sales teams close more deals?",
    answer:
      "Sales reps currently spend roughly 50% of their time on unqualified calls, and the average lead waits 42+ hours for a first response. ALEI eliminates both problems — prospects are engaged in seconds, and reps only enter calls with full context. Customers report 75% less discovery time, 60% fewer wasted calls, and 2x faster time-to-close.",
  },
  {
    question: "What is an AI-Enhanced Lead?",
    answer:
      "An AI-Enhanced Lead is a prospect who has completed an ALEI conversation. This is the core unit of ALEI's platform — a lead that arrives pre-qualified with a transcript, so your team knows who they're talking to before picking up the phone.",
  },
  {
    question: "How much does ALEI cost?",
    answer:
      "ALEI offers three tiers: Individual ($25/mo, 25 conversations, 1 seat), Small Business ($50/mo, 50 conversations, 5 seats), and Enterprise (custom pricing, unlimited seats). Enterprise+ includes white-label options for agencies and resellers.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. ALEI is built with data privacy at its core. All conversation data is handled in accordance with our Terms of Service, Privacy Policy, and Data Processing Addendum — available at alei.ai/legal.",
  },
  {
    question: "Can I customize what the AI says?",
    answer:
      "Yes. Each ALEI deployment is fully configurable — you can set the AI persona, provide industry-specific knowledge, write custom greeting scripts, and define the qualification questions that matter most to your business.",
  },
  {
    question: "What's the difference between the Sales AI and Support AI?",
    answer:
      "ALEI includes two AI personas. The Sales AI drives lead discovery — it qualifies inbound prospects and builds context for your sales team. The Support AI handles existing customer questions, reducing support load while maintaining a consistent experience.",
  },
  {
    question: "How do I get started?",
    answer:
      "You can sign up at alei.ai and have your first AI conversation running the same day — no dev work required. Enterprise teams can request a custom demo.",
  },
  {
    question: "How do I get support?",
    answer:
      "Our team is here to help. Reach us any time at support@alei.ai and we'll get back to you as quickly as possible.",
  },
];

const INITIAL_COUNT = 5;

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const visibleItems = showAll ? faqItems : faqItems.slice(0, INITIAL_COUNT);

  return (
    <section id="faq" className="faq pageSection">
      <h2 className="faqTitle">Frequently Asked Questions</h2>
      <div className="faqList">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className={`faqItem ${openIndex === index ? "faqItemOpen" : ""}`}
          >
            <button className="faqQuestion" onClick={() => toggle(index)}>
              <span>{item.question}</span>
              <span className="faqIcon">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="faqAnswer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="faqShowMore">
        {!showAll && faqItems.length > INITIAL_COUNT && (
          <button className="faqShowMoreBtn" onClick={() => setShowAll(true)}>
            Show all
          </button>
        )}
        {showAll && (
          <button className="faqShowMoreBtn" onClick={() => { setShowAll(false); setOpenIndex(null); }}>
            Show less
          </button>
        )}
      </div>
    </section>
  );
}

export default FAQ;
