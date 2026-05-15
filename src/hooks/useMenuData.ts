import { useState, useEffect } from 'react'
import type { TemplateData } from '../types'

const API_BASE = 'https://toastorderseyc.zeabur.app/api/toast/menus-db'
//const API_BASE = 'http://localhost:8080/api/toast/menus-db'
const REFRESH_INTERVAL = 5_000

interface ToastItem {
  name: string
  price: number | null
  guid: string
  description: string
  image: string | null
  stock: string
  quantity: number | null
  inStock?: boolean
}

interface ToastGroup {
  group: string
  items: ToastItem[]
}

interface ToastMenu {
  menu: string
  groups: ToastGroup[]
}

function isInStock(item: ToastItem): boolean {
  return item.inStock !== undefined
    ? item.inStock
    : (item.stock === 'IN_STOCK' || item.stock === 'QUANTITY')
}

const TARGET_GROUP = 'Desserts ECN'

function mapToTemplateData(menus: ToastMenu[]): TemplateData {
  // Find the Desserts ECN group across all menus
  let targetGroup: ToastGroup | undefined
  for (const menu of menus) {
    targetGroup = menu.groups.find(g => g.group === TARGET_GROUP)
    if (targetGroup) break
  }

  if (!targetGroup) {
    console.warn(`[useMenuData] Group "${TARGET_GROUP}" not found. Available:`,
      menus.flatMap(m => m.groups.map(g => g.group)))
    targetGroup = menus[0]?.groups[0]
  }

  const products = (targetGroup?.items ?? []).map(item => ({
    name: item.name,
    guid: item.guid,
    price: item.price ?? 0,
    inStock: isInStock(item),
    image: item.image ?? null,
  }))

  return {
    products,
    texts: targetGroup?.group ?? TARGET_GROUP,
  }
}

let cachedData: TemplateData | null = null

export function useMenuData() {
  const [data, setData] = useState<TemplateData | null>(cachedData)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch(API_BASE)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const json: ToastMenu[] = await response.json()
      const mapped = mapToTemplateData(json)
      cachedData = mapped
      setData(mapped)
      setError(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      console.error('[useMenuData] Failed:', msg)
      setError(msg)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return { data, error }
}
