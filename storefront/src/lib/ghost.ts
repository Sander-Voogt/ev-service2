// lib/ghost.js
import GhostContentAPI from "@tryghost/content-api";

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL ?? '', // bv. "https://your-ghost-site.com"
  key: process.env.GHOST_CONTENT_KEY ?? '',
  version: "v5.0" // gebruik de juiste versie
});

export default api;
