import { BUSINESS_TYPE_OPTIONS } from "@/lib/intake/schema"
import { TileSelect } from "./tile-select"
import { OtherBusinessCombobox } from "./other-business-combobox"

const STANDARD_VALUES = new Set(
  BUSINESS_TYPE_OPTIONS.filter((o) => o.value !== "other").map((o) => o.value)
)

type Props = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function BusinessTypeField({ value, onChange, error }: Props) {
  // "Other" is active when value is the sentinel OR any custom string not in the standard list
  const isOther = value !== "" && !STANDARD_VALUES.has(value)
  const tileValue = isOther ? "other" : value

  function handleTileChange(v: string) {
    if (v === "other") {
      // Sentinel: show combobox, require user to fill it in
      onChange("other")
    } else {
      onChange(v)
    }
  }

  return (
    <div className="space-y-3">
      <TileSelect
        options={BUSINESS_TYPE_OPTIONS}
        value={tileValue}
        onChange={handleTileChange}
        cols={3}
        // Only show tile-level error when Other is not active
        error={!isOther ? error : undefined}
      />

      {isOther && (
        <OtherBusinessCombobox
          // Pass empty string while sentinel so combobox starts blank
          value={value === "other" ? "" : value}
          onChange={onChange}
          // Show error on combobox only when still on the sentinel (nothing typed)
          error={value === "other" ? error : undefined}
        />
      )}
    </div>
  )
}
