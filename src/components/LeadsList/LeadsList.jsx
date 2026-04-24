import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLeads, exportLeadsCSV, updateLeadStatus } from "../../utils/api";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import { normalizeLeadStatus } from "../../utils/leadStatus";
import "./LeadsList.css";

const PAGE_SIZE = 25;

function LeadsList() {
  const { actingBusinessId } = useActingBusinessId();
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [actingBusinessId]);

  useEffect(() => {
    loadLeads();
  }, [page, actingBusinessId]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await fetchLeads(actingBusinessId || undefined, {
        page,
        limit: PAGE_SIZE,
      });
      setLeads(data.leads);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const visibleLeads = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.toLowerCase();
    return leads.filter(
      (l) =>
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.companyName?.toLowerCase().includes(q)
    );
  }, [leads, search]);

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

  if (error) return <p className="leadsList__error">{error}</p>;

  return (
    <div className="leadsList">
      <div className="leadsList__header">
        <h2 className="leadsList__title">Leads</h2>
        <div className="leadsList__actions">
          <input
            type="text"
            className="leadsList__search"
            placeholder="Search by name, email, or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {total > 0 && (
            <button className="leadsList__exportBtn" onClick={handleExport}>
              Export CSV
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="leadsList__loading">Loading leads...</p>
      ) : total === 0 ? (
        <p className="leadsList__empty">
          No leads yet. They will appear here once visitors use your chat widget.
        </p>
      ) : (
        <>
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
              {visibleLeads.map((lead) => (
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
                            prev.map((l) =>
                              l._id === lead._id ? { ...l, status: newStatus } : l
                            )
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

          {totalPages > 1 && (
            <div className="leadsList__pagination">
              <button
                className="leadsList__pageBtn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                &larr; Prev
              </button>
              <span className="leadsList__pageInfo">
                Page {page} of {totalPages}
              </span>
              <button
                className="leadsList__pageBtn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LeadsList;
