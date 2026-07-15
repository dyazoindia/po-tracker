import { useState } from 'react'

export default function POEditModal({ po, onClose, onSave }) {
  const [qtySent, setQtySent] = useState(po.qtySent)
  const [remarks, setRemarks] = useState(po.remarks || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(po.poId, { qtySent: Number(qtySent), remarks })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle} className="card">
        <h3>Edit PO — {po.poId}</h3>
        <p style={{ color: '#6b7280', fontSize: 13 }}>{po.productName} ({po.sku})</p>

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

        <label style={labelStyle}>Remarks</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          style={{ ...inputStyle, height: 70 }}
        />

        <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'flex-end' }}>
          <button onClick={onClose} disabled={saving}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
}
const modalStyle = { width: 380, background: '#fff' }
const labelStyle = { display: 'block', marginTop: 10, marginBottom: 4, fontSize: 13, fontWeight: 600 }
const inputStyle = { width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }
