import { sdk } from "@lib/config"
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
    `/store/carbrand?page=${page}&limit=${limit}`
  )

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 flex items-center gap-3">
        Car Brands
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data.brands.map((post: Brand) => (
          <li
            key={post.name}
            className="max-w-sm bg-white border border-green-100 rounded-lg shadow-sm flex flex-col"
          >
            <Link href={`/auto/${post.name}`}>
              {post.image ? (
                <img
                  className="rounded-t-lg w-full h-40 object-cover bg-green-50"
                  src={post.image}
                  alt={post.name}
                />
              ) : (
                <div className="rounded-t-lg w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-semibold border-b border-green-100">
                  No Image Found
                </div>
              )}
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <Link href={`/auto/${post.name}`}>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  {post.name}
                </h5>
              </Link>
              <div
                className="mb-3 font-normal text-gray-700 prose prose-green"
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    if (!post.description)
                      return "Find out more about this car brand."
                    let html =
                      typeof window === "undefined"
                        ? (() => {
                            const matches = post.description.match(
                              /<p[^>]*>(.*?)<\/p>/gi
                            )
                            return matches && matches[2]
                              ? matches[2]
                              : "Find out more about this car brand."
                          })()
                        : (() => {
                            const div = document.createElement("div")
                            div.innerHTML = post.description
                            const pTags = div.querySelectorAll("p")
                            return (
                              pTags[2]?.outerHTML ||
                              "Find out more about this car brand."
                            )
                          })()
                    return html
                  })(),
                }}
              />
              <div className="mt-auto">
                <Link
                  href={`/auto/${post.name}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Link
          href={`?page=${page - 1}`}
          className={`px-4 py-2 bg-white border border-green-200 rounded hover:bg-green-50 flex items-center gap-2 font-medium ${
            page <= 1
              ? "pointer-events-none opacity-50 bg-gray-200 text-gray-500 border-gray-300"
              : "text-green-700"
          }`}
          aria-disabled={page <= 1}
        >
          Previous
        </Link>
        <span className="px-4 py-2 font-semibold">Page {page}</span>
        <Link
          href={`?page=${page + 1}`}
          className={`px-4 py-2 bg-white border border-green-200 rounded hover:bg-green-50 flex items-center gap-2 font-medium ${
            data.brands.length < limit
              ? "pointer-events-none opacity-50 bg-gray-200 text-gray-500 border-gray-300"
              : "text-green-700"
          }`}
          aria-disabled={data.brands.length < limit}
        >
          Next
        </Link>
      </div>
    </div>
  )
}
