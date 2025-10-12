export const dynamic = "force-dynamic"
import { sdk } from "@lib/config"
import { string_to_slug } from "../slugger"
import Image from "next/image"
import { getCollectionByHandle } from "@lib/data/collections"
import { getProductsList } from "@lib/data/products"
import FeaturedProducts from "@modules/home/components/featured-products"
import { getRegion } from "@lib/data/regions"

export async function generateStaticParams() {
  const response = await sdk.client.fetch(`/store/carbrand/models`)
  const brands = response.brands ?? response.data ?? []

  if (!brands) return []

  const params = brands.flatMap((brand) =>
    (brand.carmodels || []).map((model) => ({
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

  const brand = brands.find((b) => string_to_slug(b.name) === params.brand)

  const model = brand?.carmodels.find(
    (m) => string_to_slug(m.name) === params.model
  )

  if (!brand || !model) {
    return <div>Model niet gevonden</div>
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

    const accessoiresdata = await getCollectionByHandle("laadpalen")
  const { response: accessoires } = await getProductsList({
    queryParams: { collection_id: accessoiresdata.id },
    countryCode: params.countryCode,
  })


  console.log(model)

  return (
    <main className="content-container">
      <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
      <section className="relative w-full h-[80vh] overflow-hidden">
        {/* Achtergrondafbeelding */}
        {model?.PictureId && (
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="adfasdf"
            src={model?.PictureId}
            width={100}
            height={50}
          />
        )}

        {/* Donkere overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6 text-sm text-gray-200">
          <nav className="flex space-x-2">
            <a href="#" className="hover:underline">
              Home
            </a>
            <span>/</span>
            <a href="/nl/auto" className="hover:underline">
              Merken
            </a>
            <span>/</span>
            <a
              href={`/nl/auto/${string_to_slug(brand.name.toLowerCase())}`}
              className="hover:underline"
            >
              {brand.name}
            </a>
            <span>/</span>
            <a href="#" className="text-green-400 hover:underline">
              {model.name}
            </a>
          </nav>
        </div>

        {/* Tekst content */}
        <div className="relative z-10 flex flex-col justify-center h-full max-w-2xl ml-auto mr-12 text-right text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {model.name} Opladen?
          </h1>

          <div
            className="text-gray-200 mb-6 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: model?.ModelBannerDescription }}
          />

          <div className="flex justify-end space-x-4">
            <a href="#laadkabels" className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">
              LAADKABELS
            </a>
            <a href="#laadpalen" className="px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition">
              LAADPALEN
            </a>
          </div>
        </div>
      </section>
      {/* {model?.image && (
        <img alt="adfasdf" src={model?.image} width={100} height={50} />
      )}

      <p className="text-gray-600 mb-2">
        Merk: <strong>{brand.name}</strong>
      </p> */}

      <h3 className="text-xl font-bold mb-2" id="laadkabels">
        Laadkabels voor {model.brand} {model.name}
      </h3>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: model?.ChargingCableDescription }}
      />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collection={laadkabels} region={region} />
      </ul>

      <h3 className="text-xl font-bold mb-2" id="laadpalen">
        Laadpalen voor {model.brand} {model.name}
      </h3>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: model?.ChargingStationDescription }}
      />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collection={laadpalen} region={region} />
      </ul>

      <h3 className="text-xl font-bold mb-2">
        Laad accesoires voor {model.brand} {model.name}
      </h3>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: model?.AccessoriesDescription }}
      />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collection={accessoires} region={region} />
      </ul>
      

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: model?.description }}
      />
    </main>
  )
}
