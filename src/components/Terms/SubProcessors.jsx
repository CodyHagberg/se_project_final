import { Link } from "react-router-dom";
import "./Terms.css";

const EFFECTIVE_DATE = "May 18, 2026";
const VERSION = "1.0";

export default function SubProcessors() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <Link to="/legal" className="legal__backLink">← Legal Hub</Link>
        <h1 className="legal__title">Sub-Processor List</h1>
        <p className="legal__subtitle">Third parties engaged by ALEI, LLC to assist in providing the Service</p>
        <p className="legal__meta">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Version: {VERSION}</p>
        <hr className="legal__divider" />

        <div className="legal__body">
          <p className="legal__p">
            This Sub-Processor List identifies the third parties ("Sub-Processors") that ALEI, LLC engages
            to assist in providing the Service and that may process Customer Data or Lead Data on ALEI's
            behalf. ALEI remains responsible for the performance of each Sub-Processor under the{" "}
            <a className="legal__link" href="/dpa">Data Processing Addendum (DPA)</a>. Capitalized terms
            not defined here have the meanings given in the{" "}
            <a className="legal__link" href="/terms">Terms of Service</a> and the DPA.
          </p>

          <h2 className="legal__h2">1. Notice of Changes</h2>
          <p className="legal__p">
            ALEI will provide at least 30 days' advance notice before adding or replacing a Sub-Processor
            that will process Personal Data on Customer's behalf. Notice is provided by email to Customer's
            primary contact email on file and/or via in-Service notification.
          </p>
          <p className="legal__p">
            Customers may subscribe to email notifications of Sub-Processor changes by emailing{" "}
            <a className="legal__link" href="mailto:subscribe-subprocessors@alei.ai">
              subscribe-subprocessors@alei.ai
            </a>. Objections may be submitted under Section 7 of the DPA.
          </p>

          <h2 className="legal__h2">2. Current Sub-Processors</h2>
          <table className="legal__table">
            <thead>
              <tr>
                <th>Sub-Processor</th>
                <th>Service Provided</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google LLC — Gemini API</td>
                <td>Generative-AI inference for conversational lead enhancement. Conversation text and voice inputs are sent to the Gemini API to generate responses and contextual data.</td>
                <td>United States</td>
              </tr>
              <tr>
                <td>Google LLC — Google Cloud Platform (GCP)</td>
                <td>Application hosting, data storage, and compute infrastructure. All Customer Data and Lead Data are stored and processed on GCP infrastructure.</td>
                <td>United States</td>
              </tr>
              <tr>
                <td>Stripe, Inc.</td>
                <td>Payment processing for Customer subscriptions and Overage Lead charges. Stripe handles all payment-card data; ALEI does not store full card numbers.</td>
                <td>United States</td>
              </tr>
            </tbody>
          </table>

          <h2 className="legal__h2">3. Categories of Personal Data Processed by Each Sub-Processor</h2>
          <table className="legal__table">
            <thead>
              <tr>
                <th>Sub-Processor</th>
                <th>Personal Data Categories</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google LLC — Gemini API</td>
                <td>Conversation content (text/voice), prompts, contextual metadata. Subject to Google's API terms, no data is used to train Google's models and data is not retained beyond what is required to deliver inference responses.</td>
                <td>AI conversation processing</td>
              </tr>
              <tr>
                <td>Google LLC — Google Cloud Platform</td>
                <td>All Customer Data and Lead Data, including account information, configuration, lead-form submissions, conversation transcripts, technical logs, and backups.</td>
                <td>Hosting and storage</td>
              </tr>
              <tr>
                <td>Stripe, Inc.</td>
                <td>Customer billing information: business name, billing contact name and email, billing address, payment-card details (held by Stripe), and transaction history.</td>
                <td>Payment processing</td>
              </tr>
            </tbody>
          </table>

          <h2 className="legal__h2">4. Customer-Authorized Third-Party Integrations</h2>
          <p className="legal__p">
            Customer may authorize the Service to connect to third-party systems operated by Customer or
            Customer's vendors, including customer-relationship management (CRM) systems (e.g., Salesforce,
            HubSpot), email services, and calendar systems. These integrations are configured and controlled
            by Customer; the third parties operating those systems are not Sub-Processors of ALEI but rather
            Customer's own service providers. ALEI's transmission of data to such integrations is performed
            at Customer's direction. Customer's relationship with each integrated third party is governed by
            the agreement between Customer and that third party.
          </p>

          <h2 className="legal__h2">5. Sub-Processor Vetting</h2>
          <p className="legal__p">Before engaging a Sub-Processor that will process Personal Data, ALEI:</p>
          <ul className="legal__ul">
            <li>Conducts a security and privacy review appropriate to the nature and sensitivity of the processing;</li>
            <li>Enters into a written agreement with the Sub-Processor that imposes data-protection obligations no less protective than those in the DPA between ALEI and Customer;</li>
            <li>Documents the Sub-Processor in this Sub-Processor List;</li>
            <li>Monitors the Sub-Processor's ongoing compliance.</li>
          </ul>

          <h2 className="legal__h2">6. Contact</h2>
          <p className="legal__p">
            Questions about Sub-Processors or to submit an objection to a planned change:<br />
            Email: <a className="legal__link" href="mailto:privacy@alei.ai">privacy@alei.ai</a> (with subject "Sub-Processor Question")<br />
            Or: <a className="legal__link" href="mailto:legal@alei.ai">legal@alei.ai</a><br />
            Address: 11201 North Tatum Boulevard, Suite 300-100A, PMB 70425, Phoenix, AZ 85028
          </p>
        </div>
      </div>
    </div>
  );
}
