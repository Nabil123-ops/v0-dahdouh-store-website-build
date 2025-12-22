import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Truck, Shield, Phone } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").limit(6)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Discover Quality Products Delivered to Your Doorstep
              </h1>
              <p className="mb-8 text-lg text-muted-foreground text-pretty">
                Shop from our curated collection of electronics, fashion, home essentials, and more. Cash on Delivery
                available across Lebanon.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://wa.me/96176914627" target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-5 w-5" />
                    Order via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border/40 bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Quick delivery across Lebanon</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">Cash on Delivery</h3>
                <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Always here to help you</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 text-center">
                <h2 className="mb-3 font-serif text-3xl font-bold">Shop by Category</h2>
                <p className="text-muted-foreground">Explore our diverse range of products</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Link key={category.id} href={`/category/${category.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <CardContent className="p-0">
                        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                          <img
                            src={category.image_url || "/placeholder.svg"}
                            alt={category.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold group-hover:text-primary">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">Ready to Shop?</h2>
            <p className="mb-6 text-primary-foreground/90">Browse our full collection of quality products</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
