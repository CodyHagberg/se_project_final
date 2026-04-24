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
import { fetchLeads, fetchUsage, enableOverages, disableOverages } from "../../utils/api";
import { useAuth } from "../../contexts/useAuth";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import "./DashboardOverview.css";

const PLAN_DISPLAY = {
  individual: "Individual",
  small_business: "Small Business",
  enterprise: "Enterprise",
};

const DATE_RANGES = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
  { label: "All", days: null },
];

function buildActivityData(leads, rangeDays) {
  if (!leads.length) return [];

  let filtered = leads;
  if (rangeDays) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);
    cutoff.setHours(0, 0, 0, 0);
    filtered = leads.filter((l) => new Date(l.createdAt) >= cutoff);
  }

  if (!filtered.length) return [];

  const counts = {};
  filtered.forEach((lead) => {
    const date = new Date(lead.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    counts[date] = (counts[date] || 0) + 1;
  });

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const start = rangeDays
    ? new Date(now.getTime() - (rangeDays - 1) * 86400000)
    : new Date(
        filtered
          .map((l) => new Date(l.createdAt))
          .sort((a, b) => a - b)[0]
      );
  start.setHours(0, 0, 0, 0);

  const data = [];
  const current = new Date(start);
  while (current <= now) {
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
  const { user, updateUser } = useAuth();
  const { actingBusinessId } = useActingBusinessId();
  const [stats, setStats] = useState(null);
  const [allLeads, setAllLeads] = useState([]);
  const [usage, setUsage] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enablingOverages, setEnablingOverages] = useState(false);
  const [disablingOverages, setDisablingOverages] = useState(false);

  useEffect(() => {
    loadStats();
  }, [actingBusinessId]);

  useEffect(() => {
    if (allLeads.length) {
      setChartData(buildActivityData(allLeads, range));
    }
  }, [range, allLeads]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [data, usageRes] = await Promise.all([
        fetchLeads(actingBusinessId || undefined, { page: 1, limit: 100 }),
        fetchUsage(actingBusinessId || undefined),
      ]);
      const leads = data.leads || [];
      const totalCount = data.total ?? leads.length;
      setAllLeads(leads);
      setUsage(usageRes.usage);
      setStats({
        total: totalCount,
        newLeads: leads.filter((l) => !l.status || l.status === "new").length,
        contacted: leads.filter((l) => l.status === "contacted" || l.status === "qualified").length,
        won: leads.filter((l) => l.status === "won").length,
        lost: leads.filter((l) => l.status === "lost" || l.status === "closed").length,
      });
      setChartData(buildActivityData(leads, 30));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableOverages = async () => {
    setEnablingOverages(true);
    try {
      await enableOverages(actingBusinessId || undefined);
      setUsage((prev) =>
        prev
          ? {
              ...prev,
              overageEnabled: true,
              tenant: prev.tenant ? { ...prev.tenant, overageEnabled: true } : prev.tenant,
            }
          : prev
      );
      if (!actingBusinessId) updateUser({ overageEnabled: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setEnablingOverages(false);
    }
  };

  const handleDisableOverages = async () => {
    setDisablingOverages(true);
    try {
      await disableOverages(actingBusinessId || undefined);
      setUsage((prev) =>
        prev
          ? {
              ...prev,
              overageEnabled: false,
              tenant: prev.tenant ? { ...prev.tenant, overageEnabled: false } : prev.tenant,
            }
          : prev
      );
      if (!actingBusinessId) updateUser({ overageEnabled: false });
    } catch (err) {
      setError(err.message);
    } finally {
      setDisablingOverages(false);
    }
  };

  if (loading) return <p className="overview__loading">Loading overview...</p>;
  if (error) return <p className="overview__error">{error}</p>;

  const cards = [
    { label: "Total Leads", value: stats.total, className: "overview__card--total" },
    { label: "New", value: stats.newLeads, className: "overview__card--new" },
    { label: "Contacted", value: stats.contacted, className: "overview__card--contacted" },
    { label: "Won", value: stats.won, className: "overview__card--won" },
    { label: "Lost", value: stats.lost, className: "overview__card--lost" },
  ];

  const tenantFromUsage = usage?.tenant;
  const plan =
    actingBusinessId && tenantFromUsage?.plan ? tenantFromUsage.plan : user?.plan || "individual";
  const rawLimit =
    actingBusinessId && tenantFromUsage
      ? tenantFromUsage.monthlyLeadLimit ?? 25
      : user?.monthlyLeadLimit ?? 25;
  const isUnlimited = rawLimit === -1;
  const limit = isUnlimited ? Infinity : rawLimit;
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyCount = allLeads.filter((l) => new Date(l.createdAt) >= monthStart).length;
  const pct = isUnlimited ? 0 : Math.min((monthlyCount / limit) * 100, 100);
  const barColor = pct >= 100 ? "#e74c3c" : pct >= 80 ? "#f39c12" : "#5fbdca";
  const isOverLimit = !isUnlimited && monthlyCount >= limit;
  const overageEnabled = actingBusinessId && tenantFromUsage
    ? !!tenantFromUsage.overageEnabled
    : usage?.overageEnabled ?? user?.overageEnabled ?? false;
  const overagePriceCents = actingBusinessId && tenantFromUsage
    ? tenantFromUsage.overagePriceCents ?? 200
    : usage?.overagePriceCents ?? user?.overagePriceCents ?? 200;

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

      <div className="overview__usage">
        <div className="overview__usageHeader">
          <h3 className="overview__usageTitle">Monthly Usage</h3>
          <span className="overview__usagePlan">{PLAN_DISPLAY[plan] || plan}</span>
        </div>
        <div className="overview__usageInfo">
          <span>{monthlyCount}{isUnlimited ? "" : ` / ${limit}`} conversations this month</span>
          {!isUnlimited && (
            <span className="overview__usagePct" style={{ color: barColor }}>{Math.round(pct)}%</span>
          )}
        </div>
        {!isUnlimited ? (
          <div className="overview__usageBar">
            <div
              className="overview__usageBarFill"
              style={{ width: `${pct}%`, backgroundColor: barColor }}
            />
          </div>
        ) : (
          <p className="overview__usageUnlimited">Unlimited conversations on your plan.</p>
        )}

        {!isUnlimited && !overageEnabled && (
          <div className="overview__usageInfo" style={{ marginTop: 10, justifyContent: "space-between" }}>
            <span>
              {isOverLimit
                ? `AI chat is paused at your limit. Enable overages to continue at $${(overagePriceCents / 100).toFixed(2)}/lead.`
                : `Enable overages to continue past your limit at $${(overagePriceCents / 100).toFixed(2)}/lead.`}
            </span>
            <button
              className="overview__rangeBtn overview__rangeBtn--active"
              onClick={handleEnableOverages}
              disabled={enablingOverages}
            >
              {enablingOverages ? "Enabling..." : "Enable overages"}
            </button>
          </div>
        )}

        {!isUnlimited && overageEnabled && usage && (
          <div className="overview__usageInfo" style={{ marginTop: 10, justifyContent: "space-between" }}>
            <span>
              Overages enabled: {usage.overageCount} overage leads (${(usage.overageAmountCents / 100).toFixed(2)}) this month.
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span>Price ${(overagePriceCents / 100).toFixed(2)}/lead</span>
              <button
                className="overview__rangeBtn"
                onClick={handleDisableOverages}
                disabled={disablingOverages}
              >
                {disablingOverages ? "Disabling..." : "Disable overages"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overview__chartSection">
        <div className="overview__chartHeader">
          <h3 className="overview__chartTitle">Lead Activity</h3>
          <div className="overview__rangeSelector">
            {DATE_RANGES.map((r) => (
              <button
                key={r.label}
                className={`overview__rangeBtn ${range === r.days ? "overview__rangeBtn--active" : ""}`}
                onClick={() => setRange(r.days)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
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
