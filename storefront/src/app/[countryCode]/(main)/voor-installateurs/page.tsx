import Link from "next/link"
import { Wrench, Users, Zap, Settings, HeadphonesIcon as Headset, CheckCircle, Award, ChevronRight } from "lucide-react"

export default function Page() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-8 shadow-2xl">
            <Wrench className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            EV Service:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
              voor installateurs
            </span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Als elektricien of installateur heeft u een cruciale rol in de groei van elektrisch laden in Nederland. Wij ondersteunen u waar nodig.
          </p>
          <Link
            href="/klantenservice"
            className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
          >
            Neem contact op
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="content-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Samen werken aan de laadinfrastructuur van morgen
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Bij EV Service begrijpen we de uitdagingen waar installateurs mee te maken krijgen. Daarom bieden we een scala aan ondersteunende diensten om uw werk te vereenvoudigen en uw projecten tot een succes te maken.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Of u nu één laadpunt installeert of een volledig laadplein realiseert, wij hebben de knowhow om u te begeleiden van ontwerp tot oplevering.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="content-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Onze Diensten voor Installateurs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Volledige ondersteuning voor uw installatieprojecten
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Zap,
              title: "Advies bij ontwerp",
              desc: "Deskundig advies over het opzetten van laadinfrastructuur. Wij helpen bij het ontwerp en implementatie van laadpaaloplossingen voor VvE's, bedrijfspanden en openbare laadpleinen.",
              color: "from-amber-500 to-orange-600",
              features: ["Stroomaansluiting analyse", "Smart charging advies", "Load balancing ontwerp"]
            },
            {
              icon: Settings,
              title: "Voorgeconfigureerde laadpalen",
              desc: "Wilt u volledig voorgeconfigureerde laadpalen aanschaffen? Wij leveren laadpunten die klaar zijn voor installatie, zodat u alleen de elektrische installatie hoeft uit te voeren.",
              color: "from-blue-500 to-indigo-600",
              features: ["Klaar voor installatie", "Uitgebreide configuratieondersteuning", "Hulp bij inbedrijfstelling"]
            },
            {
              icon: Headset,
              title: "Backoffice support",
              desc: "Laat uw klanten gebruik maken van laadpassen om de elektriciteitskosten te verrekenen. Via onze backoffice monitoren we de laadpalen en lossen we problemen op afstand.",
              color: "from-green-500 to-emerald-600",
              features: ["Kostenverrekening", "Probleemoplossing op afstand", "Jouw klant blijft jouw klant"]
            },
            {
              icon: Users,
              title: "Servicepunt voor installateurs",
              desc: "Voor installateurs bieden we speciale ondersteunende diensten. Als u de installatie kunt verzorgen maar hulp nodig hebt bij de volledige oplevering, staan wij tot uw dienst.",
              color: "from-purple-500 to-pink-600",
              features: ["Connectiviteit met backoffice", "Beheer en monitoring", "Vrijblijvend adviesgesprek"]
            }
          ].map((service, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className="relative p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8">
                Waarom EV Service?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Alle kennis onder één dak",
                    desc: "Diepgaande technische expertise voor complexe configuraties en elektrotechnische installaties"
                  },
                  {
                    title: "Onafhankelijk partner",
                    desc: "We kiezen de beste oplossing, los van merkvoorkeur, om te voldoen aan jouw specifieke behoeften"
                  },
                  {
                    title: "Jouw klant blijft jouw klant",
                    desc: "Wij ondersteunen op de achtergrond, zonder tussenkomst in jouw klantrelatie"
                  },
                  {
                    title: "Persoonlijk contact",
                    desc: "Eén vast aanspreekpunt dat altijd klaar staat voor persoonlijke ondersteuning"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-10 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <Award className="w-12 h-12" />
                  <div>
                    <h3 className="text-2xl font-black">Samen groeien</h3>
                    <p className="text-green-100">Wij bouwen aan duurzame partnerschappen</p>
                  </div>
                </div>
                <p className="text-green-100 mb-8 leading-relaxed">
                  Bij EV Service zijn we toegewijd aan het leveren van hoogwaardige diensten en oplossingen om elektrisch laden te vereenvoudigen en te versnellen. Samen creëren we een duurzame en toekomstgerichte laadinfrastructuur voor Nederland.
                </p>
                <Link
                  href="/klantenservice"
                  className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl w-full"
                >
                  Neem contact op
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-container py-16">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-12 lg:p-16 shadow-3xl overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-6">
              Klaar om samen te werken?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Neem contact op voor een vrijblijvend gesprek en ontdek hoe wij uw installatieprojecten kunnen ondersteunen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/klantenservice"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-10 py-5 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                Contact opnemen
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/offerte-aanvragen"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Project aanmelden
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
