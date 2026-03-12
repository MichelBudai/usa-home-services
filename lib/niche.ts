/**
 * NICHE — exporte les valeurs dynamiques selon le domaine.
 * La config source est dans /config/sites/*.ts
 */
import { getCurrentSiteConfig } from "./getSiteConfig";

export function getNiche() {
  return getCurrentSiteConfig();
}

// Pour compatibilité avec le code existant qui importe SERVICE_SLUGS etc.
// Ces exports sont statiques — ils seront remplacés progressivement
export { getCurrentSiteConfig };
