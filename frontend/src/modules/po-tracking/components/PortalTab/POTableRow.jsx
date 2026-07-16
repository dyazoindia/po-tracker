import StatusBadge from './StatusBadge.jsx'
import FulfilCheckbox from './FulfilCheckbox.jsx'
import AgingIndicator from '../Shared/AgingIndicator.jsx'

export default function POTableRow({ po, onEdit, onToggleFulfil }) {
  const isOverdue = po.status === 'overdue'
  return (
    <tr className={isOverdue ? 'overdue-row' : ''}>
      <td style={{ fontWeight: 600 }}>{po.poId}</td>
      <td>{po.qtyOrdered}</td>
      <td>
        <span className={`badge ${po.appointmentStatus === 'scheduled' ? 'badge-green' : 'badge-gray'}`}>
          {po.appointmentStatus === 'scheduled' ? 'Scheduled' : 'Not Scheduled'}
        </span>
      </td>
      <td>{new Date(po.appointmentDate).toLocaleDateString()}</td>
      <td>{po.qtySent}</td>
      <td style={{ fontWeight: 600, color: po.qtyPending > 0 ? '#dc2626' : '#16a34a' }}>{po.qtyPending}</td>
      <td><StatusBadge status={po.status} /></td>
      <td><AgingIndicator appointmentDate={po.appointmentDate} fulfilled={po.status === 'fulfilled'} /></td>
      <td>
        <FulfilCheckbox
          checked={po.fulfilTick}
          disabled={po.qtyPending !== 0}
          onChange={(val) => onToggleFulfil(po.poId, val)}
        />
      </td>
      <td>
        <button className="btn" onClick={() => onEdit(po)}>Edit</button>
      </td>
    </tr>
  )
}
