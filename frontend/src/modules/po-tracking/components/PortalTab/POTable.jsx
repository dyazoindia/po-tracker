import POTableRow from './POTableRow.jsx'

export default function POTable({ poList, onEdit, onToggleFulfil }) {
  if (!poList.length) {
    return <p style={{ color: '#6b7280', padding: 20 }}>No purchase orders found for this filter.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>PO ID</th>
          <th>SKU</th>
          <th>Qty Ordered</th>
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
