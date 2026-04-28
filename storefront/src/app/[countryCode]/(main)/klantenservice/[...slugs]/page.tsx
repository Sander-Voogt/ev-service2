import { getPageBySlug, getSubPages, getRootCategories, GhostPage } from "lib/ghost"
import { notFound } from "next/navigation"
import Link from "next/link"
import SafeHtml from "@modules/common/components/safe-html"
import { ChevronRight, ArrowRight } from "lucide-react"

interface HelpdeskPageParams {
  params: { slugs: string[] }
}

export async function generateStaticParams(): Promise<{ slugs: string[] }[]> {
  const roots = await getRootCategories()
  return roots.map((root) => ({ slugs: [root.slug] }))
}

export default async function HelpdeskPage({ params }: HelpdeskPageParams) {
  const slugs = params.slugs
  const currentSlug = slugs[slugs.length - 1]

  const page: GhostPage | null = await getPageBySlug(currentSlug)
  if (!page) notFound()

  const subPages = await getSubPages(currentSlug)

  const breadcrumb = slugs.map((slug, index) => ({
    label: slug.replace(/-/g, " "),
    href: `/klantenservice/${slugs.slice(0, index + 1).join("/")}`,
  }))

  return (
    <div className="bg-white">
      <div className="content-container-narrow py-6 sm:py-10">
        <nav className="flex items-center flex-wrap gap-1.5 text-[12.5px] text-text-muted mb-5">
          <Link href="/klantenservice" className="hover:text-jade transition-colors">
            Klantenservice
          </Link>
          {breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-[#a5b3bb]" />
              {i < breadcrumb.length - 1 ? (
                <Link href={b.href} className="hover:text-jade capitalize">
                  {b.label}
                </Link>
              ) : (
                <span className="text-text-base font-medium capitalize">
                  {b.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <article>
          <h1 className="display-md text-text-base mb-5">{page.title}</h1>
          <SafeHtml className="prose prose-sm sm:prose-base max-w-none" html={page.html} />
        </article>

        {subPages.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border-soft">
            <p className="eyebrow-muted mb-3">Gerelateerde artikelen</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {subPages.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/klantenservice/${[...slugs, sub.slug].join("/")}`}
                    className="group flex items-center justify-between gap-3 surface-panel px-4 py-3 hover:border-jade/40 hover:bg-white transition-all"
                  >
                    <span className="text-[13.5px] font-medium text-text-base group-hover:text-jade">
                      {sub.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#a5b3bb] group-hover:text-jade group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
