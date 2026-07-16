import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Topbar from '../components/Layout/Topbar.jsx'
import POTable from '../components/PortalTab/POTable.jsx'
import POEditModal from '../components/Shared/POEditModal.jsx'
import usePOList from '../hooks/usePOList.js'
import usePOSummary from '../hooks/usePOSummary.js'
import { updatePO } from '../api/poApi.js'

const PORTALS = ['amazon', 'flipkart', 'blinkit', 'zepto']
const FILTERS = ['all', 'not_started', 'partial', 'fulfilled', 'overdue']

export default function PortalPage() {
  const { portal } = useParams()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingPO, setEditingPO] = useState(null)

  const { summary } = usePOSummary()
  const filters = statusFilter === 'all' ? {} : { status: statusFilter }
  const { data, loading, error, reload } = usePOList(portal, filters)

  const handleSave = async (poId, payload) => {
    await updatePO(poId, payload)
    reload()
  }

  const handleToggleFulfil = async (poId, checked) => {
    await updatePO(poId, { fulfilTick: checked })
    reload()
  }

  return (
    <>
      <Topbar title="Open PO Dashboard" />
      <div className="page-content">
        <div className="pill-tabs">
          {PORTALS.map((p) => (
            <button
              key={p}
              className={`pill-tab ${p === portal ? 'active' : ''}`}
              onClick={() => navigate(`/po-tracking/${p}`)}
              style={{ textTransform: 'capitalize' }}
            >
              {p}
              <span className="count">{summary?.[p]?.totalPOs ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="info-banner">
          <b style={{ textTransform: 'capitalize' }}>{portal} Open PO View:</b> Shows Qty Ordered + Qty Sent + Qty Pending + Appointment Date. Warehouse team enters <b>Qty Sent</b> · Pending = Ordered − Sent
        </div>

        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${statusFilter === f ? 'active' : ''}`}
              onClick={() => setStatusFilter(f)}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {loading && <p>Loading POs...</p>}
        {error && <p style={{ color: 'red' }}>Failed to load: {error.message}</p>}

        {!loading && !error && (
          <div className="table-card">
            <POTable poList={data} onEdit={setEditingPO} onToggleFulfil={handleToggleFulfil} />
          </div>
        )}

        {editingPO && (
          <POEditModal po={editingPO} onClose={() => setEditingPO(null)} onSave={handleSave} />
        )}
      </div>
    </>
  )
}
