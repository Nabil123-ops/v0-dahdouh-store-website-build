"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContext"
import { toast } from "@/components/ui/use-toast"

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart()

  const handleAdd = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} added successfully 🛒`,
    })
  }

  return (
    <Button size="lg" onClick={handleAdd}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}