import { useState, useEffect } from "react";
import { fetchLeads } from "../../utils/api";
import "./DashboardOverview.css";

function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await fetchLeads();
      const leads = data.leads || [];
      setStats({
        total: leads.length,
        newLeads: leads.filter((l) => l.status === "new").length,
        qualified: leads.filter((l) => l.status === "qualified").length,
        closed: leads.filter((l) => l.status === "closed").length,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="overview__loading">Loading overview...</p>;
  if (error) return <p className="overview__error">{error}</p>;

  const cards = [
    { label: "Total Leads", value: stats.total, className: "overview__card--total" },
    { label: "New", value: stats.newLeads, className: "overview__card--new" },
    { label: "Qualified", value: stats.qualified, className: "overview__card--qualified" },
    { label: "Closed", value: stats.closed, className: "overview__card--closed" },
  ];

  return (
    <div className="overview">
      <h2 className="overview__title">Overview</h2>
      <div className="overview__grid">
        {cards.map((card) => (
          <div key={card.label} className={`overview__card ${card.className}`}>
            <span className="overview__cardValue">{card.value}</span>
            <span className="overview__cardLabel">{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardOverview;
