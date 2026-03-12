# USA Pest Control Quote — TODO

## Avant mise en ligne
- [ ] GA4 : remplacer `G-VLTS29LH71` (plomberie) par le vrai ID pest control dans `app/layout.tsx`
- [ ] Téléphone : remplacer `(000) 000-0000` par le vrai numéro MarketCall dans `lib/niche.ts`
- [ ] Logo SVG : adapter l'icône dans `components/Header.tsx` (actuellement icône plomberie)
- [ ] `PlumbingCitySchema` inutilisé : supprimer dans `app/[service]/[state]/[city]/page.tsx`

## Performance / SEO
- [ ] Investiguer pourquoi critters + optimizeCss ne supprime pas le CSS bloquant ; comparer avec la config du site plomberie quand il avait 100/100

## Après mise en ligne
- [ ] Cloudflare : pointer nameservers Porkbun → Cloudflare pour usa-pest-control-quote.com
- [ ] Nginx VPS : configurer reverse proxy port 3001
- [ ] Déployer sur VPS (SCP + build + pm2)
- [ ] Vérifier robots.txt (désactiver "Manage your robots.txt" dans Cloudflare comme pour le site plomberie)
- [ ] Ajouter `pest-control-quote` dans le dispatcher `getServiceCityPageContent` si pages ville souhaitées

## Business / Monétisation
- [ ] Installer Ringba comme couche intermédiaire entre le site et MarketCall
- [ ] Analyser rapport détaillé des appels MarketCall (durée, disposition, état)
- [ ] Contacter Service Direct et Modernize — demander CPL pour niches home services
- [ ] Évaluer passage publisher → réseau (recruter contractors directs) quand volume suffisant

## Contenu à vérifier
- [ ] `lib/censusData.ts` : vérifier les références plomberie dans `generateCityContextByService`
- [ ] `app/privacy-policy/page.tsx` et `app/terms-of-use/page.tsx` : adapter le nom du site
- [ ] `app/llms.txt/route.ts` : adapter le contenu
- [ ] `data/` : vérifier si les données état contiennent `plumbing_impact` ; si oui, renommer ou mapper vers `pest_impact`
- [ ] Adapter `getClimateContent` (lib/censusData.ts) et le JSON des données état quand celles-ci sont mises à jour pour pest control
- [ ] Quand les données état seront mises à jour pour pest control : renommer `plumbing_impact` → `pest_impact` dans le JSON, et adapter les lignes 33 et 286-288 de `lib/censusData.ts`
