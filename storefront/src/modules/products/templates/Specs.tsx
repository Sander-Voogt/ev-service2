import { hasNotValue } from "./Procon"

/** Multi-value velden komen als string[] uit de admin; overige specs als string/number. */
function specValueToItems(value: unknown): string[] {
  if (value == null || value === "") return []
  if (Array.isArray(value)) {
    return value
      .map((v) => (typeof v === "string" ? v.trim() : String(v)))
      .filter(Boolean)
  }
  if (typeof value === "string") {
    const t = value.trim()
    return t ? [t] : []
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return [String(value)]
  }
  return []
}

export function Specs({ data }: { data: Record<string, unknown> }) {
  if(hasNotValue(data, "soort_kabel") && hasNotValue(data, "certificering") && hasNotValue(data, "waterbestendigheid")){
      return null;
    }
  return (
    <div className="h-full">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white sm:text-xl">
        Specificaties
      </h2>
      <ul className="text-left text-sm text-gray-700 dark:text-gray-300 sm:text-base">
        <SpecRow data={data} label="Certificering" itemkey="certificering" />
        <SpecRow data={data} label="Garantie" itemkey="garantie" />
        <SpecRow data={data} label="Geadviseerd voor" itemkey="geadviseerd_voor" />
        <SpecRow data={data} label="Gewicht" itemkey="gewicht" />
        <SpecRow data={data} label="Kabel lengte" itemkey="kabel_lengte" />
        <SpecRow data={data} label="Laadvermogen" itemkey="laadvermogen" />
        <SpecRow data={data} label="Lengte" itemkey="lengte" />
        <SpecRow data={data} label="Maximaal laadvermogen" itemkey="maximaal_laadvermogen" />
        <SpecRow data={data} label="Opties" itemkey="opties" />
        <SpecRow data={data} label="Soort" itemkey="soort" />
        <SpecRow data={data} label="Soort kabel" itemkey="soort_kabel" />
        <SpecRow data={data} label="Soort lader" itemkey="soort_lader" />
        <SpecRow data={data} label="Soort stekker" itemkey="stekker" />
        <SpecRow data={data} label="Type stekker" itemkey="type_Stekker" />
        <SpecRow data={data} label="Vermogen" itemkey="vermogen" />
        <SpecRow data={data} label="Waterbestendigheid" itemkey="waterbestendigheid" />
      </ul>
    </div>
  )
}

function SpecRow({
  data,
  label,
  itemkey,
}: {
  data: Record<string, unknown>
  label: string
  itemkey: string
}) {
  if (hasNotValue(data, itemkey)) {
    return null
  }
  const items = specValueToItems(data[itemkey])
  if (items.length === 0) {
    return null
  }

  return (
    <li className="border-b border-gray-100 py-3 last:border-0 dark:border-gray-800 sm:py-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
        <span className="shrink-0 font-medium text-gray-900 dark:text-gray-100 sm:w-40">
          {label}
        </span>
        <div className="min-w-0 flex-1 text-gray-600 dark:text-gray-400">
          {items.length === 1 ? (
            <span className="block leading-relaxed">{items[0]}</span>
          ) : (
            <ul className="list-disc space-y-1.5 pl-5 marker:text-gray-400 dark:marker:text-gray-500">
              {items.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  )
}
