export default function OverallOverdueTable({ overdueList = [] }) {
  return (
    <div className="table-card">
      <div style={{ padding: '16px 18px', borderBottom: '1px solid #f0f0f0', fontWeight: 700, fontSize: 14 }}>
        Overdue POs — Across All Portals
      </div>
      {overdueList.length === 0 ? (
        <div className="empty-state">No overdue POs right now. 🎉</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Portal</th>
              <th>Appointment Date</th>
              <th>Qty Pending</th>
            </tr>
          </thead>
          <tbody>
            {overdueList.map((po) => (
              <tr key={po.poId} className="overdue-row">
                <td>{po.poId}</td>
                <td style={{ textTransform: 'capitalize' }}>{po.portal}</td>
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
