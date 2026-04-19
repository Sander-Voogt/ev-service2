import Link from "next/link"
import { Store, Package, Truck, HeadphonesIcon as Headset, CheckCircle, Award, TrendingUp, ChevronRight } from "lucide-react"

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
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            EV Service:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
              voor wederverkopers
            </span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Als wederverkoper speel je een essentiële rol in de groeiende markt voor elektrisch laden. Wij ondersteunen jouw succes.
          </p>
          <Link
            href="/klantenservice"
            className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
          >
            Word partner
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="content-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Samen groeien in de EV-markt
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Als wederverkoper van laadpalen en laadkabels ben je essentieel voor de energietransitie. Bij EV Service bieden we een uitgebreid scala aan diensten om jouw succes als wederverkoper te ondersteunen.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We geloven in het bouwen van sterke partnerschappen. Jouw succes is ons doel, en we streven ernaar om je te voorzien van de tools en ondersteuning die je nodig hebt om te groeien.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="content-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Onze Diensten voor Wederverkopers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Alles wat je nodig hebt voor een succesvolle samenwerking
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Package,
              title: "Breed Assortiment",
              desc: "Bij EV Service hebben we een uitgebreid assortiment van hoogwaardige EV laadpalen en laadaccessoires. Wij hebben altijd het juiste product voor jouw klanten.",
              color: "from-green-500 to-emerald-600",
              features: ["Alle topmerken", "Compleet assortiment", "Altijd op voorraad"]
            },
            {
              icon: Truck,
              title: "Snelheid & Efficiëntie",
              desc: "We begrijpen hoe belangrijk snelle levering is. Daarom bieden we snelle verzending, met de mogelijkheid voor volgende dag levering.",
              color: "from-blue-500 to-indigo-600",
              features: ["Next-day delivery", "Direct verzonden", "Track & trace"]
            },
            {
              icon: Store,
              title: "Drop Shipping",
              desc: "Maak gebruik van onze drop shipping service. We verzenden de producten rechtstreeks naar jouw klanten, zonder dat je zelf voorraad hoeft te houden.",
              color: "from-purple-500 to-pink-600",
              features: ["Geen voorraad nodig", "Direct naar klant", "Minder logistiek"]
            },
            {
              icon: Headset,
              title: "After Sales Service",
              desc: "Jouw succes als wederverkoper is ons succes. Daarom bieden we uitstekende after sales service. Bij vragen staan wij klaar om te helpen.",
              color: "from-amber-500 to-orange-600",
              features: ["Technische support", "Product training", "Marketing materiaal"]
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

      {/* Expertise Section */}
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8">
                Deskundig Advies & Support
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Bij EV Service hebben we jarenlange ervaring in de EV-branche. We delen graag onze kennis en expertise met jou. Of het nu gaat om technisch advies, productinformatie, of markttrends, wij zijn er om jou te ondersteunen en te adviseren.
              </p>
              <div className="space-y-4">
                {[
                  "Technische producttraining",
                  "Verkoopondersteuning",
                  "Marketing materialen",
                  "Concurrentiële prijzen"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Groei met ons mee</h3>
                    <p className="text-gray-600">De EV-markt groeit snel</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  De markt voor elektrisch laden groeit explosief. Als wederverkoper van EV Service profiteer je van deze groei met onze ondersteuning.
                </p>
                <Link
                  href="/klantenservice"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl w-full"
                >
                  Start vandaag nog
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="content-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Waarom Kiezen voor EV Service?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Sterk Partnerschap",
              desc: "We geloven in langdurige relaties gebaseerd op vertrouwen en wederzijds succes."
            },
            {
              title: "Uitgebreide Diensten",
              desc: "Van dropshipping tot after-sales support, wij bieden alles wat je nodig hebt."
            },
            {
              title: "Toegewijde Support",
              desc: "Ons team staat altijd klaar om je te helpen met vragen of ondersteuning."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="content-container">
          <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-[3rem] p-12 lg:p-16 shadow-3xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-black text-white mb-6">
                Word vandaag nog wederverkoper
              </h2>
              <p className="text-xl text-green-100 mb-10">
                Ontdek hoe EV Service jouw bedrijf kan laten groeien in de booming markt voor elektrisch laden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/klantenservice"
                  className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  Neem contact op
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/offerte-aanvragen"
                  className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  Meer informatie
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
