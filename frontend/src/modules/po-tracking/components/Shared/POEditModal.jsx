import { useState } from 'react'

export default function POEditModal({ po, onClose, onSave }) {
  const [qtySent, setQtySent] = useState(po.qtySent)
  const [appointmentStatus, setAppointmentStatus] = useState(po.appointmentStatus || 'not_scheduled')
  const [appointmentDate, setAppointmentDate] = useState(
    po.appointmentDate ? new Date(po.appointmentDate).toISOString().slice(0, 10) : ''
  )
  const [remarks, setRemarks] = useState(po.remarks || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(po.poId, {
        qtySent: Number(qtySent),
        appointmentStatus,
        appointmentDate,
        remarks,
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle} className="table-card">
        <div style={{ padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>Edit PO — {po.poId}</h3>

          <label style={labelStyle}>Qty Ordered</label>
          <input value={po.qtyOrdered} disabled style={inputStyle} />

          <label style={labelStyle}>Qty Sent</label>
          <input
            type="number"
            min={0}
            max={po.qtyOrdered}
            value={qtySent}
            onChange={(e) => setQtySent(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Appointment</label>
          <select
            value={appointmentStatus}
            onChange={(e) => setAppointmentStatus(e.target.value)}
            style={inputStyle}
          >
            <option value="not_scheduled">Not Scheduled</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <label style={labelStyle}>Appointment Date</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            style={{ ...inputStyle, height: 70 }}
          />

          <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
            <button className="btn" onClick={onClose} disabled={saving}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
}
const modalStyle = { width: 380 }
const labelStyle = { display: 'block', marginTop: 10, marginBottom: 4, fontSize: 13, fontWeight: 600 }
const inputStyle = { width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }
