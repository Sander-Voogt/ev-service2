"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import SafeHtml from "@modules/common/components/safe-html"
import Modal from "../../../../modules/layout/components/floating-action-button"
import {
  Search,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Filter,
} from "lucide-react"

type Tag = { id: string; name: string }
type Author = { id: string; name: string }
type Post = {
  id: string
  slug: string
  title?: string
  excerpt?: string
  published_at?: string | null
  tags?: Tag[]
  authors?: Author[]
  imageUrl?: string
}
type Archive = { [year: string]: { [month: string]: Post[] } }

export default function BlogPage() {
  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const limit = 6

  useEffect(() => {
    setLoading(true)
    fetch("/api/blog-posts")
      .then((res) => res.json())
      .then((posts: Post[]) => {
        setAllPosts(posts)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredPosts: Post[] = search
    ? allPosts.filter(
        (post) =>
          post.title?.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(search.toLowerCase())
      )
    : allPosts

  const paginatedPosts: Post[] = filteredPosts.slice(
    (page - 1) * limit,
    page * limit
  )
  const totalPages: number = Math.ceil(filteredPosts.length / limit)

  const archive: Archive = React.useMemo(() => {
    const result: Archive = {}
    filteredPosts.forEach((post) => {
      if (!post.published_at) return
      const date = new Date(post.published_at)
      const year = String(date.getFullYear())
      const month = date.toLocaleString("nl-NL", { month: "long" })
      if (!result[year]) result[year] = {}
      if (!result[year][month]) result[year][month] = []
      result[year][month].push(post)
    })
    return result
  }, [filteredPosts])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white">
      <div className="content-container py-6 sm:py-8">
        <header className="mb-6 max-w-[760px]">
          <span className="eyebrow">Blog</span>
          <h1 className="display-lg mt-1 text-text-base">
            Nieuws &amp; achtergronden
          </h1>
          <p className="lede mt-2.5">
            Tips, tests en achtergronden over elektrisch laden, kabels en
            installaties.
          </p>
        </header>

        {/* Mobile FAB */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 md:hidden p-3 rounded-full bg-jade text-white shadow-lg hover:bg-[#2a9659] transition-colors"
          aria-label="Zoeken en filteren"
        >
          <Filter className="w-4 h-4" />
        </button>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-3 hidden md:block">
            <div className="surface-card p-4 sticky top-24">
              <p className="eyebrow-muted mb-2.5">Zoeken</p>
              <form onSubmit={handleSearch} className="relative mb-5">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Zoek in blog..."
                  className="input-base pl-9"
                />
              </form>

              <p className="eyebrow-muted mb-2.5">Archief</p>
              <div className="space-y-2 text-[12.5px]">
                {Object.keys(archive)
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map((year) => (
                    <div key={year}>
                      <div className="font-semibold text-text-base mb-1">
                        {year}
                      </div>
                      <ul className="ml-2 space-y-1">
                        {Object.keys(archive[year])
                          .sort((a, b) => {
                            const months = [
                              "januari",
                              "februari",
                              "maart",
                              "april",
                              "mei",
                              "juni",
                              "juli",
                              "augustus",
                              "september",
                              "oktober",
                              "november",
                              "december",
                            ]
                            return months.indexOf(b) - months.indexOf(a)
                          })
                          .map((month) => (
                            <li key={month}>
                              <span className="text-text-muted">
                                {month}{" "}
                                <span className="text-[#a5b3bb]">
                                  ({archive[year][month]?.length ?? 0})
                                </span>
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="md:col-span-9">
            {loading ? (
              <div className="surface-panel py-16 flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-jade border-t-transparent animate-spin mb-3" />
                <span className="text-[13px] text-text-muted">
                  Artikelen laden...
                </span>
              </div>
            ) : paginatedPosts.length === 0 ? (
              <div className="surface-panel py-16 text-center">
                <p className="text-[13.5px] text-text-muted">
                  Geen artikelen gevonden.
                </p>
              </div>
            ) : (
              <ul className="grid sm:grid-cols-2 gap-4">
                {paginatedPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block surface-card overflow-hidden hover:border-[#0f1d24]/30 hover:shadow-md transition-all"
                    >
                      {post.imageUrl && (
                        <div className="aspect-[16/10] overflow-hidden bg-page-soft">
                          <img
                            src={post.imageUrl}
                            alt={post.title ?? "Blog"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-text-muted mb-2">
                          {post.published_at && (
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.published_at).toLocaleDateString(
                                "nl-NL",
                                { day: "numeric", month: "short", year: "numeric" }
                              )}
                            </span>
                          )}
                          {post.authors?.[0] && (
                            <span className="inline-flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.authors[0].name}
                            </span>
                          )}
                        </div>
                        <h2 className="text-[15px] font-semibold text-text-base leading-snug group-hover:text-jade transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <SafeHtml
                            as="p"
                            className="text-[13px] text-text-muted mt-1.5 line-clamp-3 leading-relaxed"
                            html={post.excerpt}
                          />
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag.id}
                                className="text-[10.5px] px-2 py-0.5 rounded-full bg-[#f1f8e9] text-jade font-medium"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8 pt-5 border-t border-border-soft">
                {page > 1 ? (
                  <button
                    className="btn-secondary"
                    onClick={() => setPage(page - 1)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Vorige
                  </button>
                ) : (
                  <span />
                )}
                <span className="text-[12px] text-text-muted">
                  Pagina {page} van {totalPages}
                </span>
                {page < totalPages ? (
                  <button
                    className="btn-secondary"
                    onClick={() => setPage(page + 1)}
                  >
                    Volgende
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span />
                )}
              </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="surface-card p-5">
                <p className="eyebrow-muted mb-2.5">Zoeken</p>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Zoek in blog..."
                    className="input-base pl-9"
                  />
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
