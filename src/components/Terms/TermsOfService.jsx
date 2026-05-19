import { Link } from "react-router-dom";
import "./Terms.css";

const EFFECTIVE_DATE = "May 18, 2026";
const VERSION = "1.0";

export default function TermsOfService() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <Link to="/legal" className="legal__backLink">← Legal Hub</Link>
        <h1 className="legal__title">Terms of Service</h1>
        <p className="legal__subtitle">Master agreement governing use of the ALEI Service</p>
        <p className="legal__meta">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Version: {VERSION}</p>
        <hr className="legal__divider" />

        <div className="legal__body">
          <p className="legal__p">
            Please read these Terms carefully. By creating an account, clicking "I Agree," or otherwise
            accessing or using the Service, you agree to be legally bound by these Terms, including the
            documents incorporated by reference in Section 19.
          </p>

          <h2 className="legal__h2">1. Agreement and Acceptance</h2>
          <p className="legal__p">
            These Terms of Service ("Terms") form a binding contract between ALEI, LLC, an Arizona limited
            liability company ("ALEI," "we," "us," or "our"), and the individual or entity identified during
            account registration ("Customer," "you," or "your"). The Terms govern Customer's access to and
            use of the ALEI software-as-a-service platform and any related services, websites, APIs, and
            documentation (collectively, the "Service").
          </p>
          <p className="legal__p">
            If you are accepting these Terms on behalf of a company or other legal entity, you represent and
            warrant that (i) you have full legal authority to bind that entity to these Terms, and (ii) you
            have read and understand these Terms. If you do not have such authority, or if you do not agree
            with these Terms, you must not accept these Terms and may not use the Service.
          </p>

          <h2 className="legal__h2">2. Definitions</h2>
          <p className="legal__p">Capitalized terms used in these Terms have the meanings set forth below.</p>
          <ul className="legal__ul">
            <li><strong>"Service"</strong> means the ALEI software-as-a-service platform that converts static lead-capture forms into AI-driven conversations and delivers contextual lead enhancement data to Customer's connected systems, together with all related websites, APIs, dashboards, integrations, and Documentation.</li>
            <li><strong>"AI-Enhanced Lead"</strong> has the meaning set forth in Section 4.3.</li>
            <li><strong>"Subscription Plan" or "Plan"</strong> means the subscription tier selected by Customer, as published on ALEI's website at the time of Customer's purchase.</li>
            <li><strong>"Subscription Term"</strong> means the period for which Customer has paid Subscription Fees, beginning on the activation date and continuing through each automatic renewal until terminated under Section 12.</li>
            <li><strong>"Overage Leads" or "Overages"</strong> means AI-Enhanced Leads processed in a billing cycle in excess of the monthly allotment included with Customer's Plan, as further described in Section 4.4.</li>
            <li><strong>"Overage Rate"</strong> means the per-lead price applicable to Overage Leads for Customer's Plan, as published on ALEI's website at the time of Customer's purchase.</li>
            <li><strong>"Customer Data"</strong> means data and information Customer provides directly to ALEI for the purpose of configuring or operating the Service, including account, billing, configuration, and integration data.</li>
            <li><strong>"Lead Data"</strong> means personal information about individuals ("Leads") that is submitted through or collected via Customer's use of the Service, including form-field data and AI conversation transcripts.</li>
            <li><strong>"Confidential Information"</strong> means information that is identified as confidential or that a reasonable person would understand to be confidential under the circumstances.</li>
            <li><strong>"Documentation"</strong> means the official user-facing guides, help center articles, and API references published by ALEI.</li>
            <li><strong>"AUP"</strong> means the Acceptable Use Policy located at <a className="legal__link" href="/aup">alei.ai/aup</a>, as updated from time to time.</li>
            <li><strong>"DPA"</strong> means the Data Processing Addendum located at <a className="legal__link" href="/dpa">alei.ai/dpa</a>, as updated from time to time.</li>
            <li><strong>"Sub-Processor List"</strong> means the list of third-party sub-processors located at <a className="legal__link" href="/sub-processors">alei.ai/sub-processors</a>, as updated from time to time.</li>
          </ul>

          <h2 className="legal__h2">3. Account Registration and Eligibility</h2>
          <h3 className="legal__h3">3.1 Eligibility</h3>
          <p className="legal__p">
            The Service is intended solely for use by businesses and is not directed at consumers. To create
            an account, Customer must (i) be at least 18 years of age, (ii) have full legal capacity to enter
            into binding contracts, and (iii) not be barred from receiving the Service under applicable law.
          </p>
          <h3 className="legal__h3">3.2 Account Information</h3>
          <p className="legal__p">
            Customer agrees to provide accurate, current, and complete information during registration and to
            keep account information up to date. ALEI may verify account information at any time and may
            suspend or terminate accounts containing inaccurate or fraudulent information.
          </p>
          <h3 className="legal__h3">3.3 Account Security</h3>
          <p className="legal__p">
            Customer is responsible for safeguarding account credentials and for all activity that occurs
            under the account, whether or not authorized by Customer. Customer must promptly notify ALEI at{" "}
            <a className="legal__link" href="mailto:security@alei.ai">security@alei.ai</a> of any
            unauthorized use of the account or any other suspected security incident.
          </p>

          <h2 className="legal__h2">4. Subscription Plans, AI-Enhanced Leads, and Overages</h2>
          <h3 className="legal__h3">4.1 Plans</h3>
          <p className="legal__p">
            Customer subscribes to a Plan during the signup process. Each Plan includes (a) a monthly
            allotment of AI-Enhanced Leads, (b) a defined number of user seats, and (c) the features and
            limits described on the ALEI website at the time of Customer's purchase. The features,
            allotments, and pricing of Plans currently offered are available at{" "}
            <a className="legal__link" href="/pricing">alei.ai/pricing</a>.
          </p>
          <h3 className="legal__h3">4.2 What the Subscription Covers</h3>
          <p className="legal__p">
            The unit of consumption under every Subscription Plan is the AI-Enhanced Lead. Each Plan entitles
            Customer to a stated monthly allotment of AI-Enhanced Leads. All Overage charges under Section
            4.4 are likewise measured and billed solely in AI-Enhanced Leads, applying the same definition
            and counting rules set forth in Section 4.3.
          </p>
          <h3 className="legal__h3">4.3 Definition of AI-Enhanced Lead</h3>
          <p className="legal__p">
            "AI-Enhanced Lead" means each unique completed conversational engagement that is processed through
            the ALEI Service, in which the ALEI artificial-intelligence layer (whether voice, text, or both)
            interacts with an individual lead, generates contextual enhancement data, and makes that data
            available for delivery to Customer's destination system.
          </p>
          <p className="legal__p"><strong>Counting Rules</strong></p>
          <ul className="legal__ul">
            <li>One (1) AI-Enhanced Lead equals one (1) unique completed conversational engagement, regardless of conversation duration, message count, or whether the conversation occurred via voice, text, or a combination of both.</li>
            <li>A conversational engagement is considered "completed" once the ALEI Service has captured and made contextual enhancement data available for delivery to Customer's connected system, even if the lead later disengages.</li>
            <li>Engagements that fail to produce any contextual enhancement data solely due to a documented technical fault of ALEI (and not due to Customer configuration, third-party service failure, or lead behavior) are not counted as AI-Enhanced Leads.</li>
            <li>Test conversations initiated by Customer through clearly designated test or sandbox modes (where available) are not counted as AI-Enhanced Leads.</li>
            <li>Monthly allotments reset at the start of each billing cycle and do not roll over to subsequent billing cycles.</li>
          </ul>
          <h3 className="legal__h3">4.4 Overages</h3>
          <p className="legal__p">
            If Customer's usage in a billing cycle exceeds the AI-Enhanced Lead allotment included with
            Customer's Plan, the additional AI-Enhanced Leads ("Overage Leads") will be automatically billed
            at the Overage Rate applicable to Customer's Plan. Customer authorizes ALEI to charge Customer's
            payment method on file for Overage Leads at the end of each billing cycle in which they occur.
            Where the Service offers an overage cap or hard limit in account settings, Customer may set such a
            cap; absent a configured cap, Overage Leads are uncapped and will be billed as incurred.
          </p>
          <h3 className="legal__h3">4.5 Plan Changes</h3>
          <p className="legal__p">
            Customer may upgrade to a higher Plan at any time; upgrade charges are prorated for the remainder
            of the current billing cycle. Downgrades take effect at the start of the next billing cycle. Plan
            changes do not refund prior charges, including charges for Overage Leads already incurred.
          </p>

          <h2 className="legal__h2">5. Payment Terms</h2>
          <h3 className="legal__h3">5.1 Fees and Billing</h3>
          <p className="legal__p">
            Subscription Fees are charged in advance on a recurring monthly or annual basis depending on Plan
            selection. Overage Lead charges are billed in arrears at the end of each billing cycle. All Fees
            are stated in U.S. dollars and are exclusive of taxes, which are Customer's responsibility unless
            ALEI is legally required to collect them.
          </p>
          <h3 className="legal__h3">5.2 Payment Processing</h3>
          <p className="legal__p">
            All payments are processed by Stripe, Inc. Customer authorizes ALEI and its payment processor to
            charge the payment method on file for all Fees, including Subscription Fees, Overages, and
            applicable taxes.
          </p>
          <h3 className="legal__h3">5.3 Auto-Renewal</h3>
          <p className="legal__p">
            Subscription Plans automatically renew at the end of each Subscription Term at the then-current
            rate for Customer's Plan, unless Customer cancels before the renewal date through the account
            settings. Customer may cancel at any time; cancellation takes effect at the end of the
            then-current billing cycle.
          </p>
          <h3 className="legal__h3">5.4 Failed Payments</h3>
          <p className="legal__p">
            If a payment fails, ALEI may retry the charge and may suspend the Service after providing at
            least 7 days' notice to the email address on file. Suspension does not relieve Customer of
            unpaid Fees, which remain due.
          </p>
          <h3 className="legal__h3">5.5 Refunds</h3>
          <p className="legal__p">
            Except as expressly stated in these Terms or as required by applicable law, all Fees are
            non-refundable. Cancellation does not entitle Customer to a refund for the current billing cycle.
          </p>
          <h3 className="legal__h3">5.6 Price Changes</h3>
          <p className="legal__p">
            ALEI may change Subscription Fees or Overage Rates with at least 30 days' advance notice. Changes
            take effect at the start of Customer's next billing cycle following the notice period. Continued
            use of the Service after the change constitutes acceptance.
          </p>

          <h2 className="legal__h2">6. License to Use the Service</h2>
          <p className="legal__p">
            Subject to Customer's compliance with these Terms, ALEI grants Customer a limited,
            non-exclusive, non-transferable, non-sublicensable right during the Subscription Term to access
            and use the Service solely for Customer's internal business purposes. All rights not expressly
            granted are reserved.
          </p>

          <h2 className="legal__h2">7. Customer Responsibilities and Restrictions</h2>
          <h3 className="legal__h3">7.1 Lawful Use</h3>
          <p className="legal__p">
            Customer is solely responsible for ensuring that Customer's use of the Service complies with all
            applicable laws and regulations, including without limitation the Telephone Consumer Protection
            Act (TCPA), the CAN-SPAM Act, state privacy and consumer-protection laws, voice-recording and
            two-party consent laws, and industry-specific regulations (e.g., HIPAA, GLBA, FCRA, where
            applicable to Customer's industry).
          </p>
          <h3 className="legal__h3">7.2 Consent and Disclosures</h3>
          <p className="legal__p">
            Customer is solely responsible for providing all required notices to Leads and for obtaining all
            consents required by law before processing Lead Data through the Service, including consent for
            voice recording, AI-mediated communication, and any other disclosures required in Customer's
            jurisdiction or industry.
          </p>
          <h3 className="legal__h3">7.3 Acceptable Use</h3>
          <p className="legal__p">
            Customer must comply with the <a className="legal__link" href="/aup">AUP</a>. Customer must not,
            and must not allow any user or third party to: (a) reverse engineer, decompile, or attempt to
            derive the source code of the Service; (b) use the Service to develop a competing product;
            (c) access or use the Service in any manner that exceeds Customer's Plan entitlements (other than
            as billed Overages); (d) bypass usage limits, security measures, or authentication; or
            (e) violate any other restriction set forth in the AUP.
          </p>

          <h2 className="legal__h2">8. Customer Data and Lead Data</h2>
          <h3 className="legal__h3">8.1 Ownership</h3>
          <p className="legal__p">
            As between ALEI and Customer, Customer owns and retains all rights in Customer Data and Lead Data.
          </p>
          <h3 className="legal__h3">8.2 License to ALEI</h3>
          <p className="legal__p">
            Customer grants ALEI a worldwide, non-exclusive, royalty-free license to host, store, transmit,
            process, display, and use Customer Data and Lead Data solely to provide and improve the Service,
            to support Customer, and as otherwise permitted under these Terms and the DPA.
          </p>
          <h3 className="legal__h3">8.3 No AI Model Training</h3>
          <p className="legal__p">
            ALEI does not use Customer Data or Lead Data to train any artificial-intelligence model, whether
            ALEI's own model or any third-party model. The Service uses the Google Gemini API for inference;
            under Google's applicable API terms, data submitted via the Gemini API is not used to train
            Google's generally available models.
          </p>
          <h3 className="legal__h3">8.4 Aggregated and De-Identified Data</h3>
          <p className="legal__p">
            ALEI may generate aggregated and de-identified data derived from use of the Service (e.g., usage
            statistics, performance metrics) and may use such data for any lawful business purpose, including
            service improvement and analytics, provided that such data does not identify Customer or any
            individual Lead.
          </p>
          <h3 className="legal__h3">8.5 Data Processing Addendum</h3>
          <p className="legal__p">
            ALEI's processing of Personal Data (including Lead Data) on Customer's behalf is governed by the{" "}
            <a className="legal__link" href="/dpa">DPA</a>, which is incorporated into these Terms by
            reference. In the event of conflict between these Terms and the DPA with respect to
            personal-data processing, the DPA controls.
          </p>

          <h2 className="legal__h2">9. AI Outputs and Limitations</h2>
          <p className="legal__p">
            The Service uses generative artificial intelligence to conduct conversations and produce contextual
            enhancement data. AI outputs are probabilistic, may contain inaccuracies, and may produce
            different outputs for similar inputs. Customer is responsible for reviewing AI outputs before
            relying on them, particularly before using AI outputs to make decisions affecting individuals
            (such as employment, credit, housing, healthcare, or legal decisions). The Service is not designed
            for, and Customer must not use the Service for, fully automated high-stakes decision-making
            without meaningful human review.
          </p>

          <h2 className="legal__h2">10. Intellectual Property</h2>
          <h3 className="legal__h3">10.1 ALEI IP</h3>
          <p className="legal__p">
            ALEI and its licensors own all right, title, and interest in and to the Service, including all
            software, models, prompts, data structures, designs, branding, trademarks, and Documentation. No
            rights are granted to Customer other than the limited license set forth in Section 6.
          </p>
          <h3 className="legal__h3">10.2 Feedback</h3>
          <p className="legal__p">
            If Customer provides feedback, suggestions, or ideas regarding the Service, Customer grants ALEI
            a perpetual, irrevocable, royalty-free, sublicensable, worldwide license to use such feedback for
            any purpose, without obligation to Customer.
          </p>

          <h2 className="legal__h2">11. Confidentiality</h2>
          <p className="legal__p">
            Each party (the "Receiving Party") will protect the other party's Confidential Information using
            at least the same degree of care it uses to protect its own Confidential Information of like
            importance (and in no event less than reasonable care), will not use Confidential Information
            except to perform under these Terms, and will not disclose Confidential Information except to its
            personnel and advisors who are bound by confidentiality obligations at least as protective as
            these Terms. Confidential Information does not include information that is (a) publicly available
            through no fault of the Receiving Party, (b) independently developed without reference to the
            other party's Confidential Information, or (c) required to be disclosed by law, provided that the
            Receiving Party gives reasonable advance notice where permitted.
          </p>

          <h2 className="legal__h2">12. Term and Termination</h2>
          <h3 className="legal__h3">12.1 Term</h3>
          <p className="legal__p">
            These Terms become effective on Customer's acceptance and continue until terminated as set forth
            in this Section.
          </p>
          <h3 className="legal__h3">12.2 Termination by Customer</h3>
          <p className="legal__p">
            Customer may terminate at any time by canceling the subscription through account settings.
            Cancellation takes effect at the end of the then-current billing cycle. Customer remains
            responsible for all Fees incurred through the effective date of termination, including Overage
            Lead charges.
          </p>
          <h3 className="legal__h3">12.3 Termination by ALEI</h3>
          <p className="legal__p">
            ALEI may suspend or terminate the Service, in whole or in part, for: (a) Customer's material
            breach of these Terms, the AUP, or the DPA; (b) non-payment that remains uncured for 14 days
            after notice; (c) actual or suspected fraudulent, abusive, or illegal activity; or (d) where
            required by law or by a third-party service on which the Service depends. ALEI will provide
            notice where practicable; for serious or imminent risk, ALEI may suspend immediately.
          </p>
          <h3 className="legal__h3">12.4 Effect of Termination</h3>
          <p className="legal__p">
            Upon termination: (a) Customer's right to access the Service ends; (b) ALEI will, upon
            Customer's written request made within 14 days after termination, make Customer Data and Lead
            Data available for export in a commercially reasonable format; and (c) ALEI will delete Customer
            Data and Lead Data within 30 days after termination, except as required to comply with law or as
            retained in backup systems in accordance with ALEI's standard backup-rotation schedule.
          </p>
          <h3 className="legal__h3">12.5 Survival</h3>
          <p className="legal__p">
            Sections 2, 5 (unpaid Fees), 8.1, 8.4, 10, 11, 12.4, 13, 14, 15, 17, and 19 survive any
            termination of these Terms.
          </p>

          <h2 className="legal__h2">13. Disclaimer of Warranties</h2>
          <p className="legal__p">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER
            EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW,
            ALEI DISCLAIMS ALL WARRANTIES, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES
            ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. ALEI DOES NOT WARRANT THAT THE SERVICE WILL
            BE UNINTERRUPTED, ERROR-FREE, SECURE, OR THAT AI OUTPUTS WILL BE ACCURATE OR FIT FOR CUSTOMER'S
            INTENDED USE. ALEI DOES NOT OFFER A SERVICE-LEVEL AGREEMENT FOR THE SELF-SERVE PLANS DESCRIBED
            IN THESE TERMS; ANY SLA, IF OFFERED, MUST BE EXPRESSLY AGREED IN A SIGNED ORDER FORM.
          </p>

          <h2 className="legal__h2">14. Limitation of Liability</h2>
          <p className="legal__p">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW: (A) NEITHER PARTY WILL BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS,
            REVENUES, GOODWILL, OR DATA, ARISING OUT OF OR RELATED TO THESE TERMS, EVEN IF ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES; AND (B) EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR
            RELATED TO THESE TERMS WILL NOT EXCEED THE AMOUNTS PAID OR PAYABLE BY CUSTOMER TO ALEI UNDER
            THESE TERMS IN THE 12 MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE LIABILITY. THE
            FOREGOING LIMITATIONS DO NOT APPLY TO (I) CUSTOMER'S PAYMENT OBLIGATIONS, (II) BREACH OF
            CONFIDENTIALITY, OR (III) CUSTOMER'S INDEMNIFICATION OBLIGATIONS.
          </p>

          <h2 className="legal__h2">15. Indemnification</h2>
          <h3 className="legal__h3">15.1 By Customer</h3>
          <p className="legal__p">
            Customer will defend, indemnify, and hold harmless ALEI and its officers, directors, employees,
            and agents from and against any third-party claim, demand, action, or proceeding arising out of
            or relating to: (a) Customer's use of the Service in violation of these Terms, the AUP, or
            applicable law; (b) Lead Data and Customer's collection of, consent for, or handling of Lead
            Data; (c) Customer's content, configuration, or instructions to the Service; or (d) Customer's
            relationship with any Lead.
          </p>
          <h3 className="legal__h3">15.2 By ALEI</h3>
          <p className="legal__p">
            ALEI will defend Customer against any third-party claim alleging that the Service, when used in
            accordance with these Terms, infringes a U.S. patent, copyright, or trademark, and will indemnify
            Customer against damages and costs finally awarded by a court of competent jurisdiction. ALEI's
            obligation does not apply to claims arising from (i) Customer's modification of the Service,
            (ii) use of the Service in combination with other products not provided by ALEI, (iii) Customer
            Data or Lead Data, or (iv) Customer's use of AI outputs.
          </p>
          <h3 className="legal__h3">15.3 Procedure</h3>
          <p className="legal__p">
            The indemnified party must promptly notify the indemnifying party of the claim, allow the
            indemnifying party to control the defense and settlement (provided that no settlement may impose
            obligations on the indemnified party without consent), and provide reasonable cooperation.
          </p>

          <h2 className="legal__h2">16. Modifications to Service and Terms</h2>
          <p className="legal__p">
            ALEI may modify the Service from time to time, including adding, changing, or removing features.
            ALEI may also modify these Terms by posting an updated version on its website. For material
            changes, ALEI will provide at least 30 days' advance notice via email to the address on file or
            via in-Service notification. Customer's continued use of the Service after the effective date of
            an updated version constitutes acceptance of the changes. If Customer does not agree to a material
            change, Customer's sole remedy is to terminate the subscription before the change takes effect.
          </p>

          <h2 className="legal__h2">17. Governing Law and Dispute Resolution</h2>
          <h3 className="legal__h3">17.1 Governing Law</h3>
          <p className="legal__p">
            These Terms are governed by and construed in accordance with the laws of the State of Arizona,
            without regard to its conflict-of-laws principles. The United Nations Convention on Contracts for
            the International Sale of Goods does not apply.
          </p>
          <h3 className="legal__h3">17.2 Forum</h3>
          <p className="legal__p">
            Except for claims that must be resolved by arbitration under Section 17.3, the parties consent to
            the exclusive jurisdiction of the state and federal courts located in Maricopa County, Arizona,
            and waive any objection to venue in such courts.
          </p>
          <h3 className="legal__h3">17.3 Binding Arbitration</h3>
          <p className="legal__p">
            Any dispute arising out of or relating to these Terms will be resolved by binding arbitration
            administered by JAMS under its Streamlined Arbitration Rules, in Maricopa County, Arizona, by a
            single arbitrator. Judgment on the award may be entered in any court of competent jurisdiction.
            This Section does not prevent either party from seeking injunctive relief in court for misuse of
            IP or Confidential Information.
          </p>
          <h3 className="legal__h3">17.4 Waiver of Class Actions</h3>
          <p className="legal__p">
            TO THE FULLEST EXTENT PERMITTED BY LAW, EACH PARTY WAIVES ANY RIGHT TO PARTICIPATE IN A CLASS,
            COLLECTIVE, OR REPRESENTATIVE ACTION AGAINST THE OTHER PARTY.
          </p>

          <h2 className="legal__h2">18. Export, Sanctions, and Government Use</h2>
          <p className="legal__p">
            Customer must comply with all applicable U.S. export-control and economic-sanctions laws.
            Customer represents that Customer is not located in, and is not a national of, any country subject
            to comprehensive U.S. sanctions, and is not on any U.S. government list of restricted or
            prohibited parties.
          </p>

          <h2 className="legal__h2">19. Documents Incorporated by Reference</h2>
          <p className="legal__p">
            By accepting these Terms, Customer also agrees to be bound by each of the following documents,
            which are incorporated into these Terms by reference:
          </p>
          <ul className="legal__ul">
            <li><strong>Acceptable Use Policy (AUP)</strong> — <a className="legal__link" href="/aup">alei.ai/aup</a>, which sets forth rules of conduct applicable to use of the Service.</li>
            <li><strong>Data Processing Addendum (DPA)</strong> — <a className="legal__link" href="/dpa">alei.ai/dpa</a>, which governs ALEI's processing of Personal Data on Customer's behalf.</li>
            <li><strong>Sub-Processor List</strong> — <a className="legal__link" href="/sub-processors">alei.ai/sub-processors</a>, which identifies the third-party sub-processors engaged by ALEI.</li>
            <li><strong>Privacy Policy</strong> — <a className="legal__link" href="/privacy">alei.ai/privacy</a>, which describes ALEI's processing of personal data as a controller.</li>
          </ul>

          <h2 className="legal__h2">20. Miscellaneous</h2>
          <h3 className="legal__h3">20.1 Entire Agreement</h3>
          <p className="legal__p">
            These Terms (including the documents incorporated by reference and any Order Forms agreed by the
            parties) constitute the entire agreement between the parties with respect to the subject matter
            and supersede all prior or contemporaneous communications.
          </p>
          <h3 className="legal__h3">20.2 Severability</h3>
          <p className="legal__p">
            If any provision of these Terms is held invalid or unenforceable, the remaining provisions remain
            in full force, and the invalid provision will be modified to the minimum extent necessary to make
            it enforceable.
          </p>
          <h3 className="legal__h3">20.3 No Waiver</h3>
          <p className="legal__p">
            No failure or delay by a party in exercising any right under these Terms operates as a waiver,
            and no single or partial exercise precludes any other or further exercise.
          </p>
          <h3 className="legal__h3">20.4 Assignment</h3>
          <p className="legal__p">
            Customer may not assign or transfer these Terms or any rights or obligations under these Terms
            without ALEI's prior written consent. ALEI may assign these Terms in connection with a merger,
            acquisition, reorganization, or sale of substantially all of its assets. Any attempted assignment
            in violation of this Section is void.
          </p>
          <h3 className="legal__h3">20.5 Force Majeure</h3>
          <p className="legal__p">
            Neither party is liable for failure or delay caused by events beyond its reasonable control,
            including acts of God, war, terrorism, riots, embargoes, natural disasters, pandemics, internet
            or telecommunications failures, or failures of third-party service providers.
          </p>
          <h3 className="legal__h3">20.6 Notices</h3>
          <p className="legal__p">
            Notices to ALEI must be sent to{" "}
            <a className="legal__link" href="mailto:legal@alei.ai">legal@alei.ai</a> (with a copy to the
            registered business address). Notices to Customer may be sent to the email address on file or
            posted in the Service.
          </p>
          <h3 className="legal__h3">20.7 Independent Contractors</h3>
          <p className="legal__p">
            The parties are independent contractors. These Terms do not create any agency, partnership, joint
            venture, or employment relationship.
          </p>
          <h3 className="legal__h3">20.8 No Third-Party Beneficiaries</h3>
          <p className="legal__p">
            These Terms do not create any third-party beneficiary rights in any person or entity not a party
            hereto.
          </p>
          <h3 className="legal__h3">20.9 Electronic Acceptance</h3>
          <p className="legal__p">
            Customer's electronic acceptance (whether by clicking "I Agree," creating an account, or using
            the Service) constitutes a valid, legally binding agreement to these Terms in accordance with the
            U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN) and equivalent state laws.
          </p>

          <h2 className="legal__h2">21. Contact</h2>
          <p className="legal__p">Questions about these Terms? Contact us at:</p>
          <p className="legal__p">
            ALEI, LLC &mdash; Attn: Legal<br />
            Email: <a className="legal__link" href="mailto:legal@alei.ai">legal@alei.ai</a><br />
            Address: 11201 North Tatum Boulevard, Suite 300-100A, PMB 70425, Phoenix, AZ 85028
          </p>
        </div>
      </div>
    </div>
  );
}
