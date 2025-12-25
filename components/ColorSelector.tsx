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
  if (!colors || colors.length === 0) return null

  return (
    <div>
      <p className="mb-2 font-medium">Choose Color</p>

      <div className="flex gap-3">
        {colors.map(color => (
          <button
            key={color.name}
            onClick={() => onSelect(color)}
            title={color.name}
            className={`h-8 w-8 rounded-full border-2 transition
              ${
                selected === color.name
                  ? "border-black scale-110"
                  : "border-muted"
              }
            `}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      {selected && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected: <strong>{selected}</strong>
        </p>
      )}
    </div>
  )
}