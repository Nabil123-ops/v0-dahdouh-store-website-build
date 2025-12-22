"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  useEffect(() => {
    const nav = document.querySelector(".site-nav")
    const onScroll = () => {
      if (!nav) return
      nav.classList.toggle("is-scrolled", window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="site-nav sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="font-serif text-xl font-bold text-primary-foreground">D</span>
            </div>
            <span className="hidden font-serif text-xl font-bold sm:inline-block">
              SmartShop
            </span>
          </Link>

          <div className="flex flex-1 items-center justify-center px-4">
            <form action="/search" method="GET" className="w-full max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:inline-flex"
            >
              <a
                href="https://wa.me/447377279370"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5" />
                <span className="sr-only">Contact us on WhatsApp</span>
              </a>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping cart</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        <nav className="hidden border-t border-border/40 py-3 sm:block">
          <ul className="flex items-center justify-center gap-6 text-sm font-medium">
            <li>
              <Link href="/category/electronics" className="hover:text-primary">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="/category/home-living" className="hover:text-primary">
                Home & Living
              </Link>
            </li>
            <li>
              <Link href="/category/beauty-health" className="hover:text-primary">
                Beauty & Health
              </Link>
            </li>
            <li>
              <Link href="/category/fashion" className="hover:text-primary">
                Fashion
              </Link>
            </li>
            <li>
              <Link href="/category/kids-toys" className="hover:text-primary">
                Kids & Toys
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary">
                All Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}