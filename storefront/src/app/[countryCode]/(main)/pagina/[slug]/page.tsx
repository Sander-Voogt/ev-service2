import { getPageBySlug, getInfoPages } from "@lib/ghost"
import { notFound } from "next/navigation"
import SafeHtml from "@modules/common/components/safe-html"

export const dynamic = "force-static"

export async function generateStaticParams() {
  const categories = await getInfoPages()
  return categories.map((category) => ({ slug: category.slug }))
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const pageContent = await getPageBySlug(params.slug)

  if (!pageContent) notFound()

  return (
    <div className="bg-white">
      <div className="content-container-narrow py-6 sm:py-10">
        <article>
          <h1 className="display-lg text-text-base mb-5">{pageContent.title}</h1>
          <SafeHtml
            className="prose prose-sm sm:prose-base max-w-none"
            html={pageContent.html}
          />
        </article>
      </div>
    </div>
  )
}
