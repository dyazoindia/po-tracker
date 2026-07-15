import StatusBadge from './StatusBadge.jsx'
import FulfilCheckbox from './FulfilCheckbox.jsx'
import AgingIndicator from '../Shared/AgingIndicator.jsx'

export default function POTableRow({ po, onEdit, onToggleFulfil }) {
  const isOverdue = po.status === 'overdue'
  return (
    <tr className={isOverdue ? 'overdue-row' : ''}>
      <td>{po.poId}</td>
      <td>{po.sku}</td>
      <td>{po.qtyOrdered}</td>
      <td>{new Date(po.appointmentDate).toLocaleDateString()}</td>
      <td>{po.qtySent}</td>
      <td>{po.qtyPending}</td>
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
        <button onClick={() => onEdit(po)}>Edit</button>
      </td>
    </tr>
  )
}
