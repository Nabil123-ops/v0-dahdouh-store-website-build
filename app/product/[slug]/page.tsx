import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Package, Shield } from "lucide-react"

import AddToCartButton from "@/components/AddToCartButton"
import ReviewForm from "@/components/ReviewForm"
import ReviewList from "@/components/ReviewList"

/* ------------------------------------
   PRODUCT PAGE (SERVER COMPONENT)
------------------------------------ */
export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()
  const slug = params.slug

  /* ------------------------------------
     FETCH PRODUCT (SAFE QUERY)
  ------------------------------------ */
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug)")
    .eq("slug", slug)
    .eq("is_published", true)
    .limit(1)

  const product = data?.[0]

  if (!product) notFound()

  /* ------------------------------------
     CALCULATIONS
  ------------------------------------ */
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) /
          product.original_price) *
          100
      )
    : 0

  const whatsappMessage = `
Hello 👋
I want to order:

🛍 Product: ${product.name}
💰 Price: $${product.price}

Please confirm availability and delivery 🚚
  `.trim()

  const whatsappUrl = `https://wa.me/447377279370?text=${encodeURIComponent(
    whatsappMessage
  )}`

  /* ------------------------------------
     RENDER
  ------------------------------------ */
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* PRODUCT IMAGE */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <Badge className="absolute right-4 top-4 bg-destructive text-white">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col gap-6">
            {product.categories && (
              <Badge variant="outline" className="w-fit">
                {product.categories.name}
              </Badge>
            )}

            <h1 className="text-4xl font-serif font-bold">
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

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <AddToCartButton product={product} />

              <Button asChild size="lg" variant="outline">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </a>
              </Button>
            </div>

            {/* TRUST BADGES */}
            <Card>
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pay when you receive
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">
                      Fast Delivery
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      1–3 working days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* REVIEWS */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Customer Reviews
              </h2>
              <ReviewList productId={product.id} />
              <ReviewForm productId={product.id} />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}