import { getCategoryPage, getHelpdeskCategories, getInfoPages, getSubPages } from '@lib/ghost';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import './style.css'
// 1. Statische Padgeneratie (Next.js generateStaticParams)
// Dit zorgt ervoor dat Next.js alle hoofdcategorie-pagina's kent voor de build.
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
  const pageContent = await getCategoryPage(categorySlug);
  

  if (!pageContent) {
    notFound(); // Toon de 404 pagina als de categorie niet bestaat
  }

  return (
    <div className="content-container prose">
      <h1>{pageContent.title}</h1>

      {/* 1. Hoofdcontent van de categoriepagina */}
      <div 
        className="page-content prose" style={{maxWidth: '80%'}}
        dangerouslySetInnerHTML={{ __html: pageContent.html }} 
      />
    </div>
  );
}