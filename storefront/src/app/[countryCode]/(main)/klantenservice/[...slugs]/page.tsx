import { getPageBySlug, getSubPages, getRootCategories, GhostPage } from "lib/ghost";
import { notFound } from "next/navigation";
import Link from "next/link";
import "../style.css";

interface HelpdeskPageParams {
  params: {
    slugs: string[];
  };
}

// Static params (alleen eerste niveau)
export async function generateStaticParams(): Promise<{ slugs: string[] }[]> {
  const roots = await getRootCategories();
  return roots.map(root => ({
    slugs: [root.slug]
  }));
}

export default async function HelpdeskPage({ params }: HelpdeskPageParams) {
  const slugs = params.slugs;
  const currentSlug = slugs[slugs.length - 1];

  // 1. Haal huidige pagina op
  const page: GhostPage | null = await getPageBySlug(currentSlug);
  if (!page) notFound();

  // 2. Subpagina's ophalen
  const subPages = await getSubPages(currentSlug);

  // 3. Breadcrumb aanmaken
  const breadcrumb = slugs.map((slug, index) => ({
    label: slug,
    href: `/klantenservice/${slugs.slice(0, index + 1).join("/")}`
  }));

  return (
    <div className="content-container prose">

      {/* ----- Breadcrumb ----- */}
      <nav className="breadcrumb mb-4 text-sm opacity-70">
        {breadcrumb.map((b, i) => (
          <span key={b.href}>
            <Link href={b.href}>{b.label}</Link>
            {i < breadcrumb.length - 1 && " / "}
          </span>
        ))}
      </nav>

      {/* ----- Titel ----- */}
      <h1>{page.title}</h1>

      {/* ----- HTML content ----- */}
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      {/* ----- Subpagina lijst ----- */}
      <div className="sub-pages mt-10">
        {subPages.length > 0 ? (
          <>
            <h2>Gerelateerde artikelen</h2>
            <ul>
              {subPages.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/klantenservice/${[...slugs, sub.slug].join("/")}`}
                  >
                    {sub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Geen verdere artikelen.</p>
        )}
      </div>
    </div>
  );
}
