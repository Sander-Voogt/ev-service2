import Link from "next/link"
import Script from "next/script"
import { ChevronRight, Phone, Mail, Clock } from "lucide-react"

export default function Offerte() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#0f1d24] text-white">
        <div className="content-container py-10 sm:py-14">
          <div className="max-w-[640px]">
            <span className="eyebrow text-[#B0CB31]">Offerte</span>
            <h1 className="display-lg mt-1 text-white">Vraag je offerte aan</h1>
            <p className="lede mt-2.5 text-white/75">
              Vul het formulier in en ontvang binnen 24 uur een vrijblijvende
              offerte op maat.
            </p>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="border-b border-border-soft bg-white">
        <div className="content-container py-5">
          <div className="grid sm:grid-cols-3 gap-3">
            <a
              href="tel:+31850479240"
              className="flex items-center gap-3 surface-panel p-3.5 hover:border-jade/40 hover:bg-white transition-all"
            >
              <span className="w-9 h-9 rounded-md bg-jade/10 text-jade flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[11.5px] uppercase tracking-wider font-semibold text-text-muted">
                  Bel ons
                </p>
                <p className="text-[13.5px] font-semibold text-text-base truncate">
                  +31 (0)85 - 0479240
                </p>
              </div>
            </a>
            <a
              href="mailto:info@evservice.eu"
              className="flex items-center gap-3 surface-panel p-3.5 hover:border-jade/40 hover:bg-white transition-all"
            >
              <span className="w-9 h-9 rounded-md bg-jade/10 text-jade flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[11.5px] uppercase tracking-wider font-semibold text-text-muted">
                  E-mail
                </p>
                <p className="text-[13.5px] font-semibold text-text-base truncate">
                  info@evservice.eu
                </p>
              </div>
            </a>
            <div className="flex items-center gap-3 surface-panel p-3.5">
              <span className="w-9 h-9 rounded-md bg-jade/10 text-jade flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[11.5px] uppercase tracking-wider font-semibold text-text-muted">
                  Reactietijd
                </p>
                <p className="text-[13.5px] font-semibold text-text-base">
                  Binnen 24 uur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="content-container py-8 sm:py-10">
        <div className="surface-card overflow-hidden">
          <iframe
            id="markt-parasolnl-offerte-aanvraag-hfhk31"
            src="https://form.evservice.eu/forms/ev-service-offerte-3pstb8"
            style={{ border: "none", width: "100%", minHeight: "1400px" }}
          />
        </div>
      </section>

      {/* Info cards */}
      <section className="bg-page-soft border-t border-border-soft">
        <div className="content-container section-pad">
          <div className="max-w-[640px] mb-6">
            <span className="eyebrow">Mogelijkheden</span>
            <h2 className="display-md mt-1.5 text-text-base">
              Wat kunnen we voor je betekenen?
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                title: "Laadpalen voor thuis",
                desc: "De juiste laadpaal voor jouw woonsituatie.",
              },
              {
                title: "Zakelijke laadoplossingen",
                desc: "Complete infrastructuur voor jouw bedrijf.",
              },
              {
                title: "Advies op maat",
                desc: "Persoonlijk advies van onze specialisten.",
              },
            ].map((item) => (
              <div key={item.title} className="surface-card p-5">
                <h3 className="text-[14px] font-semibold text-text-base">
                  {item.title}
                </h3>
                <p className="text-[13px] text-text-muted mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
                <Link
                  href="/installatie-service"
                  className="btn-link text-[12.5px] mt-3"
                >
                  Meer informatie
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Script
        src="https://form.evservice.eu/widgets/iframe.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).initEmbed) {
            ;(window as any).initEmbed("markt-parasolnl-offerte-aanvraag-hfhk31")
          }
        }}
      />
    </div>
  )
}
