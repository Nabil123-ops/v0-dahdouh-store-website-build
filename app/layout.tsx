import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { CartProvider } from "@/components/CartContext"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

/* -----------------------------
   FONTS (OPTIMIZED)
----------------------------- */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

/* -----------------------------
   GLOBAL METADATA (BASE)
   Individual pages override it
----------------------------- */
export const metadata: Metadata = {
  title: {
    default: "SmartShop – Premium Online Store",
    template: "%s | SmartShop",
  },
  description:
    "SmartShop offers premium electronics, fashion, beauty, home essentials and more. Cash on Delivery available with fast delivery.",
  keywords: [
    "smartshop",
    "online store",
    "electronics",
    "fashion",
    "beauty",
    "home",
    "cash on delivery",
    "lebanon online store",
  ],
  metadataBase: new URL("https://smartshop.lb"),
  openGraph: {
    type: "website",
    siteName: "SmartShop",
    title: "SmartShop – Premium Online Store",
    description:
      "Shop premium products with Cash on Delivery and fast shipping.",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

/* -----------------------------
   ROOT LAYOUT
----------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${playfair.variable}
          font-sans
          antialiased
          min-h-screen
          bg-background
          text-foreground
        `}
      >
        {/* GLOBAL STATE (CART, FUTURE AUTH, ADMIN) */}
        <CartProvider>
          {children}
        </CartProvider>

        {/* TOAST NOTIFICATIONS */}
        <Toaster />

        {/* ANALYTICS */}
        <Analytics />
      </body>
    </html>
  )
}