import { sdk } from "@lib/config"
import Link from "next/link"
import {
  Car,
  Zap,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react"

type Brand = {
  id: string
  name: string
  image?: string
  description?: string
}
type ApiResponse = { brands: Brand[] }

export default async function CarIndexPage() {
  const data: ApiResponse = await sdk.client.fetch(`/store/carbrand?limit=100`)

  const features = [
    { icon: Truck, text: "Snelle levering" },
    { icon: ShieldCheck, text: "2 jaar garantie" },
    { icon: Zap, text: "Vakkundig advies" },
    { icon: Car, text: "Passend bij elk merk" },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#0f1d24] text-white">
        <div className="content-container py-10 sm:py-14">
          <div className="max-w-[640px]">
            <span className="eyebrow text-[#B0CB31]">Auto-selectie</span>
            <h1 className="display-lg mt-1 text-white">Alle automerken</h1>
            <p className="lede mt-2.5 text-white/75">
              Selecteer jouw automerk en ontdek de juiste laadkabels, laadpalen
              en accessoires.
            </p>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-b border-border-soft bg-white">
        <div className="content-container py-4">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
            {features.map((f) => (
              <li key={f.text} className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-md bg-jade/10 text-jade flex items-center justify-center">
                  <f.icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span className="text-[13px] font-medium text-text-base">
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brand grid */}
      <section className="content-container section-pad">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="eyebrow">Automerken</span>
            <h2 className="display-md mt-1 text-text-base">Kies jouw merk</h2>
          </div>
          <p className="text-[12.5px] text-text-muted hidden sm:block">
            {data.brands.length} merken beschikbaar
          </p>
        </div>

        <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {data.brands.map((brand) => (
            <li key={brand.id}>
              <Link
                href={`/auto/${brand.name.toLowerCase()}`}
                className="group block surface-card p-3 hover:border-jade/40 hover:shadow-sm transition-all"
              >
                <div className="aspect-square bg-page-soft rounded-md flex items-center justify-center p-3 mb-2 overflow-hidden">
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Car className="w-7 h-7 text-[#a5b3bb]" strokeWidth={1.5} />
                  )}
                </div>
                <p className="text-[12.5px] font-medium text-text-base text-center group-hover:text-jade transition-colors truncate">
                  {brand.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-page-soft border-t border-border-soft">
        <div className="content-container section-pad">
          <div className="surface-card p-6 sm:p-8 text-center max-w-[640px] mx-auto">
            <span className="eyebrow">Hulp nodig?</span>
            <h2 className="display-sm mt-1.5 text-text-base">
              Niet zeker welk product bij jouw auto past?
            </h2>
            <p className="text-[14px] text-text-muted mt-2 max-w-[480px] mx-auto">
              Onze specialisten helpen je graag met persoonlijk advies voor de
              juiste laadoplossing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <Link href="/contact" className="btn-primary">
                Neem contact op
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blog" className="btn-secondary">
                Bekijk onze gidsen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
