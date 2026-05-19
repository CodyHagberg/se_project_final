import { Link } from "react-router-dom";
import "./Terms.css";

const EFFECTIVE_DATE = "May 18, 2026";
const VERSION = "1.0";

export default function AUP() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <Link to="/legal" className="legal__backLink">← Legal Hub</Link>
        <h1 className="legal__title">Acceptable Use Policy</h1>
        <p className="legal__subtitle">Rules of conduct for use of the ALEI Service</p>
        <p className="legal__meta">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Version: {VERSION}</p>
        <hr className="legal__divider" />

        <div className="legal__body">
          <p className="legal__p">
            This Acceptable Use Policy ("AUP") governs Customer's use of the ALEI Service. The AUP is
            incorporated into the ALEI{" "}
            <a className="legal__link" href="/terms">Terms of Service</a> and applies to every user that
            Customer authorizes. Capitalized terms not defined here have the meanings given in the Terms.
          </p>

          <h2 className="legal__h2">1. General Principles</h2>
          <p className="legal__p">
            Customer must use the Service lawfully, ethically, and in good faith. ALEI may suspend or
            terminate access to the Service, with or without notice, for any violation of this AUP. ALEI's
            enforcement decisions are at its sole discretion, taking into account the severity, frequency,
            and intent of the violation.
          </p>

          <h2 className="legal__h2">2. Prohibited Activities</h2>
          <p className="legal__p">
            Customer will not, and will not permit any user or third party to:
          </p>

          <h3 className="legal__h3">2.1 Unlawful or Harmful Use</h3>
          <ul className="legal__ul">
            <li>Violate any applicable law, regulation, or third-party right, including the Telephone Consumer Protection Act (TCPA), the CAN-SPAM Act, state telemarketing and consumer-protection laws, and applicable voice-recording or two-party-consent laws;</li>
            <li>Use the Service for any criminal activity, including fraud, identity theft, money laundering, or financing of terrorism;</li>
            <li>Use the Service to process Personal Data of any individual without the consent or legal basis required by applicable privacy law;</li>
            <li>Use the Service to engage in deceptive or unfair practices, including false advertising, bait-and-switch tactics, or misleading claims about identity, affiliation, or credentials.</li>
          </ul>

          <h3 className="legal__h3">2.2 Abusive, Deceptive, or Harmful Content</h3>
          <ul className="legal__ul">
            <li>Impersonate any person, business, or governmental entity in a manner that is misleading or unauthorized;</li>
            <li>Send unsolicited commercial communications (spam), conduct phishing or social-engineering campaigns, or distribute malware or other malicious code;</li>
            <li>Harass, threaten, defame, stalk, or otherwise harm any individual, including Leads;</li>
            <li>Promote violence, terrorism, hate, discrimination, or harm against any individual or group based on race, ethnicity, religion, gender, sexual orientation, disability, age, or any other protected characteristic;</li>
            <li>Generate, distribute, or store child sexual abuse material or any other content that sexually exploits or endangers minors;</li>
            <li>Produce non-consensual intimate imagery or other sexually explicit content involving real individuals.</li>
          </ul>

          <h3 className="legal__h3">2.3 Regulated or High-Risk Use Cases</h3>
          <p className="legal__p">Customer must not use the Service to:</p>
          <ul className="legal__ul">
            <li>Provide medical advice, diagnoses, or treatment recommendations, or to substitute for licensed medical care;</li>
            <li>Provide legal advice or to substitute for the services of a licensed attorney;</li>
            <li>Provide individualized financial, investment, or insurance advice without proper licensing and disclosures;</li>
            <li>Operate gambling, sweepstakes, or contests of chance without appropriate licensing in the relevant jurisdictions;</li>
            <li>Sell or market adult content, firearms, controlled substances, or other heavily regulated products without compliance with applicable laws.</li>
          </ul>
          <p className="legal__p">
            Customer is solely responsible for compliance with industry-specific regulations applicable to
            Customer's business (including HIPAA, GLBA, FCRA, FTC Act, and analogous laws). The Service is
            not certified or designed for any specific regulated industry except as expressly stated by ALEI
            in writing.
          </p>

          <h3 className="legal__h3">2.4 AI-Specific Restrictions</h3>
          <ul className="legal__ul">
            <li>Attempt to circumvent, manipulate, or "jailbreak" the safety measures or guardrails of the AI components of the Service;</li>
            <li>Use the Service to generate disinformation, deepfakes, synthetic media intended to deceive, or content that misrepresents itself as human-authored where disclosure of AI authorship is required by law;</li>
            <li>Use the Service to make fully automated high-stakes decisions about individuals (such as decisions about employment, housing, credit, healthcare, insurance, education, or legal status) without meaningful human review;</li>
            <li>Use AI outputs from the Service to develop, train, or improve a competing AI model or competing generative-AI service;</li>
            <li>Use the Service in ways that knowingly produce or rely on unsafe medical, legal, financial, or safety-critical recommendations without appropriate human review and disclaimers.</li>
          </ul>

          <h3 className="legal__h3">2.5 Technical Restrictions</h3>
          <ul className="legal__ul">
            <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code, models, or underlying ideas of the Service, except to the extent expressly permitted by law;</li>
            <li>Bypass, disable, or otherwise interfere with security or authentication mechanisms;</li>
            <li>Bypass usage limits, allotments, or rate limits other than by paying applicable Overage charges;</li>
            <li>Probe, scan, or test the Service for vulnerabilities, except through ALEI's published responsible-disclosure process at <a className="legal__link" href="mailto:security@alei.ai">security@alei.ai</a>;</li>
            <li>Use scrapers, bots, or other automated means to extract data from the Service beyond the authorized APIs and integrations;</li>
            <li>Use the Service to launch denial-of-service attacks, distribute malware, or otherwise harm third-party systems;</li>
            <li>Resell, sublicense, rent, lease, or time-share the Service, or otherwise make the Service available to third parties as a standalone product, except via Customer's authorized use case (e.g., embedding the lead-capture widget on Customer's own website);</li>
            <li>Use the Service to develop a directly competitive product or service.</li>
          </ul>

          <h3 className="legal__h3">2.6 Lead Data Restrictions</h3>
          <ul className="legal__ul">
            <li>Use Lead Data for any purpose other than Customer's bona fide business relationship with the relevant Leads;</li>
            <li>Sell, rent, or transfer Lead Data to third parties not pre-authorized by the relevant Leads under applicable law;</li>
            <li>Fail to honor opt-out, deletion, or other rights requests made by Leads in accordance with applicable law;</li>
            <li>Re-identify de-identified or aggregated data without authorization.</li>
          </ul>

          <h2 className="legal__h2">3. Consent and Disclosure Obligations</h2>
          <p className="legal__p">
            Customer is solely responsible for providing legally required notices to and obtaining required
            consents from Leads before processing their information through the Service. At a minimum,
            Customer must:
          </p>
          <ul className="legal__ul">
            <li>Maintain a publicly available privacy notice on Customer's website that describes how Customer collects, uses, and shares Lead information, including disclosure of the use of AI-mediated communication;</li>
            <li>Where required by applicable law, disclose the use of voice recording and AI conversation, and obtain consent before recording;</li>
            <li>Honor opt-out signals, including Global Privacy Control where applicable, and honor Lead requests to delete, correct, or access information in compliance with applicable law;</li>
            <li>Comply with TCPA, CAN-SPAM, and analogous laws when initiating communications with Leads outside the AI-driven inbound conversation flow.</li>
          </ul>

          <h2 className="legal__h2">4. Consequences of Violation</h2>
          <p className="legal__p">
            If ALEI believes, in its reasonable discretion, that Customer has violated this AUP, ALEI may
            take one or more of the following actions:
          </p>
          <ul className="legal__ul">
            <li>Issue a warning;</li>
            <li>Throttle, restrict, or suspend Customer's access to the Service, in whole or in part, with or without notice depending on the severity of the violation;</li>
            <li>Disable specific features, integrations, or content;</li>
            <li>Remove or quarantine specific content or data;</li>
            <li>Terminate the Service for material or repeated violations, in accordance with the Terms;</li>
            <li>Report unlawful activity to law enforcement and cooperate with investigations.</li>
          </ul>
          <p className="legal__p">
            Suspension or termination for AUP violations does not entitle Customer to a refund of pre-paid
            Fees. Customer remains responsible for all Fees, including Overage Lead charges, incurred through
            the date of suspension or termination.
          </p>

          <h2 className="legal__h2">5. Reporting Abuse</h2>
          <p className="legal__p">
            If you believe the Service is being used in violation of this AUP, please report it to{" "}
            <a className="legal__link" href="mailto:abuse@alei.ai">abuse@alei.ai</a>. Reports should
            include, where possible, the URL or deployment of the suspected violator, the nature of the
            violation, and any supporting evidence. ALEI will review reports and respond as appropriate.
          </p>

          <h2 className="legal__h2">6. Changes to This AUP</h2>
          <p className="legal__p">
            ALEI may update this AUP from time to time. Material changes will be communicated by email to
            the address on file or via in-Service notification at least 30 days in advance. Continued use of
            the Service after the effective date of an updated AUP constitutes acceptance.
          </p>

          <h2 className="legal__h2">7. Contact</h2>
          <p className="legal__p">
            ALEI, LLC<br />
            Abuse reports: <a className="legal__link" href="mailto:abuse@alei.ai">abuse@alei.ai</a><br />
            Security disclosures: <a className="legal__link" href="mailto:security@alei.ai">security@alei.ai</a><br />
            General inquiries: <a className="legal__link" href="mailto:legal@alei.ai">legal@alei.ai</a>
          </p>
        </div>
      </div>
    </div>
  );
}
