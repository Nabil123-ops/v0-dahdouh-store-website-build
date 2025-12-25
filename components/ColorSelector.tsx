"use client"

type Color = {
  name: string
  hex: string
}

export default function ColorSelector({
  colors,
}: {
  colors: unknown
}) {
  // ✅ SAFETY FIX (THIS STOPS THE CRASH)
  if (!Array.isArray(colors)) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Available Colors</p>

      <div className="flex gap-2 flex-wrap">
        {colors.map((color: Color, i: number) => (
          <div
            key={i}
            title={color.name}
            className="h-8 w-8 rounded-full border cursor-pointer"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  )
}