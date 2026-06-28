export default function StatusBadge({ status }) {
  const cls =
    status === 'Converted'
      ? 'badge-converted'
      : status === 'Contacted'
      ? 'badge-contacted'
      : 'badge-new';
  return <span className={`badge ${cls}`}>{status}</span>;
}
