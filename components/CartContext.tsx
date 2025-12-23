"use client"

import { createContext, useContext, useEffect, useState } from "react"

/* -----------------------------
   TYPES
----------------------------- */
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
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  clear: () => void
}

/* -----------------------------
   CONTEXT
----------------------------- */
const CartContext = createContext<CartContextType | null>(null)

/* -----------------------------
   PROVIDER
----------------------------- */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  /* Load cart from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        setItems([])
      }
    }
  }, [])

  /* Persist cart */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  /* ADD ITEM */
  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === item.id)

      if (existing) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        )
      }

      return [...prev, item]
    })
  }

  /* REMOVE ITEM */
  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  /* INCREASE QUANTITY */
  const increaseQty = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  /* DECREASE QUANTITY */
  const decreaseQty = (id: string) => {
    setItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  /* CLEAR CART */
  const clear = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/* -----------------------------
   HOOK
----------------------------- */
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return ctx
}