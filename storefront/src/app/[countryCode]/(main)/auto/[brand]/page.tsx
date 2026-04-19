import { sdk } from "@lib/config"
import { string_to_slug } from "./slugger"
import Image from "next/image"
import Link from "next/link"
import SafeHtml from "@modules/common/components/safe-html"
import { ArrowLeft, Car, Zap } from "lucide-react"

export async function generateStaticParams() {
  const brands = await sdk.client.fetch(`/store/carbrand/models`)

  return brands.brands.map((brand: any) => ({
    brand: string_to_slug(brand.name.toLowerCase()),
  }))
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
  const brands = await sdk.client.fetch(`/store/carbrand/models`)
  const brand = brands.brands.find(
    (b: any) => string_to_slug(b.name.toLowerCase()) === params.brand
  )

  if (!brand) return (
    <div className="content-container py-20 text-center">
      <div className="max-w-md mx-auto">
        <Car className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-black text-gray-900 mb-4">Merk niet gevonden</h1>
        <Link href="/auto" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline">
          <ArrowLeft className="w-5 h-5" />
          Terug naar alle merken
        </Link>
      </div>
    </div>
  )

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
          {/* Brand logo */}
          {brand.image && (
            <div className="mb-8 inline-block bg-white rounded-2xl p-6 shadow-2xl">
              <img
                src={brand.image}
                alt={brand.name}
                width={120}
                height={60}
                className="h-16 w-auto object-contain"
              />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            {brand.name}
          </h1>
          {brand.description && (
            <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              {brand.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
            </p>
          )}
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6">
          <Link
            href="/auto"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle merken
          </Link>
        </div>
      </section>

      {/* Brand Description */}
      {brand.description && (
        <section className="content-container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100">
              <SafeHtml className="prose prose-lg prose-green max-w-none" html={brand.description} />
            </div>
          </div>
        </section>
      )}

      {/* Models Section */}
      <section className="content-container py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Beschikbare modellen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {brand.carmodels.length} modellen beschikbaar voor {brand.name}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brand.carmodels.map((model: any) => (
            <Link
              key={model.id}
              href={`/auto/${string_to_slug(brand.name.toLowerCase())}/${string_to_slug(
                model.name.toLowerCase().replace(/\s+/g, '-')
              )}`}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-green-100"
            >
              {/* Image container */}
              <div className="relative aspect-square bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 transition-all duration-500" />
                {model.image ? (
                  <img
                    className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    src={model.image}
                    alt={model.name}
                  />
                ) : (
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Car className="w-16 h-16 text-green-300" />
                  </div>
                )}
              </div>

              {/* Model name */}
              <div className="p-5 text-center">
                <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                  {model.name}
                </h3>
              </div>

              {/* View products badge */}
              <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Bekijk
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/10 to-transparent rounded-tr-3xl" />
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Description */}
      {brand.BottomDescription && (
        <section className="content-container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Over {brand.name}</h3>
              <SafeHtml className="prose prose-lg max-w-none" html={brand.BottomDescription} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="content-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">
            Hulp nodig bij het kiezen?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Onze experts helpen je graag met persoonlijk advies voor de perfecte laadoplossing.
          </p>
          <Link
            href="/klantenservice"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Neem contact op
          </Link>
        </div>
      </section>
    </div>
  )
}
