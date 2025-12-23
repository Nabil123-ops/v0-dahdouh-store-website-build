"use client"
import { createContext, useContext, useState } from "react"

const CartContext = createContext<any>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([])

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) return prev
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)