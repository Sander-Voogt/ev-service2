import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import {
  getCollectionByHandle,
  getCollectionsWithProducts,
  retrieveCollection,
} from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { sdk } from "@lib/config"
import { getProductsList } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

type Brand = {
  name: string
  image?: string
  description?: string
}

type ApiResponse = {
  brands: Brand[]
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionByHandle("home-page")
  const { response } = await getProductsList({
    queryParams: { collection_id: collections.id },
    countryCode,
  })
  const region = await getRegion(countryCode)

  const models: ApiResponse = await sdk.client.fetch(`/store/carbrand/models`)

  if (!collections || !region) {
    return null
  }

  console.log(models, response)

  return (
    <>
      <Hero models={models.brands} />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collection={response} region={region} />
      </ul>
      <div className="content-container">
        <section className="flex flex-row">
          <div className="w-1/2">
            <p>Producten & Service</p>
            <ul>
              <li>Laadkabels voor alle elektrische auto's</li>
              <li>Laadpaal zelf installeren? Wij helpen je</li>
            </ul>
          </div>

          <div className="w-1/2 flex flex-col justify-center" style={{backgroundImage: 'url("/img/image.png")', height: '220px', backgroundPosition: 'center center'}}>
            <span className="bg-white text-lg mt-50 my-2 px-4 text-green-600" style={{width: 'fit-content'}}>Jouw laadpaal vakkundig geïnstalleerd</span><br />
            <span className="bg-white text-lg my-2 px-4 text-green-600"  style={{width: 'fit-content'}}>met onze installatieservice</span>
          </div>
        </section>
      </div>
    </>
  )
}
