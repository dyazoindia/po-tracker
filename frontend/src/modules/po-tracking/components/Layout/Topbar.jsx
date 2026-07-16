export default function Topbar({ title }) {
  return (
    <div className="topbar">
      <h2>{title}</h2>
      <span className="badge-admin">👑 Admin</span>
    </div>
  )
}
