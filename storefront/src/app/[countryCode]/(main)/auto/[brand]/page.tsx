// app/blog/page.js (Next.js 13+ App Router)
import { sdk } from "@lib/config"
import api from "@lib/ghost"
import Link from "next/link"
import dynamic from "next/dynamic"

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

  const CarModelSearch = dynamic(() => import("./CarModelSearch"), { ssr: false })

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <CarModelSearch carmodels={data.carmodels} />
    </div>
  )
}
