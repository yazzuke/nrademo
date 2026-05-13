import { useState, useEffect } from 'react'
import type { TemplateData } from '../types'

const API_URL = 'https://toastorderseyc.zeabur.app/api/toast/menus-simple'
const REFRESH_INTERVAL = 5_000

interface ToastItem {
  name: string
  price: number
  guid: string
  description: string
  image: string | null
  stock: string
  quantity: number | null
}

interface ToastGroup {
  group: string
  items: ToastItem[]
}

interface ToastMenu {
  menu: string
  groups: ToastGroup[]
}

function mapToTemplateData(menus: ToastMenu[]): TemplateData {
  const first = menus[0]

  // Collect all IN_STOCK items from all groups
  const allItems: ToastItem[] = []
  for (const group of first.groups) {
    for (const item of group.items) {
      if (item.stock === 'IN_STOCK' || item.stock === 'QUANTITY') {
        allItems.push(item)
      }
      if (allItems.length >= 7) break
    }
    if (allItems.length >= 7) break
  }

  // Pad to 7 if not enough in-stock items
  const fallbackItems: ToastItem[] = []
  if (allItems.length < 7) {
    for (const group of first.groups) {
      for (const item of group.items) {
        if (!allItems.find(i => i.guid === item.guid)) {
          fallbackItems.push(item)
        }
        if (allItems.length + fallbackItems.length >= 7) break
      }
      if (allItems.length + fallbackItems.length >= 7) break
    }
  }

  const products = [...allItems, ...fallbackItems].slice(0, 7).map(item => ({
    name: item.name,
  }))

  // Pad to 7 if somehow still short
  while (products.length < 7) {
    products.push({ name: '' })
  }

  return {
    products,
    texts: first.menu,
  }
}

export function useMenuData() {
  const [data, setData] = useState<TemplateData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      console.log('[useMenuData] Fetching:', API_URL)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const json: ToastMenu[] = await response.json()

      console.group('[useMenuData] API response')
      console.log('Menus:', json.map(m => m.menu))
      json.forEach(menu => {
        console.group(`Menu: ${menu.menu}`)
        menu.groups.forEach(g => {
          console.log(`  ${g.group} (${g.items.length} items):`, g.items.map(i => `${i.name} [${i.stock}]`))
        })
        console.groupEnd()
      })
      console.groupEnd()

      const mapped = mapToTemplateData(json)
      console.log('[useMenuData] Mapped →', { texts: mapped.texts, products: mapped.products.map(p => p.name) })

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
