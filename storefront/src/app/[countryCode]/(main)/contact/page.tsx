import { Metadata } from "next"
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | EV Service",
  description:
    "Neem contact op met EV Service voor advies over laadkabels, laadpalen en installatie.",
}

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: "Bel ons",
      value: "+31 (0)85 - 0479240",
      meta: "Ma t/m vr 09:00 – 17:00",
      href: "tel:+31850479240",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "klantenservice@evservice.eu",
      meta: "Reactie binnen 1 werkdag",
      href: "mailto:klantenservice@evservice.eu",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Stuur direct een bericht",
      meta: "Snelste route naar antwoord",
      href: "https://wa.me/31850479240",
    },
  ]

  return (
    <div className="bg-white">
      <div className="content-container py-6 sm:py-10">
        <header className="mb-8 max-w-[640px]">
          <span className="eyebrow">Contact</span>
          <h1 className="display-lg mt-1 text-text-base">Neem contact op</h1>
          <p className="lede mt-2.5">
            Vragen over een product, installatie of bestelling? Wij helpen je
            graag persoonlijk verder.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Channels */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group surface-card p-5 hover:border-jade/40 hover:shadow-sm transition-all"
              >
                <span className="inline-flex w-9 h-9 rounded-md bg-jade/10 text-jade items-center justify-center mb-3">
                  <c.icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <p className="eyebrow-muted">{c.label}</p>
                <p className="text-[14.5px] font-semibold text-text-base mt-1 group-hover:text-jade transition-colors">
                  {c.value}
                </p>
                <p className="text-[12.5px] text-text-muted mt-1">{c.meta}</p>
              </a>
            ))}

            <div className="surface-panel p-5 sm:col-span-2">
              <div className="flex items-start gap-3">
                <span className="inline-flex w-9 h-9 rounded-md bg-white border border-border-soft text-jade items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="eyebrow-muted">Openingstijden</p>
                  <p className="text-[13.5px] text-text-base mt-1">
                    Maandag t/m vrijdag — 09:00 tot 17:00
                  </p>
                  <p className="text-[12.5px] text-text-muted mt-0.5">
                    Buiten kantoortijden? Stuur ons gerust een e-mail of
                    WhatsApp-bericht.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar info */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="surface-card p-5">
              <p className="eyebrow-muted">Adres</p>
              <div className="flex items-start gap-3 mt-2">
                <MapPin className="w-4 h-4 text-jade flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="text-[13.5px] text-text-base leading-relaxed">
                  EV Service
                  <br />
                  Nederland
                </div>
              </div>
            </div>

            <div className="surface-card p-5">
              <p className="eyebrow-muted">Liever zelf zoeken?</p>
              <p className="text-[13px] text-text-muted mt-1.5">
                Onze klantenservice biedt antwoorden op de meeste vragen.
              </p>
              <a href="/klantenservice" className="btn-link mt-3">
                Naar klantenservice
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="surface-card p-5">
              <p className="eyebrow-muted">Offerte aanvragen</p>
              <p className="text-[13px] text-text-muted mt-1.5">
                Plan direct een installatie of vraag een vrijblijvende offerte
                aan.
              </p>
              <a href="/offerte-aanvragen" className="btn-primary mt-3 inline-flex">
                Vraag offerte aan
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
