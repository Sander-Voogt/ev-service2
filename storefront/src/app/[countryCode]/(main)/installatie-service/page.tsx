import Link from "next/link"
import {
  Lightbulb,
  Wrench,
  Settings,
  CheckCircle2,
  ChevronRight,
  Phone,
  ArrowRight,
} from "lucide-react"

export default function EVServicePage() {
  const services = [
    {
      icon: Lightbulb,
      title: "Advies op maat",
      desc: "Begeleiding bij het opzetten van je laadinfrastructuur en optimaal gebruik van Smart Charging.",
      features: ["Gratis locatiescan", "Load balancing advies", "Subsidiebegeleiding"],
    },
    {
      icon: Wrench,
      title: "Installatie",
      desc: "Vakkundige installatie van je laadstations door gecertificeerde installateurs.",
      features: [
        "Gecertificeerde installateurs",
        "2 jaar garantie",
        "Naadloze integratie",
      ],
    },
    {
      icon: Settings,
      title: "Support & beheer",
      desc: "Wij monitoren, onderhouden en ondersteunen je laadinfrastructuur op afstand.",
      features: ["24/7 monitoring", "Proactief onderhoud", "Eén aanspreekpunt"],
    },
  ]

  const reasons = [
    { title: "Alle kennis op één plek", desc: "Van technisch advies tot subsidiebegeleiding." },
    { title: "Eén vast aanspreekpunt", desc: "Persoonlijk contact met dezelfde specialist." },
    { title: "Onafhankelijk advies", desc: "We kiezen de beste oplossing — niet een merk." },
    { title: "Gecertificeerde installateurs", desc: "Vakkundige installatie, kwaliteit gegarandeerd." },
    { title: "Beste after-sales service", desc: "Ook na oplevering staan we voor je klaar." },
  ]

  const stats = [
    { number: "500+", label: "Installaties" },
    { number: "98%", label: "Tevreden klanten" },
    { number: "15+", label: "Jaar ervaring" },
    { number: "24/7", label: "Support" },
  ]

  const faqs = [
    {
      q: "Zijn er subsidies of financiële regelingen beschikbaar?",
      a: "Bedrijven kunnen profiteren van belastingvoordelen zoals KIA en MIA. Sinds 2024 zijn er ook subsidiemogelijkheden beschikbaar voor VvE's.",
    },
    {
      q: "Komen jullie langs om de situatie te meten?",
      a: "Ja, we komen altijd langs om de situatie ter plaatse te beoordelen. Een fysieke inspectie is essentieel voor nauwkeurig advies.",
    },
    {
      q: "Helpen jullie met een laadplan voor mijn bedrijf?",
      a: "Ja, we helpen bij het opstellen van een laadbeleid dat past bij jouw bedrijfs- of VvE-behoeften, inclusief kostenverdeling.",
    },
    {
      q: "Wat is jullie werkgebied?",
      a: "Voornamelijk de Randstad (Amsterdam, Utrecht, Rotterdam). Voor interessante projecten kijken we daar buiten.",
    },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#0f1d24] text-white">
        <div className="content-container py-10 sm:py-14">
          <div className="max-w-[640px]">
            <span className="eyebrow text-[#B0CB31]">Installatie service</span>
            <h1 className="display-lg mt-1 text-white">
              Laadoplossingen voor bedrijven &amp; VvE's
            </h1>
            <p className="lede mt-2.5 text-white/75">
              Load balancing en Smart Charging voor jouw laadinfrastructuur. Van
              advies tot installatie en beheer.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              <Link href="/offerte-aanvragen" className="btn-primary">
                Offerte aanvragen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+31850479240"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2.5 rounded-md border border-white/20 hover:bg-white/15 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Bel direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="content-container section-pad">
        <div className="max-w-[640px] mb-6">
          <span className="eyebrow">Onze services</span>
          <h2 className="display-md mt-1.5 text-text-base">
            Complete ontzorging van A tot Z
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
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

        <div className="mt-6 text-center">
          <Link href="/offerte-aanvragen" className="btn-primary inline-flex">
            Vraag gratis adviesgesprek aan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why us + stats */}
      <section className="bg-page-soft border-y border-border-soft">
        <div className="content-container section-pad">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <span className="eyebrow">Onze aanpak</span>
              <h2 className="display-md mt-1.5 text-text-base mb-5">
                Waarom kiezen voor EV Service?
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
              <div className="surface-card p-5">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="p-3 rounded-md bg-page-soft">
                      <div className="text-[24px] font-semibold text-text-base tracking-tight">
                        {s.number}
                      </div>
                      <div className="text-[12px] text-text-muted mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="content-container section-pad">
        <div className="max-w-[760px]">
          <span className="eyebrow">Over de service</span>
          <h2 className="display-md mt-1.5 text-text-base">
            Jouw partner in Smart Charging
          </h2>
          <p className="text-[14px] text-text-muted leading-relaxed mt-3">
            Ben je een zakelijke klant die laadpalen wil plaatsen, of een VvE
            die laadpunten wil implementeren? Wij begeleiden van advies tot
            oplevering. Onze backoffice helpt je vervolgens bij het beheer en
            onderhoud van je laadinfrastructuur.
          </p>
          <div className="surface-panel p-5 mt-5">
            <h3 className="text-[14px] font-semibold text-text-base">
              Meerdere merken laadpalen op één locatie? Dat kan.
            </h3>
            <p className="text-[13px] text-text-muted leading-relaxed mt-1.5">
              We bieden gespecialiseerde smart charging-modules om optimaal
              gebruik te maken van eigen energiebronnen en actieve load
              balancing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0f1d24] text-white">
        <div className="content-container section-pad">
          <div className="max-w-[640px] mb-6">
            <span className="eyebrow text-[#B0CB31]">Veelgestelde vragen</span>
            <h2 className="display-md mt-1.5 text-white">
              Antwoorden op de meest gestelde vragen
            </h2>
          </div>

          <div className="max-w-[760px] space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/[0.03] transition-colors list-none">
                  <span className="text-[14px] font-medium text-white">
                    {faq.q}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#B0CB31] flex-shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pb-4 -mt-1">
                  <p className="text-[13px] text-white/75 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[13.5px] text-white/70 mb-3">
              Niet gevonden wat je zocht?
            </p>
            <Link href="/klantenservice" className="btn-primary inline-flex">
              Neem contact op
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="content-container section-pad">
        <div className="surface-card p-6 sm:p-8 text-center max-w-[760px] mx-auto">
          <span className="eyebrow">Aan de slag</span>
          <h2 className="display-md mt-1.5 text-text-base">
            Klaar om te beginnen?
          </h2>
          <p className="text-[14px] text-text-muted mt-2 max-w-[480px] mx-auto">
            Vraag vandaag een vrijblijvende offerte aan en ontdek wat wij voor
            je kunnen betekenen.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <Link href="/offerte-aanvragen" className="btn-primary">
              Offerte aanvragen
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Eerst even bellen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
