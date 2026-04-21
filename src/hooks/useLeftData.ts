import { useState, useEffect } from 'react'
import type { LeftData } from '../types'

const DATA_URL = '/left-data.json'
const REFRESH_INTERVAL = 30_000

export function useLeftData() {
  const [data, setData] = useState<LeftData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch(DATA_URL)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const json: LeftData = await response.json()
      setData(json)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return { data, error }
}
