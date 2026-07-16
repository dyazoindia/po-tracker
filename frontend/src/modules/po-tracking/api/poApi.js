const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function handle(res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed with ${res.status}`)
  }
  return res.json()
}

export const fetchSummary = () =>
  fetch(`${BASE}/api/po/summary`).then(handle)

export const fetchPOsByPortal = (portal, filters = {}) =>
  fetch(`${BASE}/api/po/portal/${portal}?${new URLSearchParams(filters)}`).then(handle)

export const updatePO = (poId, payload) =>
  fetch(`${BASE}/api/po/${poId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handle)

export const createPO = (payload) =>
  fetch(`${BASE}/api/po`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handle)

export const fetchTVView = () =>
  fetch(`${BASE}/api/po/tv-view`).then(handle)

export const bulkUploadPOs = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return fetch(`${BASE}/api/po/bulk-upload`, {
    method: 'POST',
    body: formData,
  }).then(handle)
}
