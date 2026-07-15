import { useEffect, useState } from 'react'
import { fetchTVView } from '../../api/poApi.js'

export default function TVDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = () => fetchTVView().then(setData).catch(() => {})
    load()
    const interval = setInterval(load, 60000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return <div style={{ padding: 40, fontSize: 24 }}>Loading...</div>

  return (
    <div style={{ padding: 40, background: '#111827', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ fontSize: 40, marginBottom: 30 }}>Dyazo — PO Status (Live)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 40 }}>
        {Object.entries(data.counts || {}).map(([portal, c]) => (
          <div key={portal} style={{ background: '#1f2937', borderRadius: 16, padding: 24 }}>
            <h2 style={{ textTransform: 'capitalize', fontSize: 28 }}>{portal}</h2>
            <p style={{ fontSize: 20 }}>Pending: {c.qtyPending}</p>
            <p style={{ fontSize: 20, color: c.overdueCount > 0 ? '#f87171' : '#4ade80' }}>
              Overdue: {c.overdueCount}
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 30, color: '#f87171' }}>Overdue POs</h2>
      <table style={{ width: '100%', fontSize: 20, color: '#fff' }}>
        <thead>
          <tr><th>PO ID</th><th>Portal</th><th>SKU</th><th>Appointment Date</th><th>Qty Pending</th></tr>
        </thead>
        <tbody>
          {(data.overdueList || []).map((po) => (
            <tr key={po.poId}>
              <td>{po.poId}</td>
              <td style={{ textTransform: 'capitalize' }}>{po.portal}</td>
              <td>{po.sku}</td>
              <td>{new Date(po.appointmentDate).toLocaleDateString()}</td>
              <td>{po.qtyPending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
