"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "../../../../modules/layout/components/floating-action-button";

// Your existing type definitions
type Tag = { id: string; name: string; };
type Author = { id: string; name: string; };
type Post = {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  published_at?: string | null;
  tags?: Tag[];
  authors?: Author[];
  imageUrl?: string;
};
type Archive = {
  [year: string]: {
    [month: string]: Post[];
  };
};

export default function BlogPage() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const limit = 5;

  useEffect(() => {
    setLoading(true);
    fetch("/api/blog-posts")
      .then(res => res.json())
      .then((posts: Post[]) => {
        setAllPosts(posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts: Post[] = search
    ? allPosts.filter(
        (post: Post) =>
          post.title?.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(search.toLowerCase())
      )
    : allPosts;

  const paginatedPosts: Post[] = filteredPosts.slice((page - 1) * limit, page * limit);
  const totalPages: number = Math.ceil(filteredPosts.length / limit);

  const archive: Archive = React.useMemo(() => {
    const result: Archive = {};
    filteredPosts.forEach((post: Post) => {
      if (!post.published_at) return;
      const date = new Date(post.published_at);
      const year = String(date.getFullYear());
      const month = date.toLocaleString("default", { month: "long" });
      if (!result[year]) result[year] = {};
      if (!result[year][month]) result[year][month] = [];
      result[year][month].push(post);
    });
    return result;
  }, [filteredPosts]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setIsModalOpen(false); // Close modal on search
  };

  const handleMonthClick = () => {
    setSearch("");
    setPage(1);
    setIsModalOpen(false); // Close modal on archive click
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 md:px-8 flex flex-col md:flex-row gap-8">
      {/* Floating Action Button (FAB) for Mobile */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 md:hidden p-4 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Open search and filters"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M16 11a5 5 0 11-10 0 5 5 0 0110 0z"
          />
        </svg>
      </button>

      {/* Sidebar for Desktop */}
      <aside className="w-full md:w-80 bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200 hidden md:block">
        <h2 className="text-lg font-bold mb-4">To Search</h2>
        <form className="mb-8 flex items-center gap-2" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blog..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button type="submit" className="p-2 bg-green-100 rounded hover:bg-green-200" aria-label="Search">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-green-700"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
        </form>
        <h2 className="text-lg font-bold mb-4">Blog Archive</h2>
        <div className="space-y-2 text-sm">
          {/* ... Archive links here, unchanged */}
          {Object.keys(archive).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (
            <div key={year}>
              <div className="font-semibold text-gray-700 mb-1">{year}</div>
              <ul className="ml-2">
                {Object.keys(archive[year]).sort((a, b) => {
                  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                  return months.indexOf(b) - months.indexOf(a);
                }).map(month => (
                  <li key={month} className="mb-1">
                    <button
                      className="hover:underline text-gray-600 bg-transparent border-none p-0 cursor-pointer"
                      onClick={handleMonthClick}
                    >
                      {month} <span className="text-xs text-gray-400">({archive[year][month]?.length ?? 0})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 flex items-center gap-3">
          Blog
        </h1>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-green-500 mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span className="text-gray-500 text-lg font-medium">Loading blog posts...</span>
          </div>
        ) : (
          <ul>
            {paginatedPosts.map((post) => (
              <li key={post.id} className="mb-8 p-4 md:p-6 rounded-lg shadow bg-white border border-gray-200 flex flex-col md:flex-row gap-4">
                {post.imageUrl && (
                  <div className="w-full md:w-48 flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={post.imageUrl}
                      alt={post.title ?? "Blog image"}
                      className="rounded-lg object-cover w-full h-40 md:h-32"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
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
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-10">
          {page > 1 ? (
            <button
              className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded hover:bg-green-50 flex items-center gap-2"
              onClick={() => setPage(page - 1)}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-green-500"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2"/></svg>
              Vorige
            </button>
          ) : <span />}
          {page < totalPages ? (
            <button
              className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded hover:bg-green-50 flex items-center gap-2"
              onClick={() => setPage(page + 1)}
            >
              Volgende
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-green-500"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
          ) : <span />}
        </div>

        {/* Modal with Search for Mobile */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div
            className={`p-6 rounded-xl bg-white shadow-2xl border border-gray-200 transition-all duration-300 ease-in-out
              ${isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{
              boxShadow: "0 8px 32px rgba(16, 185, 129, 0.15)",
              overflow: "hidden",
            }}
          >
            <h2 id="modal-title" className="text-2xl font-extrabold mb-6 text-green-700 flex items-center gap-2">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-green-400">
                <rect x="4" y="8" width="16" height="8" rx="2" fill="currentColor" opacity="0.15"/>
                <path d="M4 12l8 8 8-8V8a2 2 0 00-2-2H6a2 2 0 00-2 2v4z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
              </svg>
                Search
            </h2>
                <form className="mb-2 flex items-center gap-2" onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search blog..."
                  className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-gray-50 text-gray-900 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-white"
                  aria-label="Search"
                  disabled={loading}
                  style={loading ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                >
                  <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  className={loading ? "text-gray-400" : "text-white"}
                  >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
    