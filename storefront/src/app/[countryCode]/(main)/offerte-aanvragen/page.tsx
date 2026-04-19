import Link from "next/link"
import Script from "next/script"
import { FileText, ChevronRight, Phone, Mail } from "lucide-react"

export default function Offerte() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-8 shadow-2xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Offerte Aanvragen
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Vul het formulier in en ontvang binnen 24 uur een vrijblijvende offerte op maat.
          </p>
        </div>
      </section>

      {/* Contact Options Bar */}
      <section className="relative z-20 -mt-8 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-8 grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Bel ons direct</p>
              <a href="tel:+31201234567" className="text-lg font-bold text-gray-900 hover:text-green-700 transition-colors">
                +31 20 123 4567
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-7 h-7 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">E-mail ons</p>
              <a href="mailto:info@evservice.eu" className="text-lg font-bold text-gray-900 hover:text-green-700 transition-colors">
                info@evservice.eu
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Reactietijd</p>
              <p className="text-lg font-bold text-gray-900">
                Binnen 24 uur
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="content-container py-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <iframe
            id="markt-parasolnl-offerte-aanvraag-hfhk31"
            src="https://form.evservice.eu/forms/ev-service-offerte-3pstb8"
            style={{ border: "none", width: "100%", minHeight: "1400px" }}
          />
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Wat kunnen we voor u betekenen?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Laadpalen voor thuis",
                desc: "Vind de perfecte laadpaal voor uw situatie"
              },
              {
                title: "Zakelijke laadoplossingen",
                desc: "Complete infrastructuur voor uw bedrijf"
              },
              {
                title: "Advies op maat",
                desc: "Persoonlijk advies van onze experts"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.desc}</p>
                <Link
                  href="/installatie-service"
                  className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors"
                >
                  Meer informatie
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Script initialization */}
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
