"use client"

type Color = {
  name: string
  hex: string
}

export default function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: Color[]
  selected: string | null
  onSelect: (color: Color) => void
}) {
  if (!Array.isArray(colors) || colors.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Available Colors</p>

      <div className="flex gap-2 flex-wrap">
        {colors.map((color, i) => {
          const isSelected = selected === color.name

          return (
            <button
              key={i}
              type="button"
              title={color.name}
              onClick={() => onSelect(color)}
              className={`h-8 w-8 rounded-full border-2 transition
                ${isSelected ? "border-primary scale-110" : "border-muted"}
              `}
              style={{ backgroundColor: color.hex }}
            />
          )
        })}
      </div>
    </div>
  )
}
