// app/blog/page.js (Next.js 13+ App Router)


"use client";
import React, { useState, useEffect } from "react";
// import api from "@lib/ghost";
import Link from "next/link";

type Tag = {
  id: string;
  name: string;
};

type Author = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  published_at?: string | null;
  tags?: Tag[];
  authors?: Author[];
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

  // Archive: group posts by year/month
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
  };

  return (
    <div className="max-w-7xl mx-auto py-8 flex gap-8">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-50 rounded-lg p-6 border border-gray-200">
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
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
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
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 flex items-center gap-3">
          Blog
        </h1>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-green-500 mb-4" viewBox="0 0 24 24">
                <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                />
                <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-gray-500 text-lg font-medium">Loading blog posts...</span>
            </div>
        ) : (
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
      </div>
    </div>
  );
}
