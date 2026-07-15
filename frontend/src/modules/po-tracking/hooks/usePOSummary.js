import { useEffect, useState, useCallback } from 'react'
import { fetchSummary } from '../api/poApi'

export default function usePOSummary() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    fetchSummary()
      .then(setSummary)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  return { summary, loading, error, reload: load }
}
