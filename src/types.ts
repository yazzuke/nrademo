export interface Product {
  name: string
}

export interface TemplateData {
  products: Product[]
  texts: string
}

export interface OrderProduct {
  name: string
  quantity: number
  price: string
  total: string
}

export interface OrderData {
  toDisplay: boolean
  totalOrder: string
  products: OrderProduct[]
}

// Toast API types
export interface ToastItem {
  name: string
  quantity: number
  price: number
  modifiers: string[]
}

export interface ToastOrder {
  orderGuid: string
  displayNumber: string
  totalAmount: number
  items: ToastItem[]
}

export interface ToastResponse {
  orders: ToastOrder[]
}

export interface ToastDisplayOrder {
  displayNumber: string
  totalAmount: number
  items: ToastItem[]
}

export interface LeftProduct {
  name: string
  size: string
  calories: number
  units: string
  price: number
  description: string
  tags: string | null
}

export interface LeftData {
  products: LeftProduct[]
  texts: string[]
}
