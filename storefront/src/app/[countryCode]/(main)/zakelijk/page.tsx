import Link from "next/link"
import {
  Building2,
  Users,
  Zap,
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function Page() {
  const services = [
    { icon: Building2, title: "Laadpalen voor bedrijven", desc: "Van enkele paal tot compleet laadplein." },
    { icon: Users, title: "VvE oplossingen", desc: "Collectief laden voor appartementencomplexen." },
    { icon: Zap, title: "Smart Charging", desc: "Optimaal gebruik van je stroomaansluiting." },
    { icon: TrendingUp, title: "Load Balancing", desc: "Voorkom overbelasting van je netvoeding." },
    { icon: ShieldCheck, title: "Backoffice beheer", desc: "Complete monitoring en kostenverrekening." },
    { icon: Award, title: "Maatwerk oplossingen", desc: "Advies op maat voor jouw situatie." },
  ]

  const benefits = [
    "Toekomstbestendige laadinfrastructuur",
    "Schaalbare oplossingen die meegroeien",
    "Ondersteuning bij subsidieaanvragen",
    "Kostenbesparing door slim laden",
  ]

  return (
    <div className="bg-white">
      <section className="bg-[#0f1d24] text-white">
        <div className="content-container py-10 sm:py-14">
          <div className="max-w-[640px]">
            <span className="eyebrow text-[#B0CB31]">Zakelijk</span>
            <h1 className="display-lg mt-1 text-white">
              Laadinfrastructuur voor op de zaak
            </h1>
            <p className="lede mt-2.5 text-white/75">
              Complete laadoplossingen voor bedrijven, van ontwerp tot
              oplevering en beheer.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Link href="/offerte-aanvragen" className="btn-primary">
                Offerte aanvragen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/installatie-service"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2.5 rounded-md border border-white/20 hover:bg-white/15 transition-colors"
              >
                Bekijk diensten
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="surface-panel p-6 sm:p-8 max-w-[760px] mx-auto">
          <h2 className="display-sm text-text-base">
            Alles voor elektrisch laden op je bedrijfslocatie
          </h2>
          <p className="text-[14px] text-text-muted leading-relaxed mt-3">
            EV Service heeft alles in huis voor het laden van elektrische
            voertuigen. Met de toenemende vraag naar laadinfrastructuur is het
            belangrijk dat ook jouw organisatie klaar is voor de toekomst.
          </p>
          <p className="text-[14px] text-text-muted leading-relaxed mt-2.5">
            Ons assortiment is samengesteld op basis van kwaliteit en
            duurzaamheid. Je kunt zowel voor als na je aankoop bij ons terecht
            voor advies, technische ondersteuning en onderhoud.
          </p>
        </div>
      </section>

      <section className="content-container section-pad">
        <div className="max-w-[640px] mb-6">
          <span className="eyebrow">Diensten</span>
          <h2 className="display-md mt-1.5 text-text-base">
            Onze zakelijke diensten
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((s) => (
            <div key={s.title} className="surface-card p-5">
              <span className="inline-flex w-9 h-9 rounded-md bg-jade/10 text-jade items-center justify-center mb-3">
                <s.icon className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <h3 className="text-[14.5px] font-semibold text-text-base">
                {s.title}
              </h3>
              <p className="text-[13px] text-text-muted leading-relaxed mt-1.5">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-page-soft border-y border-border-soft">
        <div className="content-container section-pad">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Voordelen</span>
              <h2 className="display-md mt-1.5 text-text-base mb-4">
                Voorbereid op de toekomst
              </h2>
              <p className="text-[14px] text-text-muted leading-relaxed mb-4">
                De transitie naar elektrisch rijden gaat snel. Of je nu
                laadpalen wilt voor medewerkers, bezoekers of je wagenpark — we
                leveren de juiste oplossing.
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
              <div className="surface-dark p-6">
                <h3 className="text-[16px] font-semibold text-white">
                  Direct contact?
                </h3>
                <p className="text-[13.5px] text-white/70 mt-1.5 leading-relaxed">
                  Onze experts staan voor je klaar om je vragen te beantwoorden.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-jade text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#2a9659] transition-colors mt-4"
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
          <h2 className="display-md text-text-base">
            Klaar voor de volgende stap?
          </h2>
          <p className="text-[14px] text-text-muted mt-2 max-w-[480px] mx-auto">
            Vraag een vrijblijvende offerte aan en ontdek wat wij voor jouw
            bedrijf kunnen betekenen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <Link href="/offerte-aanvragen" className="btn-primary">
              Offerte aanvragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/installatie-service" className="btn-secondary">
              Meer informatie
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
