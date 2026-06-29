import { useEffect, useMemo, useState } from 'react';
import { Mail, Shield, Users, Activity, Clock3, BadgeCheck } from 'lucide-react';
import { getCurrentUser } from '../services/auth';
import { fetchLeads } from '../services/leads';

export default function Profile() {
  const user = getCurrentUser();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const activeLeads = leads.filter((lead) => lead.status !== 'Converted').length;
    const convertedLeads = leads.filter((lead) => lead.status === 'Converted').length;
    const followUps = leads.filter((lead) => lead.followUpDate).length;
    const latestLead = leads
      .slice()
      .sort((left, right) => new Date(right.updatedAt || right.createdAt) - new Date(left.updatedAt || left.createdAt))[0];

    return {
      totalLeads,
      activeLeads,
      convertedLeads,
      followUps,
      latestLead,
      conversionRate: totalLeads ? Math.round((convertedLeads / totalLeads) * 100) : 0,
    };
  }, [leads]);

  const initials = (user?.name || 'U')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      <div className="page-header analysis-header">
        <div>
          <h1>Profile</h1>
          <p className="muted">Account details, workspace activity, and performance at a glance.</p>
        </div>
      </div>

      <div className="profile-shell">
        <div className="card profile-hero">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-hero-copy">
            <div className="profile-kicker">Admin account</div>
            <h2>{user?.name || 'Unknown user'}</h2>
            <p className="muted">{user?.email || 'No email available'}</p>
            <div className="profile-meta">
              <span className="profile-pill">
                <Shield size={14} />
                Full access
              </span>
              <span className="profile-pill">
                <BadgeCheck size={14} />
                Active session
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-4 profile-metrics">
          <MetricCard icon={<Users size={18} />} label="Total Leads" value={loading ? '...' : stats.totalLeads} />
          <MetricCard icon={<Activity size={18} />} label="Active Leads" value={loading ? '...' : stats.activeLeads} />
          <MetricCard icon={<BadgeCheck size={18} />} label="Converted" value={loading ? '...' : stats.convertedLeads} />
          <MetricCard icon={<Clock3 size={18} />} label="Follow-Ups" value={loading ? '...' : stats.followUps} />
        </div>

        <div className="grid profile-grid">
          <div className="card profile-section">
            <div className="card-heading">
              <h2>Account Details</h2>
              <span className="muted">Current signed-in user</span>
            </div>

            <div className="profile-detail-list">
              <DetailRow icon={<Users size={16} />} label="Name" value={user?.name || '—'} />
              <DetailRow icon={<Mail size={16} />} label="Email" value={user?.email || '—'} />
              <DetailRow icon={<Shield size={16} />} label="Role" value="Administrator" />
              <DetailRow icon={<BadgeCheck size={16} />} label="Access" value="Create, edit, and review leads" />
            </div>
          </div>

          <div className="card profile-section">
            <div className="card-heading">
              <h2>Workspace Activity</h2>
              <span className="muted">Live CRM summary</span>
            </div>

            <div className="profile-mini-stats">
              <MiniStat label="Total leads" value={loading ? '...' : stats.totalLeads} />
              <MiniStat label="Conversion rate" value={loading ? '...' : `${stats.conversionRate}%`} />
              <MiniStat label="Latest update" value={stats.latestLead?.name || 'No recent activity'} />
            </div>

            <div className="profile-note">
              {loading ? (
                <div className="muted">Loading your workspace activity…</div>
              ) : stats.latestLead ? (
                <>
                  <div className="profile-note-title">Most recent lead</div>
                  <div>{stats.latestLead.name}</div>
                  <div className="muted">{stats.latestLead.company || 'No company listed'} · {stats.latestLead.status}</div>
                </>
              ) : (
                <div className="muted">No lead activity yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="card profile-metric-card">
      <div className="profile-metric-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value profile-metric-value">{value}</div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="profile-detail-row">
      <div className="profile-detail-label">
        <span className="profile-detail-icon">{icon}</span>
        {label}
      </div>
      <div className="profile-detail-value">{value}</div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="profile-mini-stat">
      <div className="stat-label">{label}</div>
      <div className="profile-mini-value">{value}</div>
    </div>
  );
}
