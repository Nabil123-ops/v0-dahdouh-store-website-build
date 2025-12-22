import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "SmartShop – Premium Online Store",
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
  ],
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

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
          snow
        `}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}