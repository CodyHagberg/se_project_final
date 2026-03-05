import { useState } from "react";
import "./FAQ.css";

const faqItems = [
  {
    question: "How is LEAI different from a standard chatbot?",
    answer:
      "Most chatbots are \"branching scripts\" that frustrate users with rigid menus. LEAI is an AI-powered Sales Assistant that understands industry-specific jargon and business context. Instead of just answering questions, LEAI proactively qualifies your leads by identifying their budget, timeline, and needs—delivering a \"ready-to-close\" profile to your team."
  },
  {
    question: "Can LEAI integrate with my existing CRM?",
    answer:
      "Absolutely. While our Starter and Small Business plans provide lead data via email and a dedicated dashboard, our Enterprise tier offers full integration with major CRMs like HubSpot, Salesforce, and Zoho. This ensures your qualified leads flow directly into your existing sales pipeline without any manual data entry."
  },
  {
    question: "I have a niche business. Will LEAI understand my industry?",
    answer:
      "Yes. LEAI is built with industry-specific intelligence modules. Whether you are in Real Estate, SaaS, Insurance, or Medical, LEAI is pre-trained to understand your sector's unique pain points and jargon. It replaces generic \"Hello\" messages with personalized introductions that prove to your visitors that you understand their business from the very first second."
  },
  {
    question: "How much time can my team actually save?",
    answer:
      "On average, sales teams spend up to 50% of their week on initial discovery calls with unqualified prospects. LEAI automates this entire phase. For a team of five, this can save over 40 hours of manual labor per week, allowing your high-performing agents to stop \"hunting\" and start \"closing.\""
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="faq pageSection">
      <div className="faqTitleBubble">
        <h2 className="faqTitle">Frequently Asked Questions</h2>
      </div>
      <div className="faqList">
        {faqItems.map((item, index) => (
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
    </section>
  );
}

export default FAQ;
