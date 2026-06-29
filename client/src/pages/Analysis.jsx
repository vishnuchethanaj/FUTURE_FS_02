import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { fetchLeads } from '../services/leads';

const STATUS_COLORS = {
  New: '#2563eb',
  Contacted: '#f59e0b',
  Converted: '#22c55e',
};

const SOURCE_COLORS = ['#2563eb', '#0f766e', '#f97316', '#8b5cf6', '#ef4444', '#14b8a6'];

function toDateKey(value) {
  if (!value) return null;
  return new Date(value).toISOString().slice(0, 10);
}

function formatShortDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export default function Analysis() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter((lead) => lead.status === 'Converted').length;
    const contacted = leads.filter((lead) => lead.status === 'Contacted').length;
    const pending = leads.filter((lead) => lead.status === 'New').length;

    const byStatus = ['New', 'Contacted', 'Converted'].map((status) => ({
      name: status,
      value: leads.filter((lead) => lead.status === status).length,
    }));

    const sourceMap = new Map();
    leads.forEach((lead) => {
      const source = lead.source || 'Unknown';
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
    });
    const bySource = Array.from(sourceMap.entries()).map(([name, value]) => ({ name, value }));

    const byDayMap = new Map();
    leads.forEach((lead) => {
      const createdKey = toDateKey(lead.createdAt);
      if (!createdKey) return;
      byDayMap.set(createdKey, (byDayMap.get(createdKey) || 0) + 1);
    });
    const byDay = Array.from(byDayMap.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .slice(-10)
      .map(([date, count]) => ({ date: formatShortDate(date), count }));

    const followUps = leads.filter((lead) => lead.followUpDate);
    const upcomingCounts = new Map();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let index = 0; index < 7; index += 1) {
      const current = new Date(today);
      current.setDate(today.getDate() + index);
      upcomingCounts.set(current.toISOString().slice(0, 10), 0);
    }
    followUps.forEach((lead) => {
      const key = lead.followUpDate;
      if (upcomingCounts.has(key)) {
        upcomingCounts.set(key, upcomingCounts.get(key) + 1);
      }
    });
    const upcoming = Array.from(upcomingCounts.entries()).map(([date, count]) => ({
      date: formatShortDate(date),
      count,
    }));

    return { total, converted, contacted, pending, byStatus, bySource, byDay, upcoming };
  }, [leads]);

  return (
    <>
      <div className="page-header analysis-header">
        <div>
          <h1>Analysis</h1>
          <p className="muted">A quick visual read on pipeline health and lead activity.</p>
        </div>
      </div>

      <div className="grid grid-4 analysis-summary" style={{ marginBottom: 24 }}>
        <StatCard label="Total Leads" value={stats.total} />
        <StatCard label="New" value={stats.pending} />
        <StatCard label="Contacted" value={stats.contacted} />
        <StatCard label="Converted" value={stats.converted} />
      </div>

      <div className="grid grid-2 analysis-grid">
        <div className="card chart-card">
          <div className="card-heading">
            <h2>Status Distribution</h2>
            <span className="muted">Lead lifecycle mix</span>
          </div>
          {loading ? (
            <div className="empty">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={stats.byStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {stats.byStatus.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="chart-legend">
            {stats.byStatus.map((entry) => (
              <div key={entry.name} className="legend-item">
                <span className="legend-dot" style={{ background: STATUS_COLORS[entry.name] }} />
                <span>{entry.name}</span>
                <strong>{entry.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-heading">
            <h2>Lead Sources</h2>
            <span className="muted">Where leads come from</span>
          </div>
          {loading ? (
            <div className="empty">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.bySource} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {stats.bySource.map((entry, index) => (
                    <Cell key={entry.name} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card chart-card">
          <div className="card-heading">
            <h2>Lead Creation Trend</h2>
            <span className="muted">Recent activity by day</span>
          </div>
          {loading ? (
            <div className="empty">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={stats.byDay} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card chart-card">
          <div className="card-heading">
            <h2>Follow-Ups Next 7 Days</h2>
            <span className="muted">Planned follow-up volume</span>
          </div>
          {loading ? (
            <div className="empty">Loading...</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.upcoming} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}