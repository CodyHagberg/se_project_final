import "./Terms.css";

export default function Terms() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <h2 className="legal__title">Terms of Service &amp; Privacy Policy</h2>
        <p className="legal__meta">
          Effective Date: 04/03/2026 · Last Updated: 04/03/2026
        </p>

        <div className="legal__content">
          <p className="legal__meta">
            This page is a combined view. For separated pages, see{" "}
            <a className="legal__link" href="/terms-of-service">Terms of Service</a>{" "}
            and{" "}
            <a className="legal__link" href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

