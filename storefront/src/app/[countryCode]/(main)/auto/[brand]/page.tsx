import { sdk } from "@lib/config"
import CarModelSearch from "./CarModelSearch"

export default async function CarIndexPage({
  params,
  searchParams,
}: {
  params: any
  searchParams: any
}) {
  const page = parseInt(searchParams.page || "1", 10)
  const limit = 5

  const data = await sdk.client.fetch(`/store/carbrand/${params.brand}`) as { carmodels: any[] }
  console.log(data)

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: data?.description }}
    />
      <CarModelSearch carmodels={data.carmodels} />
            <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: data?.BottomDescription }}
    />
    </div>

  )
}
