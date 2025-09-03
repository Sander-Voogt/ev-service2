// app/blog/page.js (Next.js 13+ App Router)
import { sdk } from "@lib/config"
import api from "@lib/ghost"
import Link from "next/link"

export default async function CarIndexPage({
  params,
  searchParams,
}: {
  params: any
  searchParams: any
}) {
  const page = parseInt(searchParams.page || "1", 10)
  const limit = 5

  const data = await sdk.client.fetch(`/store/carbrand/${params.brand}`)

  return (
    <ul>
      {data.carmodels.map((post) => (
        <li key={post.name}>
          <a href={`/car/${post.name}`}>{post.name}</a>
        </li>
      ))}
    </ul>
  )
}
