// app/blog/page.js (Next.js 13+ App Router)
import api from "@lib/ghost";
import Link from "next/link";

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 5;
  const search = searchParams.search || "";

  // Fetch all posts for search and archive (could be optimized for large blogs)
  const allPosts = await api.posts.browse({
    limit: "all",
    include: ["tags", "authors"]
  });
  // Filter posts by search
  const filteredPosts = search
    ? allPosts.filter(
        post =>
          post.title?.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(search.toLowerCase())
      )
    : allPosts;

  // Pagination on filtered posts
  const paginatedPosts = filteredPosts.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredPosts.length / limit);

  // Archive: group posts by year/month
  const archive: Record<string, Record<string, typeof filteredPosts>> = {};
  filteredPosts.forEach(post => {
    if (!post.published_at) return;
    const date = new Date(post.published_at);
    const year = String(date.getFullYear());
    const month = date.toLocaleString("default", { month: "long" });
    if (!archive[year]) archive[year] = {};
    if (!archive[year][month]) archive[year][month] = [];
    archive[year][month].push(post);
  });

  return (
    <div className="max-w-7xl mx-auto py-8 flex gap-8">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-bold mb-4">To Search</h2>
        <form method="get" action="/blog" className="mb-8 flex items-center gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search blog..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button type="submit" className="p-2 bg-green-100 rounded hover:bg-green-200" aria-label="Search">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-green-700"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
        </form>
        <h2 className="text-lg font-bold mb-4">Blog Archive</h2>
        <div className="space-y-2 text-sm">
          {Object.keys(archive).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
            <div key={year}>
              <div className="font-semibold text-gray-700 mb-1">{year}</div>
              <ul className="ml-2">
                {Object.keys(archive[year]).sort((a, b) => {
                  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                  return months.indexOf(b) - months.indexOf(a);
                }).map(month => (
                  <li key={month} className="mb-1">
                    <Link href={`/blog?search=${search}&year=${year}&month=${month}`}
                      className="hover:underline text-gray-600">
                      {month} <span className="text-xs text-gray-400">({archive[year][month]?.length ?? 0})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 flex items-center gap-3">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-green-500" aria-label="Blog icon">
            <rect x="3" y="4" width="18" height="16" rx="2" fill="currentColor" opacity="0.15"/>
            <rect x="5" y="6" width="14" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
            <rect x="7" y="8" width="10" height="2" rx="1" fill="currentColor"/>
            <rect x="7" y="12" width="7" height="2" rx="1" fill="currentColor"/>
            <circle cx="18" cy="14" r="1" fill="currentColor"/>
            <rect x="7" y="16" width="5" height="1.5" rx="0.75" fill="currentColor"/>
          </svg>
          Blog
        </h1>
        <ul>
          {paginatedPosts.map((post) => (
            <li key={post.id} className="mb-8 p-6 rounded-lg shadow bg-white border border-gray-200">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-green-400" aria-label="Tag icon">
                    <rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" opacity="0.15"/>
                    <path d="M4 12l8 8 8-8V8a2 2 0 00-2-2H6a2 2 0 00-2 2v4z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                  {post.title}
                </h2>
              </Link>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags?.map(tag => (
                  <span key={tag.id} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">#{tag.name}</span>
                ))}
                {post.authors?.map(author => (
                  <span key={author.id} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium flex items-center gap-1">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="inline text-green-500"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20v-2a8 8 0 0116 0v2" stroke="currentColor" strokeWidth="2"/></svg>
                    {author.name}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-gray-800" dangerouslySetInnerHTML={{ __html: post.excerpt ?? "" }} />
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-10">
          {page > 1 ? (
            <Link href={`/blog?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ""}`} className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded hover:bg-green-50 flex items-center gap-2">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-green-500"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2"/></svg>
              Vorige
            </Link>
          ) : <span />}
          {page < totalPages ? (
            <Link href={`/blog?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ""}`} className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded hover:bg-green-50 flex items-center gap-2">
              Volgende
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-green-500"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/></svg>
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
