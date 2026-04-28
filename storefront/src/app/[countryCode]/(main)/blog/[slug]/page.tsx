import api from "@lib/ghost"
import { notFound } from "next/navigation"
import Link from "next/link"
import SafeHtml from "@modules/common/components/safe-html"
import { ChevronLeft, Calendar, User } from "lucide-react"

export async function generateStaticParams() {
  try {
    const posts = await api.posts.browse({ limit: "all" })
    return posts.map((post) => ({ slug: post.slug }))
  } catch (error) {
    console.error("Fout in generateStaticParams:", error)
    return []
  }
}

function replaceEvserviceUrls(html: string) {
  return html.replace(
    /https?:\/\/content\.evservice\.eu/g,
    "https://www.evservice.eu"
  )
}

export default async function BlogDetail({ params }: { params: any }) {
  let post
  try {
    post = await api.posts.read({ slug: params.slug })
  } catch (error) {
    console.error(`Fout bij ophalen post ${params.slug}:`, error)
  }

  if (!post || !post.title || !post.html) {
    return notFound()
  }

  return (
    <div className="bg-white">
      <div className="content-container-narrow py-6 sm:py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-jade hover:text-[#247f4d] mb-5"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Terug naar overzicht
        </Link>

        <article>
          <header className="mb-6 pb-5 border-b border-border-soft">
            <h1 className="display-lg text-text-base mb-3">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-text-muted">
              {post.published_at && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.published_at).toLocaleDateString("nl-NL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {post.primary_author?.name && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {post.primary_author.name}
                </span>
              )}
            </div>
          </header>

          {post.feature_image && (
            <div className="mb-6 rounded-lg overflow-hidden border border-border-soft">
              <img
                src={post.feature_image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <SafeHtml
            className="prose prose-sm sm:prose-base max-w-none"
            html={replaceEvserviceUrls(post.html)}
          />
        </article>
      </div>
    </div>
  )
}
