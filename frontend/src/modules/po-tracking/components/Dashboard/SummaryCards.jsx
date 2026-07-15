const PORTALS = ['amazon', 'flipkart', 'blinkit', 'zepto']

export default function SummaryCards({ summary }) {
  if (!summary) return null

  return (
    <div className="grid-4" style={{ marginBottom: 24 }}>
      {PORTALS.map((p) => {
        const s = summary[p] || {}
        return (
          <div key={p} className="card">
            <h3 style={{ textTransform: 'capitalize', marginTop: 0 }}>{p}</h3>
            <p>Total POs: <b>{s.totalPOs ?? 0}</b></p>
            <p>Qty Ordered: <b>{s.qtyOrdered ?? 0}</b></p>
            <p>Qty Sent: <b>{s.qtySent ?? 0}</b></p>
            <p>Qty Pending: <b>{s.qtyPending ?? 0}</b></p>
            <p style={{ color: s.overdueCount > 0 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
              Overdue: {s.overdueCount ?? 0}
            </p>
          </div>
        )
      })}
    </div>
  )
}
