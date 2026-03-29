import { useEffect, useState } from 'react'
import type { StoreData } from '../../api/reviews'

interface UseStoreDataResult {
  data: StoreData | null
  loading: boolean
  error: string | null
}

export function useStoreData(): UseStoreDataResult {
  const [data, setData] = useState<StoreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<StoreData>
      })
      .then((d) => setData(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
