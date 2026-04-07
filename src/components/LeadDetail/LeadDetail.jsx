import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLeadDetail, updateLeadStatus } from "../../utils/api";
import { normalizeLeadStatus } from "../../utils/leadStatus";
import "./LeadDetail.css";

function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusSaving, setStatusSaving] = useState(false);

  useEffect(() => {
    loadLead();
  }, [id]);

  const loadLead = async () => {
    try {
      const data = await fetchLeadDetail(id);
      setLead(data.lead);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="leadDetail__loading">Loading...</p>;
  if (error) return <p className="leadDetail__error">{error}</p>;
  if (!lead) return <p className="leadDetail__error">Lead not found</p>;

  return (
    <div className="leadDetail">
      <button className="leadDetail__back" onClick={() => navigate("/dashboard/leads")}>
        &larr; Back to Leads
      </button>

      <div className="leadDetail__header">
        <div className="leadDetail__info">
          <h2 className="leadDetail__name">{lead.name}</h2>
          <p className="leadDetail__meta">{lead.email} &middot; {lead.companyName}</p>
          <div className="leadDetail__tags">
            {lead.industry && <span className="leadDetail__tag">{lead.industry}</span>}
            <select
              className={`leadDetail__statusSelect leadDetail__statusSelect--${normalizeLeadStatus(lead.status)}`}
              value={normalizeLeadStatus(lead.status)}
              disabled={statusSaving}
              onChange={async (e) => {
                const newStatus = e.target.value;
                setStatusSaving(true);
                try {
                  await updateLeadStatus(id, newStatus);
                  setLead((prev) => ({ ...prev, status: newStatus }));
                } catch (err) {
                  setError(err.message);
                } finally {
                  setStatusSaving(false);
                }
              }}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
        <span className="leadDetail__date">
          {new Date(lead.createdAt).toLocaleDateString()}
        </span>
      </div>

      {lead.customFields && Object.keys(lead.customFields).length > 0 && (
        <div className="leadDetail__customFields">
          <h3 className="leadDetail__sectionTitle">Additional Info</h3>
          <div className="leadDetail__customFieldsList">
            {Object.entries(lead.customFields).map(([key, value]) => (
              <div key={key} className="leadDetail__customField">
                <span className="leadDetail__customFieldKey">{key}</span>
                <span className="leadDetail__customFieldValue">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="leadDetail__conversation">
        <h3 className="leadDetail__sectionTitle">Conversation History</h3>
        {!lead.messages || lead.messages.length === 0 ? (
          <p className="leadDetail__empty">No conversation recorded.</p>
        ) : (
          <div className="leadDetail__messages">
            {lead.messages.map((msg, i) => (
              <div
                key={i}
                className={`leadDetail__msg leadDetail__msg--${msg.role}`}
              >
                <span className="leadDetail__msgRole">
                  {msg.role === "assistant" ? "AI" : "Lead"}
                </span>
                <p className="leadDetail__msgContent">{msg.content}</p>
                {msg.createdAt && (
                  <span className="leadDetail__msgTime">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeadDetail;
