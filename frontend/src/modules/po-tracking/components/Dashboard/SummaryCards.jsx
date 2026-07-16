const PORTALS = [
  { key: 'amazon', label: 'Amazon', cls: 'c-amazon' },
  { key: 'flipkart', label: 'Flipkart', cls: 'c-flipkart' },
  { key: 'blinkit', label: 'Blinkit', cls: 'c-blinkit' },
  { key: 'zepto', label: 'Zepto', cls: 'c-zepto' },
]

export default function SummaryCards({ summary }) {
  if (!summary) return null

  return (
    <div className="grid-4">
      {PORTALS.map(({ key, label, cls }) => {
        const s = summary[key] || {}
        return (
          <div key={key} className={`stat-card ${cls}`}>
            <div className="label">{label}</div>
            <div className="row"><span>Total POs</span><b>{s.totalPOs ?? 0}</b></div>
            <div className="row"><span>Qty Ordered</span><b>{s.qtyOrdered ?? 0}</b></div>
            <div className="row"><span>Qty Sent</span><b>{s.qtySent ?? 0}</b></div>
            <div className="row"><span>Qty Pending</span><b>{s.qtyPending ?? 0}</b></div>
            <div className="overdue-line" style={{ color: s.overdueCount > 0 ? '#dc2626' : '#16a34a' }}>
              Overdue: {s.overdueCount ?? 0}
            </div>
          </div>
        )
      })}
    </div>
  )
}
