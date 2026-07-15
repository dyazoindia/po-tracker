export default function AgingIndicator({ appointmentDate, fulfilled }) {
  if (fulfilled) return <span className="badge badge-green">Done</span>

  const today = new Date()
  const target = new Date(appointmentDate)
  const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return <span className="badge badge-red">{Math.abs(diffDays)}d overdue</span>
  }
  if (diffDays <= 2) {
    return <span className="badge badge-yellow">{diffDays}d left</span>
  }
  return <span className="badge badge-green">{diffDays}d left</span>
}
