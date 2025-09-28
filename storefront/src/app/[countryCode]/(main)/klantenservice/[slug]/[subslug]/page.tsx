import { getCategoryPage } from '@lib/ghost';
import { notFound } from 'next/navigation';
import './style.css'

// generateStaticParams wordt hier weggelaten voor eenvoud, 
// wat betekent dat de subpagina's On-Demand worden gerenderd (ISR/SSR).
// Het genereren van ALLE mogelijke paden (categorySlug + subslug) is complex 
// en vaak niet nodig voor een helpdesk.

export default async function SubPage({ params }) {
  // We gebruiken de laatste slug (de subslug) om de pagina-content op te halen.
  const subSlug = params.subslug; 
  // De countryCode en categorySlug zijn ook beschikbaar in params, maar niet nodig 
  // voor de API-aanroep van Ghost.

  // Hergebruik de functie om een enkele pagina op te halen.
  const pageContent = await getCategoryPage(subSlug);

  if (!pageContent) {
    // Dit geeft nu een 404 als de subpagina niet bestaat
    notFound();
  }

  return (
    <div className="content-container">
      <h1 className='font-semibold text-2xl'>{pageContent.title}</h1>
      <div 
        className="page-content prose" 
        dangerouslySetInnerHTML={{ __html: pageContent.html }} 
      />
    </div>
  );
}