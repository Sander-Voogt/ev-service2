import Link from "next/link"
import {
  Wrench,
  Users,
  Zap,
  Settings,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function Page() {
  const services = [
    {
      icon: Zap,
      title: "Advies bij ontwerp",
      desc: "Deskundig advies over het opzetten van laadinfrastructuur voor VvE's, bedrijfspanden en openbare laadpleinen.",
      features: ["Stroomaansluiting analyse", "Smart charging advies", "Load balancing ontwerp"],
    },
    {
      icon: Settings,
      title: "Voorgeconfigureerde laadpalen",
      desc: "We leveren laadpunten klaar voor installatie, zodat je alleen de elektrische installatie hoeft uit te voeren.",
      features: ["Klaar voor installatie", "Configuratieondersteuning", "Hulp bij inbedrijfstelling"],
    },
    {
      icon: Headphones,
      title: "Backoffice support",
      desc: "Via onze backoffice monitoren we de laadpalen en lossen we problemen op afstand op.",
      features: ["Kostenverrekening", "Probleemoplossing op afstand", "Jouw klant blijft jouw klant"],
    },
    {
      icon: Users,
      title: "Servicepunt voor installateurs",
      desc: "Voor installateurs bieden we ondersteunende diensten — van connectiviteit tot vrijblijvend advies.",
      features: ["Connectiviteit met backoffice", "Beheer en monitoring", "Vrijblijvend adviesgesprek"],
    },
  ]

  const reasons = [
    { title: "Alle kennis onder één dak", desc: "Diepgaande technische expertise voor complexe configuraties." },
    { title: "Onafhankelijk partner", desc: "We kiezen de beste oplossing — los van merkvoorkeur." },
    { title: "Jouw klant blijft jouw klant", desc: "Wij ondersteunen op de achtergrond, zonder tussenkomst." },
    { title: "Persoonlijk contact", desc: "Eén vast aanspreekpunt voor al je vragen." },
  ]

  return (
    <div className="bg-white">
      <section className="bg-[#0f1d24] text-white">
        <div className="content-container py-10 sm:py-14">
          <div className="max-w-[640px]">
            <span className="eyebrow text-[#B0CB31]">Voor installateurs</span>
            <h1 className="display-lg mt-1 text-white">
              Samen werken aan de laadinfrastructuur van morgen
            </h1>
            <p className="lede mt-2.5 text-white/75">
              Als elektricien of installateur heb je een cruciale rol. Wij
              ondersteunen je waar nodig — van ontwerp tot oplevering.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Link href="/contact" className="btn-primary">
                Neem contact op
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="surface-panel p-6 sm:p-8 max-w-[760px] mx-auto">
          <h2 className="display-sm text-text-base">
            Ondersteuning voor installateurs
          </h2>
          <p className="text-[14px] text-text-muted leading-relaxed mt-3">
            Bij EV Service begrijpen we de uitdagingen waar installateurs mee
            te maken krijgen. Daarom bieden we ondersteunende diensten om je
            werk te vereenvoudigen en projecten tot een succes te maken.
          </p>
          <p className="text-[14px] text-text-muted leading-relaxed mt-2.5">
            Of je nu één laadpunt installeert of een volledig laadplein
            realiseert: wij hebben de kennis om je te begeleiden.
          </p>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="max-w-[640px] mb-6">
          <span className="eyebrow">Diensten</span>
          <h2 className="display-md mt-1.5 text-text-base">
            Onze diensten voor installateurs
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
              <span className="eyebrow">Onze aanpak</span>
              <h2 className="display-md mt-1.5 text-text-base mb-5">
                Waarom EV Service?
              </h2>
              <ul className="space-y-3">
                {reasons.map((r) => (
                  <li key={r.title} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-md bg-white border border-border-soft text-jade flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="text-[14px] font-semibold text-text-base">
                        {r.title}
                      </h3>
                      <p className="text-[13px] text-text-muted mt-0.5">
                        {r.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="surface-dark p-6">
                <Wrench className="w-7 h-7 text-[#B0CB31]" strokeWidth={1.5} />
                <h3 className="text-[16px] font-semibold text-white mt-3">
                  Samen groeien
                </h3>
                <p className="text-[13.5px] text-white/70 mt-1.5 leading-relaxed">
                  We zijn toegewijd aan duurzame partnerschappen om elektrisch
                  laden te versnellen.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-jade text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#2a9659] transition-colors mt-4 w-full"
                >
                  Neem contact op
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="surface-card p-6 sm:p-8 text-center max-w-[760px] mx-auto">
          <h2 className="display-md text-text-base">Klaar om samen te werken?</h2>
          <p className="text-[14px] text-text-muted mt-2 max-w-[480px] mx-auto">
            Neem contact op voor een vrijblijvend gesprek en ontdek hoe wij je
            installatieprojecten kunnen ondersteunen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <Link href="/contact" className="btn-primary">
              Contact opnemen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/offerte-aanvragen" className="btn-secondary">
              Project aanmelden
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
