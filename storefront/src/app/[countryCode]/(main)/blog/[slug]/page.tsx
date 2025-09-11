import api from "@lib/ghost"

export async function generateStaticParams() {
  const posts = await api.posts.browse({ limit: "all" })
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetail({ params }: { params: any }) {
  const post = await api.posts.read({ slug: params.slug })

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
        <article className="max-w-3xl mx-auto">
          <h1 className="mb-4 text-green-900 font-bold text-2xl sm:text-4xl leading-tight break-words">
            {post.title}
          </h1>

          <div className="mb-8 text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 border-b-2 border-green-700 pb-4 font-semibold">
            <span>
              {new Date(post.published_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.primary_author && (
              <span className="text-green-800 font-bold">
                By {post.primary_author.name}
              </span>
            )}
          </div>

          {post.feature_image && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
              <img
                src={post.feature_image}
                alt={post.title}
                className="w-full h-48 sm:h-auto object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-green prose-base sm:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </div>
  )
}
