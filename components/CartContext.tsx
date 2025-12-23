"use client"

import { createContext, useContext, useEffect, useState } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image_url?: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === item.id)
      if (existing) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id))

  const clear = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be inside CartProvider")
  return ctx
}