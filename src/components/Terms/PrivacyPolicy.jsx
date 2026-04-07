import "./Terms.css";

export default function PrivacyPolicy() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <h2 className="legal__title">Privacy Policy</h2>
        <p className="legal__meta">
          Effective Date: 04/03/2026 · Last Updated: 04/03/2026
        </p>

        <div className="legal__content">
          <pre className="legal__text">{`ALEI LLC · Phoenix, Arizona · hello@alei.ai · alei.ai

1. Introduction
ALEI LLC ("ALEI," "we," "us," or "our") is committed to protecting the privacy of our customers and their end users. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use the ALEI platform, website, and services (the "Service").
This Policy applies to: (1) business customers ("Customers") who create ALEI accounts and deploy our widgets; and (2) end users ("End Users") who interact with ALEI-powered widgets on Customer websites.

2. Information We Collect
2.1 Information Customers Provide
• Account registration information: name, email address, company name, password;
• Billing and payment information (processed by Stripe — ALEI does not store full card details);
• AI configuration data: company information, system instructions, assistant name, industry settings;
• Communications with ALEI support.

2.2 Information Collected Through Deployed Widgets
When End Users interact with ALEI widgets deployed on Customer websites, we collect:
• Name, email address, and company name submitted via the lead form;
• Conversation content: all messages exchanged between the End User and the AI assistant;
• Voice conversation transcripts (where voice chat is enabled);
• Timestamp and session metadata.
This data is collected on behalf of and for the benefit of the Customer. Customers are responsible for obtaining appropriate consent from End Users on their websites.

2.3 Automatically Collected Information
• Log data: IP address, browser type, referring URLs, pages visited, time and date of access;
• Device information: device type, operating system;
• Cookies and similar tracking technologies (see Section 7).

3. How We Use Information
We use the information we collect to provide and improve the Service, manage accounts and billing, power AI conversations, provide support, communicate service updates, comply with law, and protect security.

4. How We Share Information
We share information with service providers (e.g., Stripe, Google), for legal requirements, and in business transfers. ALEI does not sell personal data.

5. Data Retention
We retain Customer Data as long as accounts are active and for a period thereafter as described in the policy document.

6. Your Rights and Choices
You may access/update/delete account info through your dashboard. Additional rights may apply under CCPA/GDPR as described.

7. Cookies and Tracking
We use essential, analytics, and preference cookies to operate and improve the Service.

8. Security
We implement reasonable safeguards; no system is 100% secure.

9. Children's Privacy
The Service is not directed to individuals under 13; we do not knowingly collect personal information from children under 13.

10. Third-Party Websites
This policy does not apply to third-party sites or services linked/integrated with the Service.

11. Changes to This Policy
We may update this Privacy Policy from time to time with notice of material changes.

12. Contact Us
ALEI LLC
11201 North Tatum Boulevard Suite 300-100A PMB 70425, Phoenix, Arizona 85028
Email: hello@alei.ai
Website: alei.ai`}</pre>
        </div>
      </div>
    </div>
  );
}

