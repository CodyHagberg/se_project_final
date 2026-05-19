import { Link } from "react-router-dom";
import "./Terms.css";

const EFFECTIVE_DATE = "May 18, 2026";
const VERSION = "1.0";

export default function PrivacyPolicy() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <Link to="/legal" className="legal__backLink">← Legal Hub</Link>
        <h1 className="legal__title">Privacy Policy</h1>
        <p className="legal__subtitle">How ALEI, LLC collects, uses, and shares information</p>
        <p className="legal__meta">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Version: {VERSION}</p>
        <hr className="legal__divider" />

        <div className="legal__body">
          <p className="legal__p">
            This Privacy Policy explains how ALEI, LLC ("ALEI," "we," "us," or "our") collects, uses, and
            shares information when you use our website, products, and services (collectively, the "Service").
            It also explains the privacy choices available to you.
          </p>

          <h2 className="legal__h2">1. Important: Our Two Roles</h2>
          <p className="legal__p">
            ALEI's Service has two categories of individuals whose information may be processed, and we play
            a different role for each.
          </p>
          <h3 className="legal__h3">1.1 Information about Customers</h3>
          <p className="legal__p">
            Our "Customers" are the businesses that purchase and use the Service. When we collect information
            directly from Customer account holders (for example, name, business email, billing information),
            we act as a "controller" or "business" under applicable U.S. state privacy laws. This Privacy
            Policy describes that processing.
          </p>
          <h3 className="legal__h3">1.2 Information about Leads</h3>
          <p className="legal__p">
            Our Customers use the Service to engage in AI-driven conversations with their own prospective
            customers and inquiries ("Leads"). When we process Lead information on a Customer's behalf, we
            act as a "service provider" or "processor" — the Customer is the controller, and the Customer's
            privacy policy governs the relationship with the Lead. If you are a Lead who interacted with a
            business through an ALEI-powered conversation, please contact that business directly for primary
            privacy questions about your data. You may also contact us at{" "}
            <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a>, and we will
            forward your request to the relevant Customer.
          </p>

          <h2 className="legal__h2">2. Who We Are</h2>
          <p className="legal__p">
            ALEI, LLC is an Arizona limited liability company. Our business address is 11201 North Tatum
            Boulevard, Suite 300-100A, PMB 70425, Phoenix, AZ 85028. You can contact us at{" "}
            <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a>.
          </p>

          <h2 className="legal__h2">3. Information We Collect</h2>
          <h3 className="legal__h3">3.1 Information We Collect from Customers</h3>
          <ul className="legal__ul">
            <li><strong>Account information:</strong> name, business name, business email, phone number, and password.</li>
            <li><strong>Billing information:</strong> name, business address, payment-card details (processed and stored by Stripe — we do not store full card numbers), and billing history.</li>
            <li><strong>Configuration information:</strong> custom prompts, qualification questions, AI-persona settings, and any third-party integration credentials Customer authorizes us to store.</li>
            <li><strong>Usage and technical data:</strong> logins, feature usage, API calls, error logs, IP addresses, and device/browser information.</li>
            <li><strong>Communications:</strong> information submitted through support tickets, surveys, or other communications with us.</li>
          </ul>
          <h3 className="legal__h3">3.2 Information We Process on Behalf of Customers (Lead Data)</h3>
          <p className="legal__p">
            When the Service is operated by a Customer, the Service may collect and process information about
            the Customer's Leads, including:
          </p>
          <ul className="legal__ul">
            <li><strong>Form-field information:</strong> name, email, phone, address, and any other information the Lead provides through the lead-capture form configured by the Customer.</li>
            <li><strong>Conversation content:</strong> text and/or voice transcripts of the AI conversation, including any information the Lead voluntarily shares during the conversation.</li>
            <li><strong>Technical metadata:</strong> IP address, approximate geolocation (city/region level), browser, device, language, referring URL, and timestamps.</li>
            <li><strong>Behavioral data:</strong> interactions with the lead-capture widget, including time spent and engagement events.</li>
          </ul>
          <p className="legal__p">
            We process Lead Data only as directed by the Customer and only as needed to provide the Service.
            We do not use Lead Data for our own marketing or to train AI models.
          </p>
          <h3 className="legal__h3">3.3 Information from Cookies and Similar Technologies</h3>
          <p className="legal__p">
            On our website and within the Service dashboard, we use cookies and similar technologies for:
            (i) authentication and security; (ii) remembering user preferences; and (iii) analytics to
            understand product usage. Customer's own website (where Customer embeds our lead-capture widget)
            may use additional cookies; that use is governed by Customer's own privacy policy and cookie
            notice.
          </p>

          <h2 className="legal__h2">4. How We Use Information</h2>
          <p className="legal__p">We use the information we collect to:</p>
          <ul className="legal__ul">
            <li>Provide, operate, and maintain the Service;</li>
            <li>Process AI conversations via the Google Gemini API and deliver contextual enhancement data to the relevant Customer;</li>
            <li>Authenticate users and secure accounts;</li>
            <li>Bill Customers and manage subscriptions;</li>
            <li>Provide customer support and respond to inquiries;</li>
            <li>Detect, investigate, and prevent fraud, abuse, and security incidents;</li>
            <li>Comply with legal obligations and enforce our agreements;</li>
            <li>Improve the Service (using aggregated and de-identified data only, where derived from Lead Data); and</li>
            <li>Send Customers product updates, service announcements, and (with appropriate opt-out controls) marketing communications.</li>
          </ul>

          <h2 className="legal__h2">5. How AI Processing Works</h2>
          <p className="legal__p">
            Conversation content submitted to the Service is processed by the Google Gemini API to generate
            AI responses and contextual enhancement data. Under Google's applicable API terms, data submitted
            via the Gemini API is not used to train Google's generally available models and is not retained
            beyond what is necessary to provide the inference response. ALEI does not use Customer Data or
            Lead Data to train any AI model, whether our own or a third party's.
          </p>

          <h2 className="legal__h2">6. How We Share Information</h2>
          <h3 className="legal__h3">6.1 With the Relevant Customer</h3>
          <p className="legal__p">
            Lead Data collected through a Customer's lead-capture widget is shared with — and delivered to —
            that Customer. This is the core function of the Service.
          </p>
          <h3 className="legal__h3">6.2 With Sub-Processors</h3>
          <p className="legal__p">
            We share information with the third parties listed in our{" "}
            <a className="legal__link" href="/sub-processors">Sub-Processor List</a>, solely as needed to
            provide the Service. These currently include Google LLC (Gemini API and Google Cloud Platform
            hosting) and Stripe, Inc. (payment processing). Each Sub-Processor is bound by contractual
            data-protection obligations.
          </p>
          <h3 className="legal__h3">6.3 For Legal Reasons</h3>
          <p className="legal__p">
            We may disclose information when we believe in good faith that disclosure is: (i) required by
            law, subpoena, or other legal process; (ii) necessary to protect the rights, property, or safety
            of ALEI, our Customers, our users, or the public; or (iii) necessary to investigate fraud or
            security incidents.
          </p>
          <h3 className="legal__h3">6.4 Business Transfers</h3>
          <p className="legal__p">
            If ALEI is involved in a merger, acquisition, financing, reorganization, or sale of assets,
            information may be transferred as part of that transaction, subject to confidentiality obligations
            and continued application of this Privacy Policy (or a successor policy).
          </p>
          <h3 className="legal__h3">6.5 We Do Not Sell Personal Information</h3>
          <p className="legal__p">
            ALEI does not sell personal information to third parties for monetary consideration, and we do
            not share personal information for cross-context behavioral advertising as defined under U.S.
            state privacy laws.
          </p>

          <h2 className="legal__h2">7. Data Retention</h2>
          <p className="legal__p">
            We retain personal information for as long as necessary to provide the Service, comply with legal
            obligations, resolve disputes, and enforce agreements. Specifically:
          </p>
          <ul className="legal__ul">
            <li><strong>Customer account information:</strong> retained for the duration of the active subscription plus 12 months after termination, then deleted (subject to legal-retention requirements).</li>
            <li><strong>Lead Data:</strong> retained per Customer configuration; in the absence of specific Customer instructions, retained for 24 months from collection, then deleted.</li>
            <li><strong>Billing and transaction records:</strong> retained for 7 years to comply with tax and accounting laws.</li>
            <li><strong>Backups:</strong> retained for up to an additional 30 days following deletion from primary systems, per our standard backup-rotation schedule.</li>
            <li><strong>Logs and security event records:</strong> retained for up to 13 months for security and product-improvement purposes.</li>
          </ul>
          <p className="legal__p">
            When a subscription is terminated, we will delete or return Customer Data and Lead Data within
            30 days, except as required by law or held in backup systems.
          </p>

          <h2 className="legal__h2">8. How We Protect Information</h2>
          <p className="legal__p">
            We maintain reasonable administrative, technical, and physical safeguards designed to protect
            information, including:
          </p>
          <ul className="legal__ul">
            <li>Encryption in transit using TLS 1.2 or higher;</li>
            <li>Encryption at rest using AES-256 or equivalent for storage of personal data;</li>
            <li>Role-based access controls and multi-factor authentication for administrative access;</li>
            <li>Logging and monitoring of system activity;</li>
            <li>Vendor security reviews and contractual data-protection commitments with Sub-Processors;</li>
            <li>Regular review of our security practices.</li>
          </ul>
          <p className="legal__p">
            No method of transmission or storage is 100% secure. We cannot guarantee absolute security but
            work continuously to maintain a strong security posture.
          </p>

          <h2 className="legal__h2">9. Your California Privacy Rights (CCPA / CPRA)</h2>
          <p className="legal__p">
            California residents have specific rights under the California Consumer Privacy Act, as amended
            by the California Privacy Rights Act (collectively, the "CCPA"). This Section provides
            disclosures required by the CCPA and describes your rights and how to exercise them.
          </p>
          <h3 className="legal__h3">9.1 Your Rights</h3>
          <ul className="legal__ul">
            <li><strong>Right to Know:</strong> the right to request the categories and specific pieces of personal information we have collected, the sources, the purposes, and the categories of third parties with whom we share it.</li>
            <li><strong>Right to Delete:</strong> the right to request deletion of personal information we have collected, subject to legal exceptions.</li>
            <li><strong>Right to Correct:</strong> the right to request correction of inaccurate personal information.</li>
            <li><strong>Right to Limit Use of Sensitive PI:</strong> the right to direct us to limit our use and disclosure of "sensitive personal information" to specified business purposes.</li>
            <li><strong>Right to Opt Out of Sale/Sharing:</strong> the right to opt out of any sale or sharing of personal information. ALEI does not sell or share personal information.</li>
            <li><strong>Right to Non-Discrimination:</strong> we will not discriminate against you for exercising your privacy rights.</li>
            <li><strong>Authorized Agents:</strong> you may use an authorized agent to submit requests on your behalf, subject to verification.</li>
          </ul>
          <h3 className="legal__h3">9.2 Categories of Personal Information Collected (Past 12 Months)</h3>
          <ul className="legal__ul">
            <li>Identifiers (name, email, phone, IP address);</li>
            <li>Customer-records information (business contact details, billing information — payment-card numbers stored only by Stripe);</li>
            <li>Commercial information (subscription and transaction history);</li>
            <li>Internet or other electronic-network activity (usage logs, interaction events);</li>
            <li>Geolocation data (approximate, derived from IP);</li>
            <li>Audio information (voice conversation content, where the Customer enables voice mode);</li>
            <li>Professional or employment-related information (business role);</li>
            <li>Inferences drawn from the above (lead qualification scores, contextual summaries).</li>
          </ul>
          <h3 className="legal__h3">9.3 Sources, Purposes, and Disclosures</h3>
          <p className="legal__p">
            Sources include: directly from Customers and Leads, automatically through use of the Service,
            and from Sub-Processors. Purposes are described in Section 4. We disclose personal information
            for business purposes only to the Sub-Processors listed in our Sub-Processor List.
          </p>
          <h3 className="legal__h3">9.4 How to Exercise Your Rights</h3>
          <p className="legal__p">
            Submit a request to{" "}
            <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a> with the subject
            "CCPA Request." We will verify your identity before responding. We will respond within the
            timeframes required by law (generally 45 days, extendable once by an additional 45 days).
          </p>
          <h3 className="legal__h3">9.5 "Shine the Light" (Cal. Civ. Code § 1798.83)</h3>
          <p className="legal__p">
            California residents may request a list of categories of personal information we disclosed to
            third parties for their direct-marketing purposes in the prior calendar year. ALEI does not
            disclose personal information to third parties for their direct marketing.
          </p>

          <h2 className="legal__h2">10. Other U.S. State Privacy Rights</h2>
          <p className="legal__p">
            Residents of Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana, Iowa, Indiana,
            Tennessee, Delaware, New Hampshire, New Jersey, Minnesota, Maryland, Kentucky, Rhode Island, and
            other states with comprehensive privacy laws have similar rights to access, correct, delete, and
            opt out of certain processing of their personal data. To exercise these rights, email{" "}
            <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a>. If we deny a
            request, you may have a right to appeal — we will explain that process in our response.
          </p>

          <h2 className="legal__h2">11. Nevada Residents</h2>
          <p className="legal__p">
            Nevada residents have a right to opt out of the sale of certain personal information. ALEI does
            not sell personal information. If you have questions, contact{" "}
            <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a>.
          </p>

          <h2 className="legal__h2">12. Children's Privacy</h2>
          <p className="legal__p">
            The Service is not directed to, and we do not knowingly collect personal information from,
            individuals under 16 years of age. If we learn that we have collected personal information from
            a child under 16, we will delete that information promptly. If you believe we may have collected
            information from a child, contact{" "}
            <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a>.
          </p>

          <h2 className="legal__h2">13. Location of Processing</h2>
          <p className="legal__p">
            ALEI currently operates and processes personal information in the United States. We do not target
            the Service to individuals located outside the United States. If you access the Service from
            outside the United States, your information will be transferred to and processed in the United
            States. By using the Service, you consent to such transfer and processing.
          </p>

          <h2 className="legal__h2">14. Third-Party Sites and Services</h2>
          <p className="legal__p">
            Our website may contain links to third-party websites, integrations, or services that we do not
            own or operate. We are not responsible for the privacy practices of those third parties, and we
            encourage you to review their privacy policies.
          </p>

          <h2 className="legal__h2">15. Changes to This Privacy Policy</h2>
          <p className="legal__p">
            We may update this Privacy Policy from time to time. When we do, we will update the "Effective
            Date" at the top of this page. For material changes, we will provide notice via email to
            Customers and/or via an in-Service notification at least 30 days before the changes take effect.
          </p>

          <h2 className="legal__h2">16. Contact Us</h2>
          <p className="legal__p">Questions, comments, or requests regarding this Privacy Policy?</p>
          <p className="legal__p">
            ALEI, LLC &mdash; Attn: Privacy<br />
            Email: <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a><br />
            Address: 11201 North Tatum Boulevard, Suite 300-100A, PMB 70425, Phoenix, AZ 85028
          </p>
        </div>
      </div>
    </div>
  );
}
