import api from "@lib/ghost"
import { notFound } from 'next/navigation' // <-- BELANGRIJKE IMPORT

// GenerateStaticParams blijft ongewijzigd, omdat dit de data-ophaling is
export async function generateStaticParams() {
  // Voeg een try/catch toe om de build logs duidelijker te maken als deze faalt
  try {
    const posts = await api.posts.browse({ limit: "all" })
    return posts.map((post) => ({ slug: post.slug }))
  } catch (error) {
    console.error("❌ Fout in generateStaticParams bij het ophalen van posts:", error)
    // Als de build hier faalt, weet je dat de API-call het probleem is.
    return [] 
  }
}

export default async function BlogDetail({ params }: { params: any }) {
  let post

  try {
    // Probeer de post te lezen. Als deze faalt (bv. 404 of netwerkfout), vang de fout.
    post = await api.posts.read({ slug: params.slug })
  } catch (error) {
    console.error(`❌ Fout bij ophalen post met slug ${params.slug}:`, error)
    // Ga verder om te controleren of 'post' null is
  }

  // 1. CRUCIALE CONTROLE: Check of de post is gevonden
  if (!post || !post.title || !post.html) {
    console.warn(`Post met slug ${params.slug} niet gevonden of data is incompleet.`)
    return notFound() // Genereer een 404
  }

  // Alle volgende regels zijn nu bug-proof
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
        <article className="max-w-3xl mx-auto">
          {/* Post.title en post.html zijn al gecontroleerd in de if-statement */}
          <h1 className="mb-4 text-green-900 font-bold text-2xl sm:text-4xl leading-tight break-words">
            {post.title}
          </h1>

          <div className="mb-8 text-gray-500 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 border-b-2 border-green-700 pb-4 font-semibold">
            
            {/* 2. Datum Check: Controleer of de published_at waarde bestaat */}
            {post.published_at && (
              <span>
                {new Date(post.published_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}

            {/* 3. Auteur Check: Gebruik optional chaining (?.) op primary_author en name */}
            {post.primary_author?.name && (
              <span className="text-green-800 font-bold">
                By {post.primary_author.name}
              </span>
            )}
          </div>

          {/* 4. Afbeelding Check: post.feature_image is een string, dus check op truthiness */}
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