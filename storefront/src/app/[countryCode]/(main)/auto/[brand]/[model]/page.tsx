import { sdk } from "@lib/config"
import { string_to_slug } from "../slugger"
import Image from "next/image"
import Link from "next/link"
import { getCollectionByHandle } from "@lib/data/collections"
import { getProductsList } from "@lib/data/products"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getRegion } from "@lib/data/regions"
import SafeHtml from "@modules/common/components/safe-html"
import { ArrowLeft, Zap, Cable, Settings, ChevronRight, CheckCircle } from "lucide-react"

export async function generateStaticParams() {
  const response = await sdk.client.fetch(`/store/carbrand/models`)
  const brands = response.brands ?? response.data ?? []

  if (!brands) return []

  const params = brands.flatMap((brand: any) =>
    (brand.carmodels || []).map((model: any) => ({
      brand: string_to_slug(brand.name).replace(/\s+/g, '-'),
      model: string_to_slug(model.name).replace(/\s+/g, '-'),
    }))
  )

  return params
}

export default async function ModelPage({
  params,
}: {
  params: { countryCode: string; brand: string; model: string }
}) {
  const region = await getRegion(params.countryCode)

  const response = await sdk.client.fetch(`/store/carbrand/models`)
  const brands = response.brands ?? response.data ?? []

  const brand = brands.find((b: any) => string_to_slug(b.name) === params.brand)

  const model = brand?.carmodels.find(
    (m: any) => string_to_slug(m.name) === params.model
  )

  if (!brand || !model) {
    return (
      <div className="content-container py-20 text-center">
        <div className="max-w-md mx-auto">
          <Cable className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-gray-900 mb-4">Model niet gevonden</h1>
          <Link href="/auto" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:underline">
            <ArrowLeft className="w-5 h-5" />
            Terug naar alle merken
          </Link>
        </div>
      </div>
    )
  }

  const collections = await getCollectionByHandle("laadkabels-type-2")
  const { response: laadkabels } = await getProductsList({
    queryParams: { collection_id: collections.id },
    countryCode: params.countryCode,
  })

  const laadpalendata = await getCollectionByHandle("laadpalen")
  const { response: laadpalen } = await getProductsList({
    queryParams: { collection_id: laadpalendata.id },
    countryCode: params.countryCode,
  })

  const accessoiresdata = await getCollectionByHandle("laadpaal-accessoires")
  const { response: accessoires } = await getProductsList({
    queryParams: { collection_id: accessoiresdata.id },
    countryCode: params.countryCode,
  })

  return (
    <div className="relative min-h-screen">
      {/* Hero Section with Product Image */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background image */}
        {model?.PictureId && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${model.PictureId})` }}
          />
        )}
        {!model?.PictureId && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        {/* Content */}
        <div className="relative z-10 content-container h-full flex flex-col justify-center">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-green-200 mb-8">
            <Link href="/auto" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/auto" className="hover:text-white transition-colors">Merken</Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href={`/auto/${string_to_slug(brand.name.toLowerCase())}`}
              className="hover:text-white transition-colors"
            >
              {brand.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-semibold">{model.name}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <CheckCircle className="w-4 h-4" />
              Geschikt voor jouw {brand.name}
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              {model.name}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                Opladen?
              </span>
            </h1>

            {model?.ModelBannerDescription && (
              <SafeHtml
                className="text-green-100 text-lg mb-8 leading-relaxed"
                html={model.ModelBannerDescription}
              />
            )}

            {/* Quick CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#laadkabels"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-2xl font-bold hover:bg-green-50 transition-all duration-300 shadow-xl"
              >
                <Cable className="w-5 h-5 text-green-700" />
                Laadkabels
              </a>
              <a
                href="#laadpalen"
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <Zap className="w-5 h-5" />
                Laadpalen
              </a>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link
            href={`/auto/${string_to_slug(brand.name.toLowerCase())}`}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar {brand.name}
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <div className="content-container py-16 space-y-20">

        {/* Laadkabels Section */}
        <section id="laadkabels">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Cable className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Laadkabels voor {brand.name} {model.name}
              </h2>
              <p className="text-gray-600">Perfecte pasgarantie voor jouw auto</p>
            </div>
          </div>

          {model?.ChargingCableDescription && (
            <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <SafeHtml className="prose prose-green max-w-none" html={model.ChargingCableDescription} />
            </div>
          )}

          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collection={laadkabels} region={region} />
          </ul>
        </section>

        {/* Laadpalen Section */}
        <section id="laadpalen">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Laadpalen voor {brand.name} {model.name}
              </h2>
              <p className="text-gray-600">Opladen waar en wanneer je wilt</p>
            </div>
          </div>

          {model?.ChargingStationDescription && (
            <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
              <SafeHtml className="prose prose-blue max-w-none" html={model.ChargingStationDescription} />
            </div>
          )}

          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collection={laadpalen} region={region} />
          </ul>
        </section>

        {/* Accessoires Section */}
        <section id="accessoires">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Accessoires voor {brand.name} {model.name}
              </h2>
              <p className="text-gray-600">Alles voor een complete laadervaring</p>
            </div>
          </div>

          {model?.AccessoriesDescription && (
            <div className="mb-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <SafeHtml className="prose prose-purple max-w-none" html={model.AccessoriesDescription} />
            </div>
          )}

          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collection={accessoires} region={region} />
          </ul>
        </section>

        {/* Additional Description */}
        {model?.description && (
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Alles over jouw {model.name}</h2>
            <SafeHtml className="prose prose-lg max-w-none" html={model.description} />
          </section>
        )}
      </div>

      {/* Trust Banner */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-700 to-green-800 py-16">
        <div className="content-container">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            {[
              { icon: CheckCircle, title: "Perfecte pasgarantie", text: "Alleen producten die 100% passen op jouw auto" },
              { icon: Zap, title: "Expert advies", text: "Onze specialisten helpen je graag" },
              { icon: Cable, title: "2 jaar garantie", text: "Standaard garantie op alle laadkabels" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-green-100">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-container py-16 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-4">
          Nog vragen over opladen?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Onze experts staan voor je klaar met persoonlijk advies.
        </p>
        <Link
          href="/klantenservice"
          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          Neem contact op
        </Link>
      </section>
    </div>
  )
}
