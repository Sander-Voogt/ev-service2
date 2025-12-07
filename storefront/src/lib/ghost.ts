import GhostContentAPI, { PagesOrPosts } from "@tryghost/content-api";

// ---- TYPES ----------------------------------------------------

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
}

export interface GhostPage extends PagesOrPosts {
  id: string;
  title: string;
  slug: string;
  html: string;
  tags?: GhostTag[];
}

// ---- API INITIALISATIE ----------------------------------------

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL ?? "",
  key: process.env.GHOST_CONTENT_KEY ?? "",
  version: "v5.0"
});

// ---- HELPDESK ROOT CATEGORIEËN -------------------------------

export async function getHelpdeskCategories(): Promise<GhostPage[]> {
  try {
    return (await api.pages.browse({
      filter: "tag:hash-helpdesk",
      include: "tags",
      limit: "all",
      order: "title ASC"
    })) as GhostPage[];
  } catch (err) {
    console.error("Fout bij ophalen hoofdcategorieën:", err);
    return [];
  }
}

export async function getRootCategories(): Promise<GhostPage[]> {
  try {
    return (await api.pages.browse({
      filter: "tag:hash-helpdesk",
      include: "tags",
      limit: "all",
      order: "title ASC"
    })) as GhostPage[];
  } catch (err) {
    console.error("Fout bij ophalen hoofdcategorieën:", err);
    return [];
  }
}


// ---- INFO PAGINA’S (ONVERANDERD) ------------------------------

export async function getInfoPages(): Promise<GhostPage[]> {
  try {
    return (await api.pages.browse({
      filter: "tag:hash-infopages",
      include: "tags",
      limit: "all",
      order: "title ASC"
    })) as GhostPage[];
  } catch (err) {
    console.error("Fout bij ophalen infopagina’s:", err);
    return [];
  }
}

// ---- PAGINA OP BASIS VAN SLUG --------------------------------

export async function getPageBySlug(slug: string): Promise<GhostPage | null> {
  try {
    return (await api.pages.read({ slug })) as GhostPage;
  } catch (err) {
    return null;
  }
}

/**
 * Jouw originele logica:
 *   `hash-{categorySlug}_sub`
 * 
 * MAAR:
 *   voor oneindige dieptestructuur gebruiken we deze regel:
 * 
 *   Als de HUIDIGE pagina slug `x` is,
 *   dan hebben alle subpagina's de tag `hash-x_sub`
 * 
 */
export async function getSubPages(parentSlug: string): Promise<GhostPage[]> {
  const tagFilter = `hash-${parentSlug}_sub`; // bijv. "hash-betalen_sub"

  try {
    return (await api.pages.browse({
      filter: `tag:${tagFilter}`,
      include: "tags",
      limit: "all",
      order: "title ASC"
    })) as GhostPage[];
  } catch (err) {
    console.error(`Fout bij ophalen subpagina's voor ${tagFilter}:`, err);
    return [];
  }
}

export default api;
