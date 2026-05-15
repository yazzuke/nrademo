import { useState, useEffect, useRef } from 'react'
import type { ToastDisplayOrder, ToastResponse } from '../types'

const API_BASE = 'https://toastorderseyc.zeabur.app/api/toast/ocb'
const POLL_INTERVAL = 5_000
const DISPLAY_DURATION = 10_000

function getBusinessDate(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

export function useToastOrders() {
  const [displayOrder, setDisplayOrder] = useState<ToastDisplayOrder | null>(null)
  const seenGuids = useRef<Set<string>>(new Set())
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch(`${API_BASE}?businessDate=${getBusinessDate()}`)
        if (!res.ok) return
        const data: ToastResponse = await res.json()

        const newOrders = data.orders.filter(o => !seenGuids.current.has(o.orderGuid))
        if (newOrders.length === 0) return

        newOrders.forEach(o => seenGuids.current.add(o.orderGuid))
        const latest = newOrders[newOrders.length - 1]

        if (timerRef.current) clearTimeout(timerRef.current)

        setDisplayOrder({
          displayNumber: latest.displayNumber,
          totalAmount: latest.totalAmount,
          items: latest.items,
        })

        timerRef.current = setTimeout(() => {
          setDisplayOrder(null)
        }, DISPLAY_DURATION)
      } catch {
        // fail silently — display stays as-is
      }
    }

    poll()
    const interval = setInterval(poll, POLL_INTERVAL)
    return () => {
      clearInterval(interval)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return { displayOrder }
}
