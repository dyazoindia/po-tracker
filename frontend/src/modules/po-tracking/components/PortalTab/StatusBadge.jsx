const STATUS_MAP = {
  not_started: { label: 'Not Started', className: 'badge-gray' },
  partial: { label: 'Partial', className: 'badge-yellow' },
  fulfilled: { label: 'Fulfilled', className: 'badge-green' },
  overdue: { label: 'Overdue', className: 'badge-red' },
}

export default function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || STATUS_MAP.not_started
  return <span className={`badge ${info.className}`}>{info.label}</span>
}
