import { sdk } from "@lib/config"
import Image from "next/image"
import Link from "next/link"
import { Car, Zap, Shield, Truck } from "lucide-react"

type Brand = {
  id: string
  name: string
  image?: string
  description?: string
}

type ApiResponse = {
  brands: Brand[]
}

export default async function CarIndexPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const data: ApiResponse = await sdk.client.fetch(`/store/carbrand?limit=100`)

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-2xl">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Alle Automerken
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Selecteer jouw automerk en ontdek de perfecte laadoplossingen: laadkabels, laadpalen en accessoires op maat.
          </p>
        </div>
      </section>

      {/* Features Bar */}
      <section className="relative z-20 -mt-12 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Zap, text: "Snelle levering" },
            { icon: Shield, text: "2 jaar garantie" },
            { icon: Truck, text: "Gratis verzending" },
            { icon: Car, text: "Passend voor jouw auto" }
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-green-700" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Brands Grid */}
      <section className="content-container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Kies jouw automerk
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.brands.length} automerken beschikbaar
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.brands.map((brand: Brand) => (
            <li key={brand.id}>
              <Link
                href={`/auto/${brand.name.toLowerCase()}`}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-green-100"
              >
                {/* Image container */}
                <div className="relative aspect-square bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 transition-all duration-500" />
                  {brand.image ? (
                    <img
                      className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      src={brand.image}
                      alt={brand.name}
                    />
                  ) : (
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Car className="w-16 h-16 text-green-300" />
                    </div>
                  )}
                </div>

                {/* Brand name */}
                <div className="p-5 text-center">
                  <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {brand.name}
                  </h3>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/10 to-transparent rounded-tr-3xl" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="content-container text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Niet zeker welk product je nodig hebt?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Onze experts helpen je graag met persoonlijk advies voor de perfecte laadoplossing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/klantenservice"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Neem contact op
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Bekijk onze gidsen
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
