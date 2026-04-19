"use client"
import Script from "next/script"
import Link from "next/link"
import { Lightbulb, Wrench, Settings, CheckCircle, Award, Users, Zap, ChevronRight, Phone } from "lucide-react"

export default function EVServicePage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[550px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-8 shadow-2xl">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Laadoplossingen voor{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
              Bedrijven & VvE's
            </span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Load balancing & Smart Charging voor uw laadinfrastructuur. Van advies tot installatie en beheer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/offerte-aanvragen"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Offerte aanvragen
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+31201234567"
              className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <Phone className="w-5 h-5" />
              Bel ons direct
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="content-container py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Onze Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete ontzorging van A tot Z voor uw laadinfrastructuur
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Advies op Maat",
              desc: "Laat ons je begeleiden bij het opzetten van uw laadinfrastructuur en ontdek hoe u Smart Charging optimaal benut.",
              icon: Lightbulb,
              color: "from-amber-500 to-orange-600",
              features: ["Gratis locatiescan", "Load balancing advies", "Subsidie begeleiding"]
            },
            {
              title: "Installatie",
              desc: "Vertrouw op onze expertise bij de installatie van uw laadstations. Wij werken samen met gecertificeerde installateurs.",
              icon: Wrench,
              color: "from-blue-500 to-indigo-600",
              features: ["Gecertificeerde installateurs", "2 jaar garantie", "Naadloze integratie"]
            },
            {
              title: "Support & Beheer",
              desc: "Kies voor gemoedsrust met onze supportdienst. Wij monitoren, onderhouden en ondersteunen op afstand.",
              icon: Settings,
              color: "from-green-500 to-emerald-600",
              features: ["24/7 monitoring", "Proactief onderhoud", "Eén aanspreekpunt"]
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

        <div className="text-center mt-12">
          <Link
            href="/offerte-aanvragen"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Vraag gratis adviesgesprek aan
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-20">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
                Waarom kiezen voor EV Service?
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Alle kennis op één plek", desc: "Van technisch advies tot subsidiebegeleiding" },
                  { title: "Eén vast aanspreekpunt", desc: "Persoonlijke contact, altijd dezelfde specialist" },
                  { title: "Onafhankelijk advies", desc: "We kiezen de beste oplossing, niet een merk" },
                  { title: "Gecertificeerde installateurs", desc: "Kwaliteit gegarandeerd, vakkundige installatie" },
                  { title: "De beste after-sales service", desc: "Ook na oplevering staan we voor u klaar" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
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
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "500+", label: "Installaties" },
                    { number: "98%", label: "Tevreden klanten" },
                    { number: "15+", label: "Jaar ervaring" },
                    { number: "24/7", label: "Support" }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-4">
                      <div className="text-3xl font-black text-green-700 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="content-container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-8 shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Laadpaal Installatie: Uw Partner in Smart Charging
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Bent u een zakelijke klant die één of meerdere laadpalen wil plaatsen bij uw bedrijf of een VvE die laadpunten wil implementeren? Wij begeleiden u van advies tot oplevering. Onze EV Service Backoffice helpt u bij het beheer en onderhoud van uw laadinfrastructuur.
          </p>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Meerdere merken laadpalen op één locatie? Dat kan!</h3>
            <p className="text-gray-600 leading-relaxed">
              Als u uw bestaande laadplein wilt uitbreiden, bieden wij gespecialiseerde smart charging-modules om optimaal gebruik te maken van uw eigen energiebronnen en actieve load balancing toe te passen.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Veelgestelde Vragen
            </h2>
            <p className="text-lg text-gray-300">
              Antwoorden op de meest gestelde vragen over onze diensten
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Zijn er subsidies of financiële regelingen beschikbaar?",
                a: "Zeker! Bedrijven kunnen profiteren van belastingvoordelen zoals de KIA (Kleinschaligheidsinvesteringsaftrek) en MIA (Milieu-investeringsaftrek). Sinds 2024 zijn er ook subsidiemogelijkheden beschikbaar voor VvE's."
              },
              {
                q: "Komen jullie langs op de situatie te meten?",
                a: "Ja, we komen altijd langs om de situatie ter plaatse te beoordelen. Een fysieke inspectie is essentieel om een nauwkeurig advies te geven en de meest geschikte laadoplossing te kunnen aanbieden."
              },
              {
                q: "Helpen jullie met een laadplan voor mijn bedrijf?",
                a: "Ja, we helpen bij het opstellen van een laadbeleid dat voldoet aan uw bedrijfs- of VvE-behoeften, inclusief kostenverdeling en gebruik."
              },
              {
                q: "Wat is jullie werkgebied?",
                a: "Ons werkgebied omvat voornamelijk de Randstad (Amsterdam, Utrecht, Rotterdam, etc.). Voor interessante projecten schuiven we soms onze grenzen op."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                  <span className="text-lg font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">Niet gevonden wat u zocht?</p>
            <Link
              href="/klantenservice"
              className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-container py-20">
        <div className="relative bg-gradient-to-br from-green-600 via-emerald-700 to-green-800 rounded-[3rem] p-12 lg:p-16 shadow-3xl overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-6">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-green-100 mb-10">
              Vraag vandaag nog een vrijblijvende offerte aan en ontdek wat wij voor u kunnen betekenen.
            </p>
            <Link
              href="/offerte-aanvragen"
              className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
            >
              Offerte aanvragen
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
