"use server"

import { createClient } from "@/lib/supabase/server"

export async function addProduct(productData: any) {
  const supabase = await createClient()

  const { error } = await supabase.from("products").insert(productData)

  if (error) {
    console.error("ADD PRODUCT ERROR:", error)
    throw error
  }
}