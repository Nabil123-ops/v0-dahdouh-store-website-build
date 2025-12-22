export const dynamic = "force-dynamic"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const ADMIN_EMAIL = "admin@dahdouhai.live" // ✅ admin email

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 🔐 Protect admin page
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/auth/login")
  }

  const { count: productsCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })

  const { count: ordersCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border/40 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="font-serif text-xl font-bold text-primary-foreground">
                  D
                </span>
              </div>
              <span className="font-serif text-xl font-bold">
                DahdouhStore Admin
              </span>
            </Link>

            <nav className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/">View Store</Link>
              </Button>
              <form action="/api/auth/signout" method="POST">
                <Button type="submit" variant="outline">
                  Sign Out
                </Button>
              </form>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 font-serif text-3xl font-bold">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user.email}
            </p>
          </div>

          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {productsCount ?? 0}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ordersCount ?? 0}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0.00</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Customers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button asChild>
                  <Link href="/admin/products">Manage Products</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/orders">View Orders</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/categories">
                    Manage Categories
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {recentOrders && recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0"
                      >
                        <div>
                          <p className="font-medium">
                            {order.customer_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${order.total_amount}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No orders yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}