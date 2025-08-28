// app/blog/page.js (Next.js 13+ App Router)
import api from "@lib/ghost";
import Link from "next/link";

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 5;

  const posts = await api.posts.browse({ 
    limit,
    page,
    include: ["tags", "authors"]
  });

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </Link>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </li>
        ))}
      </ul>

      {/* Paginatie */}
      <div className="flex justify-between mt-8">
        {page > 1 && (
          <Link href={`/blog?page=${page - 1}`}>← Vorige</Link>
        )}
        {posts.meta.pagination.page < posts.meta.pagination.pages && (
          <Link href={`/blog?page=${page + 1}`}>Volgende →</Link>
        )}
      </div>
    </div>
  );
}
