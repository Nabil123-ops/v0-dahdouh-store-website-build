import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ShoppingCart, Package, Shield } from "lucide-react"
import { notFound } from "next/navigation"
import Image from "next/image"
import ProductGallery from "./product-gallery"

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()

  const { data: product } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!product) notFound()

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const whatsappMessage = `Hi! I'm interested in ${product.name} - $${product.price.toFixed(2)}`
  const whatsappUrl = `https://wa.me/96176914627?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* ✅ IMAGE GALLERY */}
            <ProductGallery
              images={
                product.images?.length
                  ? product.images
                  : [product.image_url || "/placeholder.svg"]
              }
              featured={product.is_featured}
              discount={discount}
            />

            {/* PRODUCT INFO */}
            <div className="flex flex-col gap-6">
              {product.categories && (
                <Badge variant="outline" className="w-fit">
                  {product.categories.name}
                </Badge>
              )}

              <div>
                <h1 className="mb-3 text-3xl font-bold lg:text-4xl">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.original_price && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.original_price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}

              {/* ✅ OPTIONS */}
              {product.options &&
                Object.entries(product.options).map(([key, values]) => (
                  <div key={key}>
                    <p className="mb-2 font-semibold">{key}</p>
                    <div className="flex flex-wrap gap-2">
                      {(values as string[]).map((v) => (
                        <button
                          key={v}
                          className="rounded border px-3 py-1 text-sm hover:bg-primary hover:text-white"
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4" />
                {product.stock_quantity > 0
                  ? `${product.stock_quantity} in stock`
                  : "Out of stock"}
              </div>

              <Button size="lg" asChild disabled={product.stock_quantity === 0}>
                <a href={whatsappUrl} target="_blank">
                  <Phone className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </a>
              </Button>

              <Card>
                <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when you receive
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Fast Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Quick shipping
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}