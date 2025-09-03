import { sdk } from "@lib/config"

export default async function CarIndexPage({ searchParams }) {
  const page = parseInt(searchParams.page || "1", 10)
  const limit = 5

  const data = await sdk.client.fetch(`/store/carbrand`)

  return (
    <ul>
      {data.brands.map((post) => (
        <li key={post.name}>
          <a href={`/auto/${post.name}`}>{post.name}</a>
        </li>
      ))}
    </ul>
  )
}
