import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/components/CartContext"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ShoppingCart, Package, Shield } from "lucide-react"
import Image from "next/image"
import ReviewForm from "@/components/ReviewForm"
import ReviewList from "@/components/ReviewList"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null)
  const supabase = createClient()
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("slug", params.slug)
        .eq("is_published", true)
        .single()
      setProduct(data)
    }
    fetchProduct()
  }, [params.slug])

  if (!product) return <p className="text-center py-20">Loading...</p>

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const whatsappMessage = `
Hello 👋
I want to order:
🛍 Product: ${product.name}
💰 Price: $${product.price}
`
  const whatsappUrl = `https://wa.me/447377279370?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <Badge className="absolute right-4 top-4 bg-destructive text-white">{discount}% OFF</Badge>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit">
              {product.categories?.name}
            </Badge>

            <h1 className="text-4xl font-serif font-bold">{product.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.original_price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.original_price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex gap-3">
              <Button size="lg" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={whatsappUrl} target="_blank">
                  <Phone className="mr-2 h-5 w-5" /> Order via WhatsApp
                </a>
              </Button>
            </div>

            <Card>
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Shield className="text-primary h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">Cash on Delivery</h3>
                    <p className="text-sm text-muted-foreground">Pay when received</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="text-primary h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">1–3 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* REVIEWS */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              <ReviewList productId={product.id} />
              <ReviewForm productId={product.id} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}