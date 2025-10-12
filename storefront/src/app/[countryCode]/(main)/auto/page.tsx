import { sdk } from "@lib/config"
import Image from "next/image";
import Link from "next/link"

type Brand = {
  name: string;
  image?: string;
  description?: string;
};
type ApiResponse = {
  brands: Brand[];
};

export default async function CarIndexPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const page = parseInt((searchParams?.page as string) || "1", 10)
  const limit = 8

  const data: ApiResponse = await sdk.client.fetch(
    `/store/carbrand?limit=100`
  )

  return (
    <div className="content-container">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 flex items-center gap-3">
        Automerken
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data.brands.map((post: Brand) => (
          <li
            key={post.id}
            className="max-w-sm bg-white border border-green-100 rounded-lg shadow-sm flex flex-col"
          >
            <Link href={`/auto/${post.name.toLowerCase()}`}>
              {post.image ? (
                <img
                  className="rounded-t-lg w-full h-40 object-contain bg-green-50"
                  src={post.image}
                  alt={'auto'}
                  height={50}
                  width={50}
                  />
              ) : (
                <div className="rounded-t-lg w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-semibold border-b border-green-100">
                  No Image Found
                </div>
              )}
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <Link href={`/auto/${post.name.toLowerCase()}`}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  {post.name}
                </h5>
              </Link>

            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
