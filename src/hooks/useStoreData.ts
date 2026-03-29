import { useEffect, useState } from 'react'
import type { StoreData } from '../types/storeData'

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
    // Use absolute URL so it works regardless of the Vite base path
    const apiBase = import.meta.env.VITE_API_BASE ?? ''
    fetch(`${apiBase}/api/reviews`)
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
