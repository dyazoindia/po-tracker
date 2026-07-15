import { useParams } from 'react-router-dom'
import { useState } from 'react'
import PortalTabNav from '../components/PortalTab/PortalTabNav.jsx'
import POTable from '../components/PortalTab/POTable.jsx'
import POEditModal from '../components/Shared/POEditModal.jsx'
import usePOList from '../hooks/usePOList.js'
import { updatePO } from '../api/poApi.js'

const FILTERS = ['all', 'not_started', 'partial', 'fulfilled', 'overdue']

export default function PortalPage() {
  const { portal } = useParams()
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingPO, setEditingPO] = useState(null)

  const filters = statusFilter === 'all' ? {} : { status: statusFilter }
  const { data, loading, error, reload } = usePOList(portal, filters)

  const handleSave = async (poId, payload) => {
    await updatePO(poId, payload)
    reload()
  }

  const handleToggleFulfil = async (poId, checked) => {
    // Fulfil tick only allowed to flip when qtyPending is already 0 (enforced server-side too)
    await updatePO(poId, { fulfilTick: checked })
    reload()
  }

  return (
    <div className="container">
      <h1 style={{ textTransform: 'capitalize' }}>{portal} — Purchase Orders</h1>
      <PortalTabNav />

      <div style={{ marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            style={{
              marginRight: 8,
              fontWeight: statusFilter === f ? 700 : 400,
              textTransform: 'capitalize',
            }}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading && <p>Loading POs...</p>}
      {error && <p style={{ color: 'red' }}>Failed to load: {error.message}</p>}

      {!loading && !error && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <POTable poList={data} onEdit={setEditingPO} onToggleFulfil={handleToggleFulfil} />
        </div>
      )}

      {editingPO && (
        <POEditModal po={editingPO} onClose={() => setEditingPO(null)} onSave={handleSave} />
      )}
    </div>
  )
}
