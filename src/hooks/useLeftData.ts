import { useState, useEffect } from 'react'
import type { LeftData, LeftProduct } from '../types'

const API_BASE = 'https://toastorderseyc.zeabur.app/api/toast/menus-db'
//const API_BASE = 'http://localhost:8080/api/toast/menus-db'
const REFRESH_INTERVAL = 60_000
const TARGET_MENU = 'BEVERAGES ECN'

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
interface ToastGroup { group: string; items: ToastItem[] }
interface ToastMenu { menu: string; groups: ToastGroup[] }

const EMPTY: LeftProduct = { name: '', size: '', calories: 0, units: 'cals', price: 0, description: '', tags: null, inStock: true }

function toProduct(item: ToastItem): LeftProduct {
  const stockOk = item.inStock !== undefined
    ? item.inStock
    : (item.stock === 'IN_STOCK' || item.stock === 'QUANTITY')
  return { name: item.name, size: '', calories: 0, units: 'cals', price: item.price ?? 0, description: item.description ?? '', tags: null, inStock: stockOk }
}

function pad(arr: LeftProduct[], len: number): LeftProduct[] {
  const r = arr.slice(0, len)
  while (r.length < len) r.push({ ...EMPTY })
  return r
}

function getGroupItems(groups: ToastGroup[], name: string): ToastItem[] {
  const g = groups.find(g => g.group.trim().toLowerCase() === name.trim().toLowerCase())
  if (!g) {
    console.warn(`[useLeftData] Group "${name}" not found. Available:`, groups.map(g => JSON.stringify(g.group)))
    return []
  }
  return g.items
}

function mapToLeftData(menus: ToastMenu[]): LeftData {
  const menu = menus.find(m => m.menu === TARGET_MENU) ?? menus[0]
  const groups = menu.groups

  console.group(`[useLeftData] Groups in "${menu.menu}"`)
  groups.forEach(g => console.log(`  "${g.group}": ${g.items.length} items`))
  console.groupEnd()

  // ECN Coffee group — ALL items go to Coffee Bar section; title comes from API
  const ecnCoffeeGroup = menu.groups.find(g => g.group.trim().toLowerCase() === 'ecn coffee')
  if (!ecnCoffeeGroup) console.warn('[useLeftData] ECN Coffee group not found')
  const ecnCoffee  = ecnCoffeeGroup?.items ?? []
  const espresso   = ecnCoffee                                                   // all 12 items

  // ECN Specials group — second section
  const ecnSpecialsGroup = menu.groups.find(g => g.group.trim().toLowerCase() === 'ecn specials')
  if (!ecnSpecialsGroup) console.warn('[useLeftData] ECN Specials group not found')
  const specials4brew  = ecnSpecialsGroup?.items ?? []

  const icedTea    = getGroupItems(groups, 'Iced Tea')
  const hotChoc    = getGroupItems(groups, 'Hot Chocolate')
  const milk       = getGroupItems(groups, 'Milk')
  const coldBrew   = getGroupItems(groups, 'ECN Seasonal & Cold Bar')
  const specials   = getGroupItems(groups, 'Specials')

  // Coffee Bar: dark spot = longest description from Espresso Drinks
  const sortedEsp = [...espresso].sort((a, b) => b.description.length - a.description.length)
  const darkSpot = sortedEsp[0]
  const mainEspresso = espresso.filter(i => i.guid !== darkSpot?.guid)

  // Coffee Bar 11 regular slots: espresso(7) + iced tea(1) + hot choc(1) + milk(2) = 11
  const coffeeBarPool = [...mainEspresso, ...icedTea, ...hotChoc, ...milk]
  const coffeeBarProds = pad(coffeeBarPool.slice(0, 12).map(toProduct), 12)
  const darkSpotProd = darkSpot ? toProduct(darkSpot) : { ...EMPTY }

  // Brew 4 slots: ECN Specials
  const brewProds = pad(specials4brew.slice(0, 4).map(toProduct), 4)

  // Seasonal: Iced Mocha Latte + Iced Vanilla Latte (from Cold Brew group)
  const seasonalPool = coldBrew.filter(i =>
    i.name === 'Iced Mocha Latte' || i.name === 'Iced Vanilla Latte'
  )
  const s0 = seasonalPool[0]
  const s1 = seasonalPool[1]

  // Cold Bar 3 slots from Cold Brew group
  const coldProds = pad(coldBrew.slice(0, 3).map(toProduct), 3)

  const fmtPrice = (item: ToastItem | undefined) =>
    item && (item.price ?? 0) > 0 ? '$' + (item.price as number).toFixed(2) : ''

  const texts = [
    ecnCoffeeGroup?.group ?? 'ECN Coffee',
    darkSpot?.name ?? 'Special',
    ecnSpecialsGroup?.group ?? 'ECN Specials',
    'Seasonal',
    s0?.name ?? '',
    s0?.description ?? '',
    s1?.name ?? '',
    s1?.description ?? '',
    'Cold Bar',
    'Served fresh daily — ask your barista',
    fmtPrice(s0),
    fmtPrice(s1),
  ]

  const products = [...coffeeBarProds, darkSpotProd, ...brewProds, ...coldProds]
  console.log('[useLeftData] Mapped →', products.map(p => p.name))

  return { products, texts }
}

// Module-level cache — survives re-renders, keeps last good data on API errors
let cachedData: LeftData | null = null

export function useLeftData() {
  const [data, setData] = useState<LeftData | null>(cachedData)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      console.log('[useLeftData] Fetching:', API_BASE)
      const response = await fetch(API_BASE)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const json: ToastMenu[] = await response.json()
      const mapped = mapToLeftData(json)
      cachedData = mapped
      setData(mapped)
      setError(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      console.error('[useLeftData] Failed:', msg)
      // Keep existing data visible — only update the error indicator
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
