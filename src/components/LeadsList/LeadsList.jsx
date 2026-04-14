import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLeads, exportLeadsCSV, updateLeadStatus } from "../../utils/api";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import { normalizeLeadStatus } from "../../utils/leadStatus";
import "./LeadsList.css";

function LeadsList() {
  const { actingBusinessId } = useActingBusinessId();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadLeads();
  }, [actingBusinessId]);

  const loadLeads = async () => {
    try {
      const data = await fetchLeads(actingBusinessId || undefined);
      setLeads(data.leads);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportLeadsCSV(actingBusinessId || undefined);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leads_export.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="leadsList__loading">Loading leads...</p>;
  if (error) return <p className="leadsList__error">{error}</p>;

  return (
    <div className="leadsList">
      <div className="leadsList__header">
        <h2 className="leadsList__title">Leads</h2>
        {leads.length > 0 && (
          <button className="leadsList__exportBtn" onClick={handleExport}>
            Export CSV
          </button>
        )}
      </div>
      {leads.length === 0 ? (
        <p className="leadsList__empty">No leads yet. They will appear here once visitors use your chat widget.</p>
      ) : (
        <table className="leadsList__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Industry</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="leadsList__row"
                onClick={() => navigate(`/dashboard/leads/${lead._id}`)}
              >
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.companyName}</td>
                <td>{lead.industry || "--"}</td>
                <td
                  className="leadsList__statusCell"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    className={`leadsList__statusSelect leadsList__statusSelect--${normalizeLeadStatus(lead.status)}`}
                    value={normalizeLeadStatus(lead.status)}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        await updateLeadStatus(lead._id, newStatus);
                        setLeads((prev) =>
                          prev.map((l) => (l._id === lead._id ? { ...l, status: newStatus } : l))
                        );
                      } catch (err) {
                        setError(err.message);
                      }
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                  </select>
                </td>
                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeadsList;
