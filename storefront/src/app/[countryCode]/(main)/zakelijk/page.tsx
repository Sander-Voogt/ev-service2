import Link from "next/link"
import { Building2, Users, Zap, Award, TrendingUp, Shield, CheckCircle, ChevronRight } from "lucide-react"

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
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Laadinfrastructuur voor{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
              op de zaak
            </span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Complete laadoplossingen voor bedrijven, van ontwerp tot oplevering en beheer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/offerte-aanvragen"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Offerte aanvragen
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/installatie-service"
              className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Bekijk onze diensten
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="content-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Alles voor elektrisch laden op uw bedrijfslocatie
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              EVservice heeft alles in huis voor het laden van elektrische voertuigen. Met de toenemende vraag naar laadinfrastructuur is het belangrijk dat ook uw organisatie klaar is voor de toekomst.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ons assortiment is samengesteld op basis van kwalitatieve- en duurzaamheidseigenschappen. U kunt zowel voor als na uw aankoop bij ons terecht voor advies, technische ondersteuning en onderhoud.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="content-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Onze Zakelijke Diensten
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete ontzorging voor uw bedrijfslocatie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              title: "Laadpalen voor bedrijven",
              desc: "Van enkele laadpaal tot compleet laadplein",
              color: "from-green-500 to-emerald-600"
            },
            {
              icon: Users,
              title: "VvE oplossingen",
              desc: "Collectief laden voor appartementencomplexen",
              color: "from-blue-500 to-indigo-600"
            },
            {
              icon: Zap,
              title: "Smart Charging",
              desc: "Optimaal gebruik van uw stroomaansluiting",
              color: "from-amber-500 to-orange-600"
            },
            {
              icon: TrendingUp,
              title: "Load Balancing",
              desc: "Voorkom overbelasting van uw netvoeding",
              color: "from-purple-500 to-pink-600"
            },
            {
              icon: Shield,
              title: "Backoffice beheer",
              desc: "Complete monitoring en kostenverrekening",
              color: "from-red-500 to-rose-600"
            },
            {
              icon: Award,
              title: "Maatwerk oplossingen",
              desc: "Advies op maat voor uw situatie",
              color: "from-cyan-500 to-teal-600"
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
                <h3 className="text-xl font-black text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Waarom EV Service?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Persoonlijke aanpak",
                desc: "Bij EVservice hechten we veel waarde aan goede service en een persoonlijke benadering. Ons team staat altijd voor u klaar."
              },
              {
                title: "A tot Z oplossingen",
                desc: "Van eerste advies tot complete installatie en jarenlange support. Wij blijven uw partner."
              },
              {
                title: "Technische expertise",
                desc: "Diepgaande kennis van laadinfrastructuur, smart charging en load balancing."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="content-container py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Voorbereid op de toekomst
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              De transitie naar elektrisch rijden gaat snel. Zorg dat uw bedrijf er klaar voor is. Of u nu laadpalen wilt voor uw medewerkers, bezoekers of wagenpark: wij leveren de juiste oplossing.
            </p>
            <ul className="space-y-4">
              {[
                "Toekomstbestendige laadinfrastructuur",
                "Schalbare oplossingen die meegroeien",
                "Ondersteuning bij subsidieaanvragen",
                "Kostenbesparend door slim laden"
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-12 text-white">
              <h3 className="text-2xl font-black mb-6">Direct contact?</h3>
              <p className="text-green-100 mb-8">Onze experts staan voor u klaar om uw vragen te beantwoorden.</p>
              <Link
                href="/klantenservice"
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Neem contact op
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="content-container text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Klaar voor de volgende stap?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Vraag een vrijblijvende offerte aan en ontdek wat wij voor uw bedrijf kunnen betekenen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/offerte-aanvragen"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-10 py-5 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Offerte aanvragen
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/installatie-service"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Meer informatie
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
