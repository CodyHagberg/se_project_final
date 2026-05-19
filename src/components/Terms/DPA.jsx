import { Link } from "react-router-dom";
import "./Terms.css";

export default function DPA() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <Link to="/legal" className="legal__backLink">← Legal Hub</Link>
        <h1 className="legal__title">Data Processing Addendum</h1>
        <p className="legal__subtitle">Governs ALEI's processing of Personal Data on Customer's behalf</p>
        <p className="legal__meta">Version: 1.0 &nbsp;·&nbsp; Coming soon</p>
        <hr className="legal__divider" />

        <div className="legal__body">
          <p className="legal__p">
            The full text of the ALEI Data Processing Addendum will be published here shortly. The DPA is
            incorporated into the{" "}
            <a className="legal__link" href="/terms">Terms of Service</a> by reference and governs ALEI's
            processing of Personal Data (including Lead Data) on Customer's behalf.
          </p>
          <p className="legal__p">
            For questions about the DPA, countersignature requests, or to receive a copy in advance of
            publication, please contact us at{" "}
            <a className="legal__link" href="mailto:legal@alei.ai">legal@alei.ai</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
