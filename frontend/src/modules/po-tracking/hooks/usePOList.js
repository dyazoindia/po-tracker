import { useEffect, useState, useCallback } from 'react'
import { fetchPOsByPortal } from '../api/poApi'

export default function usePOList(portal, filters = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    if (!portal) return
    setLoading(true)
    fetchPOsByPortal(portal, filters)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [portal, JSON.stringify(filters)])

  useEffect(() => { load() }, [load])

  return { data, loading, error, reload: load }
}
