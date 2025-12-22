import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold">DahdouhStore</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted local online store for quality products. We deliver excellence to your doorstep.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-muted-foreground hover:text-foreground">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/electronics" className="text-muted-foreground hover:text-foreground">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="text-muted-foreground hover:text-foreground">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/category/beauty-health" className="text-muted-foreground hover:text-foreground">
                  Beauty & Health
                </Link>
              </li>
              <li>
                <Link href="/category/home-living" className="text-muted-foreground hover:text-foreground">
                  Home & Living
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="https://wa.me/96176914627" className="hover:text-foreground">
                  +961 76 914 627
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@dahdouhai.live" className="hover:text-foreground">
                  info@dahdouhai.live
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Lebanon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DahdouhStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
