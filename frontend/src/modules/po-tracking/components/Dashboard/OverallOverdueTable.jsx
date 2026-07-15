export default function OverallOverdueTable({ overdueList = [] }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <h3 style={{ padding: '16px 20px 0' }}>Overdue POs — Across All Portals</h3>
      {overdueList.length === 0 ? (
        <p style={{ padding: 20, color: '#6b7280' }}>No overdue POs right now. 🎉</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Portal</th>
              <th>SKU</th>
              <th>Appointment Date</th>
              <th>Qty Pending</th>
            </tr>
          </thead>
          <tbody>
            {overdueList.map((po) => (
              <tr key={po.poId} className="overdue-row">
                <td>{po.poId}</td>
                <td style={{ textTransform: 'capitalize' }}>{po.portal}</td>
                <td>{po.sku}</td>
                <td>{new Date(po.appointmentDate).toLocaleDateString()}</td>
                <td>{po.qtyPending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
