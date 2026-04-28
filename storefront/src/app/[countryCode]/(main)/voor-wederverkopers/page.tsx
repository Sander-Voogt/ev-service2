import Link from "next/link"
import {
  Store,
  Package,
  Truck,
  Headphones,
  CheckCircle2,
  Award,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

export default function Page() {
  const services = [
    {
      icon: Package,
      title: "Breed assortiment",
      desc: "Hoogwaardige laadpalen en accessoires van alle topmerken.",
      features: ["Alle topmerken", "Compleet assortiment", "Altijd op voorraad"],
    },
    {
      icon: Truck,
      title: "Snelheid & efficiëntie",
      desc: "Snelle verzending, met optie voor next-day delivery.",
      features: ["Next-day delivery", "Direct verzonden", "Track & trace"],
    },
    {
      icon: Store,
      title: "Drop shipping",
      desc: "We verzenden direct naar jouw klanten — geen voorraad nodig.",
      features: ["Geen voorraad nodig", "Direct naar klant", "Minder logistiek"],
    },
    {
      icon: Headphones,
      title: "After sales service",
      desc: "Bij vragen staan wij klaar om jou en je klanten te helpen.",
      features: ["Technische support", "Product training", "Marketingmateriaal"],
    },
  ]

  const benefits = [
    "Technische producttraining",
    "Verkoopondersteuning",
    "Marketingmaterialen",
    "Concurrerende prijzen",
  ]

  const reasons = [
    {
      title: "Sterk partnerschap",
      desc: "Langdurige relaties op basis van vertrouwen en wederzijds succes.",
    },
    {
      title: "Uitgebreide diensten",
      desc: "Van dropshipping tot after-sales support — alles wat je nodig hebt.",
    },
    {
      title: "Toegewijde support",
      desc: "Ons team staat altijd klaar voor vragen of ondersteuning.",
    },
  ]

  return (
    <div className="bg-white">
      <section className="bg-[#0f1d24] text-white">
        <div className="content-container py-10 sm:py-14">
          <div className="max-w-[640px]">
            <span className="eyebrow text-[#B0CB31]">Voor wederverkopers</span>
            <h1 className="display-lg mt-1 text-white">
              Samen groeien in de EV-markt
            </h1>
            <p className="lede mt-2.5 text-white/75">
              Als wederverkoper speel je een essentiële rol in de groei van
              elektrisch laden. Wij ondersteunen jouw succes met assortiment,
              logistiek en service.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Link href="/contact" className="btn-primary">
                Word partner
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="surface-panel p-6 sm:p-8 max-w-[760px] mx-auto">
          <h2 className="display-sm text-text-base">
            Voor jouw succes als wederverkoper
          </h2>
          <p className="text-[14px] text-text-muted leading-relaxed mt-3">
            Bij EV Service bieden we een breed scala aan diensten om jouw
            succes als wederverkoper te ondersteunen. Sterke partnerschappen,
            jouw groei als ons doel.
          </p>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="max-w-[640px] mb-6">
          <span className="eyebrow">Diensten</span>
          <h2 className="display-md mt-1.5 text-text-base">
            Onze diensten voor wederverkopers
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {services.map((s) => (
            <div key={s.title} className="surface-card p-5 sm:p-6">
              <span className="inline-flex w-9 h-9 rounded-md bg-jade/10 text-jade items-center justify-center mb-3">
                <s.icon className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <h3 className="text-[15px] font-semibold text-text-base">
                {s.title}
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed mt-1.5">
                {s.desc}
              </p>
              <ul className="mt-3 space-y-1.5">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-[12.5px] text-text-muted"
                  >
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-jade flex-shrink-0"
                      strokeWidth={2}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-page-soft border-y border-border-soft">
        <div className="content-container section-pad">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <span className="eyebrow">Expertise</span>
              <h2 className="display-md mt-1.5 text-text-base mb-4">
                Deskundig advies & support
              </h2>
              <p className="text-[14px] text-text-muted leading-relaxed mb-4">
                Bij EV Service hebben we jarenlange ervaring in de EV-branche.
                We delen graag onze kennis met jou — technisch advies,
                productinformatie of markttrends.
              </p>
              <ul className="space-y-2.5">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2.5 text-[13.5px] text-text-muted"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-jade flex-shrink-0"
                      strokeWidth={2}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="surface-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-md bg-jade/10 text-jade flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-text-base">
                      Groei met ons mee
                    </h3>
                    <p className="text-[12px] text-text-muted">
                      De EV-markt groeit snel
                    </p>
                  </div>
                </div>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  Als partner profiteer je mee van deze groei met onze
                  ondersteuning.
                </p>
                <Link href="/contact" className="btn-primary mt-4 w-full">
                  Start vandaag
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="max-w-[640px] mb-6">
          <span className="eyebrow">Waarom wij</span>
          <h2 className="display-md mt-1.5 text-text-base">
            Waarom kiezen voor EV Service?
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {reasons.map((r) => (
            <div key={r.title} className="surface-card p-5">
              <span className="inline-flex w-8 h-8 rounded-md bg-jade/10 text-jade items-center justify-center mb-3">
                <Award className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <h3 className="text-[14px] font-semibold text-text-base">
                {r.title}
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed mt-1.5">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0f1d24] text-white">
        <div className="content-container section-pad">
          <div className="text-center max-w-[640px] mx-auto">
            <span className="eyebrow text-[#B0CB31]">Aan de slag</span>
            <h2 className="display-md mt-1.5 text-white">
              Word vandaag wederverkoper
            </h2>
            <p className="text-[14px] text-white/70 mt-2 max-w-[480px] mx-auto">
              Ontdek hoe EV Service jouw bedrijf kan laten groeien in de markt
              voor elektrisch laden.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <Link href="/contact" className="btn-primary">
                Neem contact op
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/offerte-aanvragen"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2.5 rounded-md border border-white/20 hover:bg-white/15 transition-colors"
              >
                Meer informatie
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
