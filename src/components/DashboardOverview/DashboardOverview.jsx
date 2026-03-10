import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { fetchLeads } from "../../utils/api";
import "./DashboardOverview.css";

function buildActivityData(leads) {
  if (!leads.length) return [];

  const counts = {};
  leads.forEach((lead) => {
    const date = new Date(lead.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    counts[date] = (counts[date] || 0) + 1;
  });

  const sorted = leads
    .map((l) => new Date(l.createdAt))
    .sort((a, b) => a - b);

  const start = new Date(sorted[0]);
  const end = new Date(sorted[sorted.length - 1]);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const data = [];
  const current = new Date(start);
  while (current <= end) {
    const label = current.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    data.push({ date: label, leads: counts[label] || 0 });
    current.setDate(current.getDate() + 1);
  }

  return data;
}

function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
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
      setChartData(buildActivityData(leads));
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

      <div className="overview__chartSection">
        <h3 className="overview__chartTitle">Lead Activity</h3>
        {chartData.length === 0 ? (
          <p className="overview__chartEmpty">No activity data yet.</p>
        ) : (
          <div className="overview__chart">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5fbdca" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5fbdca" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8ecef" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#888" }}
                  tickLine={false}
                  axisLine={{ stroke: "#e0e4e8" }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e0e4e8",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                  labelStyle={{ fontWeight: 600, color: "#1a1a2e" }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  name="New Leads"
                  stroke="#5fbdca"
                  strokeWidth={2}
                  fill="url(#leadGradient)"
                  dot={{ r: 4, fill: "#5fbdca", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#5fbdca" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardOverview;
