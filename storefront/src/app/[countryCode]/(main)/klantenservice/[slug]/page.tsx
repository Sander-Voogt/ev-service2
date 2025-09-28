import { getCategoryPage, getHelpdeskCategories, getSubPages } from '@lib/ghost';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import './style.css'
// 1. Statische Padgeneratie (Next.js generateStaticParams)
// Dit zorgt ervoor dat Next.js alle hoofdcategorie-pagina's kent voor de build.
export async function generateStaticParams() {
  const categories = await getHelpdeskCategories();

  console.log('hahha', categories)
  
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
  
  // Haal de subpagina's op met de dynamische tag-filter
  const subPages = await getSubPages(categorySlug); 

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

      {/* 2. Lijst met onderliggende subpagina's */}
      {subPages.length > 0 && (
        <div className="sub-pages-list">
          <h2>Gerelateerde Artikelen</h2>
          <ul>
            {subPages.map((subPage) => (
              <li key={subPage.id}>
                {/* Opmerking: Je moet een route creëren voor de subpagina's. 
                  Voor nu linken we naar de slug. Dit vereist een extra [subslug] route 
                  of het gebruik van een andere paginatag in Ghost (bijv. 'subpagina').
                */}
                <Link href={`/klantenservice/${params.slug}/${subPage.slug}`}> 
                  {subPage.title}
                </Link>
                {/* <p>{subPage.excerpt}</p> */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {subPages.length === 0 && (
        <p>Er zijn nog geen subpagina's voor deze categorie.</p>
      )}
    </div>
  );
}