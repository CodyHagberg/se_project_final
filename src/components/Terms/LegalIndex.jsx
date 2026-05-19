import { Link } from "react-router-dom";
import "./Terms.css";

const DOCS = [
  {
    to: "/terms",
    title: "Terms of Service",
    description: "Master agreement governing access to and use of the ALEI Service. Version 1.0 — effective May 18, 2026.",
  },
  {
    to: "/privacy",
    title: "Privacy Policy",
    description: "How ALEI collects, uses, and shares information about Customers and Leads. Version 1.0 — effective May 18, 2026.",
  },
  {
    to: "/dpa",
    title: "Data Processing Addendum (DPA)",
    description: "Governs ALEI's processing of Personal Data on Customer's behalf. Incorporated into the Terms of Service.",
  },
  {
    to: "/aup",
    title: "Acceptable Use Policy (AUP)",
    description: "Rules of conduct for use of the ALEI Service. Incorporated into the Terms of Service. Version 1.0 — effective May 18, 2026.",
  },
  {
    to: "/sub-processors",
    title: "Sub-Processor List",
    description: "Third parties engaged by ALEI to assist in providing the Service. Version 1.0 — effective May 18, 2026.",
  },
];

export default function LegalIndex() {
  return (
    <div className="legal page">
      <div className="legal__card">
        <h1 className="legal__title">Legal</h1>
        <p className="legal__meta">
          ALEI, LLC &nbsp;·&nbsp; 11201 North Tatum Blvd, Suite 300-100A, PMB 70425, Phoenix, AZ 85028
          &nbsp;·&nbsp; <a className="legal__link" href="mailto:legal@alei.ai">legal@alei.ai</a>
        </p>
        <hr className="legal__divider" />
        <div className="legal__indexGrid">
          {DOCS.map(({ to, title, description }) => (
            <Link key={to} to={to} className="legal__indexCard">
              <h3>{title}</h3>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
