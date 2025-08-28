// app/blog/[slug]/page.js

import api from "@lib/ghost";

export async function generateStaticParams() {
  const posts = await api.posts.browse({ limit: "all" });
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetail({ params } : {params: any}) {
  const post = await api.posts.read({ slug: params.slug });

  return (
    <article className="max-w-3xl mx-auto prose">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
