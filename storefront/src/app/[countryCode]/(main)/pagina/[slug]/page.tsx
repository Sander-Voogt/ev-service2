import { getPageBySlug, getHelpdeskCategories, getInfoPages, getSubPages } from '@lib/ghost';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SafeHtml from '@modules/common/components/safe-html';
import './style.css'
// 1. Statische Padgeneratie (Next.js generateStaticParams)
// Dit zorgt ervoor dat Next.js alle hoofdcategorie-pagina's kent voor de build.
export const dynamic = "force-static";
export async function generateStaticParams() {
  const categories = await getInfoPages();

  // Retourneer een array van slug-objecten
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// 2. De Categorie Pagina Component
export default async function CategoryPage({ params }) {
  const categorySlug = params.slug;

  // Haal de hoofdinhoud van de categoriepagina op
  const pageContent = await getPageBySlug(categorySlug);
  

  if (!pageContent) {
    notFound(); // Toon de 404 pagina als de categorie niet bestaat
  }

  return (
    <div className="content-container prose">
      <h1>{pageContent.title}</h1>

      {/* 1. Hoofdcontent van de categoriepagina */}
      <SafeHtml
        className="page-content prose max-w-[80%]"
        html={pageContent.html}
      />
    </div>
  );
}