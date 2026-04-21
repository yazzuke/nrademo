import { useState, useEffect } from 'react'
import type { OrderData } from '../types'

const DATA_URL = '/order-data.json'
const REFRESH_INTERVAL = 1_000

export function useOrderData() {
  const [data, setData] = useState<OrderData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch(DATA_URL)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const json: OrderData = await response.json()
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
