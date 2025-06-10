export interface Product {
  id: string
  name: string
  description: string
  price: number
  weight?: string
  ingredients?: string
  image: string
  category: string
  featured: boolean
  inStock?: boolean
  variants?: string[]
}

export interface CartItem extends Product {
  quantity: number
  selectedVariant?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    notes?: string
  }
  userId?: string
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled"
  createdAt: Date
  paymentMethod: string
}
