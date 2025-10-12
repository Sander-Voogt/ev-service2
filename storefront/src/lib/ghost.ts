// lib/ghost.js
import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL ?? '', // bv. "https://your-ghost-site.com"
  key: process.env.GHOST_CONTENT_KEY ?? '',
  version: "v5.0" // gebruik de juiste versie
});

// 1. Functie voor de Index Pagina en generateStaticParams
export async function getHelpdeskCategories() {
  try {
    const pages = await api.pages.browse({
      filter: 'tag:hash-helpdesk', // Filter op de 'helpdesk' tag
      include: 'tags',
      limit: 'all',
      order: 'title ASC' // Sorteren op titel is vaak handig voor categorieën
    });
    return pages;
  } catch (err) {
    console.error("Fout bij ophalen hoofdcategorieën:", err);
    return [];
  }
}

export async function getInfoPages() {
  try {
    const pages = await api.pages.browse({
      filter: 'tag:hash-infopages', // Filter op de 'helpdesk' tag
      include: 'tags',
      limit: 'all',
      order: 'title ASC' // Sorteren op titel is vaak handig voor categorieën
    });
    return pages;
  } catch (err) {
    console.error("Fout bij ophalen hoofdcategorieën:", err);
    return [];
  }
}

// 2. Functie voor de specifieke Categorie Pagina
export async function getCategoryPage(slug) {
  try {
    const page = await api.pages.read({ slug });
    return page;
  } catch (err) {
    console.error(`Fout bij ophalen categoriepagina met slug ${slug}:`, err);
    return null;
  }
}

// 3. Functie voor de onderliggende Subpagina's
export async function getSubPages(categorySlug) {
  const tagFilter = `hash-${categorySlug}_sub`; // Bijv. 'faq-sub'
  try {
    const pages = await api.pages.browse({
      filter: `tag:${tagFilter}`, // Filter op de unieke subpagina tag
      include: 'tags',
      limit: 'all',
      order: 'title ASC'
    });
    return pages;
  } catch (err) {
    console.error(`Fout bij ophalen subpagina's voor ${tagFilter}:`, err);
    return [];
  }
}

export default api;
