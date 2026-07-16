import POTableRow from './POTableRow.jsx'

export default function POTable({ poList, onEdit, onToggleFulfil }) {
  if (!poList.length) {
    return <div className="empty-state">No purchase orders found for this filter.</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>PO ID</th>
          <th>Qty Ordered</th>
          <th>Appointment</th>
          <th>Appointment Date</th>
          <th>Qty Sent</th>
          <th>Qty Pending</th>
          <th>Status</th>
          <th>Aging</th>
          <th>Fulfil</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {poList.map((po) => (
          <POTableRow key={po._id || po.poId} po={po} onEdit={onEdit} onToggleFulfil={onToggleFulfil} />
        ))}
      </tbody>
    </table>
  )
}
