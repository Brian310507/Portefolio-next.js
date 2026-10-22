# 🔧 Rapport de correction — Bugs & Affichage

> **Projet :** `nextjs-portfolio-v2` — Portfolio d'Alexandre ROQUES  
> **Date de l'intervention :** 22/10/2026  
> **Périmètre :** Correction des bugs bloquants, bugs fonctionnels et problèmes d'affichage générale  
> **Résultat final :** `next lint` → 0 erreur · `next build` → 14/14 pages OK · test serveur → toutes les routes en HTTP 200

---

## 📑 Sommaire

1. [État du projet avant intervention](#1-état-du-projet-avant-intervention)
2. [Erreurs bloquantes (build impossible)](#2-erreurs-bloquantes-build-impossible)
3. [Bugs fonctionnels](#3-bugs-fonctionnels)
4. [Bugs et défauts d'affichage](#4-bugs-et-défauts-daffichage)
5. [Section Actualités IA (qualité des données)](#5-section-actualités-ia-qualité-des-données)
6. [Tableau récapitulatif de tous les correctifs](#6-tableau-récapitulatif-de-tous-les-correctifs)
7. [Validation effectuée](#7-validation-effectuée)
8. [Points d'attention / configuration requise](#8-points-dattention--configuration-requise)
9. [Pistes pour la phase de modernisation](#9-pistes-pour-la-phase-de-modernisation)

---

## 1. État du projet avant intervention

- **Stack :** Next.js 13.4.15 (App Router), React 18, Tailwind CSS 3.3, Framer Motion, Resend.
- **Constat :** `npm run build` **échouait** (erreurs ESLint + erreur runtime sur l'API `/api/send`).
- Plusieurs liens renvoyaient en 404, la section « Actualités IA » affichait des articles hors-sujet, et le layout était cassé sur mobile.

---

## 2. Erreurs bloquantes (build impossible)

### 2.1 — 12 erreurs ESLint `react/no-unescaped-entities`

Les apostrophes françaises directement dans le JSX déclenchent des erreurs ESLint qui bloquent `next build`.

| Fichier | Ligne(s) | Texte en cause |
|---|---|---|
| `src/app/components/AboutSection.jsx` | 34, 61, 63, 64 | `d'applications`, `J'ai`, `m'intéresse`, `d'apprendre` |
| `src/app/components/AlternanceSection.jsx` | 17, 32, 33, 79 | `d'Alternance`, `jusqu'en`, `d'acquérir`, `d'apprentissage et d'innovation` |
| `src/app/components/EmailSection.jsx` | 53, 54 | `d'alternance`, `N'hésitez` |
| `src/app/components/HeroSection.jsx` | 42 | `m'efforce` |

**Correctif :** remplacement des apostrophes par l'entité HTML échappée `&apos;` (norme JSX).

```jsx
<!-- Avant -->
<li>Développement d'applications web avec React et Next.js</li>

<!-- Après -->
<li>Développement d&apos;applications web avec React et Next.js</li>
```

### 2.2 — `<Image>` sans attribut `alt` (warning `jsx-a11y/alt-text`)

- **Fichier :** `src/app/components/AboutSection.jsx`
- **Avant :** `<Image src="/images/computer-image.png" width={500} height={500} />`
- **Après :** image avec `alt="Poste de travail avec un ordinateur"` et `className="w-full h-auto rounded-lg"` (accessibilité + responsive).

### 2.3 — `/api/send` faisait planter le build ❌ critique

**Symptôme :**
```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
> Build error occurred
Error: Failed to collect page data for /api/send
```

**Cause :** `const resend = new Resend(process.env.RESEND_API_KEY)` était exécuté **au niveau module** → Next.js évalue ce module pendant la collecte des données de pages, et le constructeur `Resend` lève une exception si la clé est absente.

**Correctif (`src/app/api/send/route.js`) :**
- Initialisation **paresseuse** via `getResendClient()` qui retourne `null` si la clé est absente.
- Validation du corps de requête (JSON invalide → 400).
- Réponse 500 propre si `RESEND_API_KEY` ou `FROM_EMAIL` manque.
- `try/catch` avec message d'erreur générique (l'erreur interne n'est plus exposée au client).
- Signature corrigée : `POST(req)` au lieu de `POST(req, res)` (style Pages Router) + suppression du `console.log` des données utilisateur.

---

## 3. Bugs fonctionnels

### 3.1 — Liens sociaux cassés (404)

- **Fichier :** `src/app/components/EmailSection.jsx`
- **Avant :** `<Link href="github.com">` et `<Link href="linkedin.com">` → sans `https://`, Next.js traite ça comme un **chemin relatif** → redirection vers `/github.com` et `/linkedin.com` → **404**.
- **Après :**
  ```jsx
  <Link href="https://github.com/Brian310507" target="_blank" rel="noopener noreferrer" aria-label="Profil GitHub">
  <Link href="https://www.linkedin.com/in/alexandre-roques-73b070297/" target="_blank" rel="noopener noreferrer" aria-label="Profil LinkedIn">
  ```
- LinkedIn provient de `blocs/bloc6/page.jsx` ; GitHub correspond au compte du remote git — **à confirmer**.

### 3.2 — Formulaire de contact sans gestion d'erreur

- **Fichier :** `src/app/components/EmailSection.jsx`
- **Avant :** `fetch()` sans `try/catch` → rejet de promesse non géré en cas d'échec réseau ; aucune erreur affichée à l'utilisateur ; variable `resData` inutilisée.
- **Après :**
  - `try/catch/finally` avec états `submitError` et `submitting`.
  - Message d'erreur affiché (`role="alert"`) + bouton désactivé « Envoi en cours... ».
  - Champ `message` désormais `required` + `rows={5}`.

### 3.3 — Lien PDF cassé (fichier inexistant)

- **Fichier :** `src/app/blocs/tableau-competence/page.jsx`
- **Avant :** `href="/pdfs/Tableau-competence-E4.pdf"` → dossier `public/pdfs/` **n'existe pas**.
- **Après :** `href="/images/tableauCompetence/tableau-compétences-E5.pdf"` (fichier réellement présent).

### 3.4 — `next/image` : domaines distants non configurés

- **Fichiers :** `src/app/components/NewsSection.js`, `next.config.js`
- **Cause :** les images des flux RSS proviennent de domaines variés non déclarés → le routeur `/_next/image` refuse → images cassées.
- **Correctifs :**
  - `unoptimized` sur les images du `NewsSection` (domaines variables, évite toute restriction).
  - Ajout des domaines `www.lemonde.fr`, `media.lemonde.fr`, `static.numerama.com` dans `next.config.js` par sécurité.
  - `onError` sécurisé (`img.nextSibling?`) pour basculer sur l'image de fallback sans crash.
  - Suppression du doublon `className` + `style` sur la div de fallback.

---

## 4. Bugs et défauts d'affichage

### 4.1 — `lang="en"` + metadata par défaut

- **Fichier :** `src/app/layout.js`
- **Avant :** `<html lang="en">`, title « Create Next App », description « Generated by create next app ».
- **Après :**
  ```jsx
  <html lang="fr">
  export const metadata = {
    title: 'Alexandre ROQUES | Portfolio – Étudiant en développement web',
    description: "Portfolio d'Alexandre ROQUES, étudiant en développement web et applicatif : projets, compétences, réalisations par blocs et contact.",
  };
  ```

### 4.2 — Hero : débordement horizontal sur mobile ❌

- **Fichier :** `src/app/components/HeroSection.jsx`
- **Cause :** grille `grid-cols-1` en mobile avec des items en `col-span-8` / `col-span-4` → CSS crée des **colonnes implicites** → mise en page cassée / scroll horizontal.
- **Correctif :**
  - Texte : `col-span-12 sm:col-span-8`
  - Image : `col-span-12 sm:col-span-4`

### 4.3 — Image du hero qui déborde du cercle

- **Cause :** conteneur `250px` en mobile mais `Image` en `width={300}`.
- **Correctif :** `max-w-full max-h-full w-auto h-auto object-contain` + `priority` (image LCP).

### 4.4 — Fond blanc parasite (thème sombre)

- **Fichier :** `src/app/globals.css`
- **Cause :** dégradé `linear-gradient(to bottom, transparent, white)` sur le `body` en mode clair → flash blanc au chargement et fond blanc hors du `<main>`.
- **Correctif :** `background-color: #121212` fixe, texte blanc, + `html { scroll-behavior: smooth }` pour les ancres `#about` / `#contact`.

### 4.5 — Paddings non responsive (layout serré sur mobile)

- **Fichiers :** `src/app/page.js` + les 7 pages `src/app/blocs/*/page.jsx`
- **Avant :** `container ... px-12` (48 px de chaque côté, soit 96 px perdus sur petit écran).
- **Après :** `px-4 sm:px-8 lg:px-12`.
- Idem `AchievementsSection.jsx` : `px-16` → `px-4 sm:px-8 xl:px-16` + `flex-wrap`.

### 4.6 — Navbar : menus qui ne se ferment jamais

- **Fichiers :** `Navbar.jsx` (+ `NavLink.jsx`, `MenuOverlay.jsx`)
- **Problèmes :**
  1. Le dropdown des Blocs restait ouvert après un clic à l'extérieur.
  2. Il restait ouvert après le clic sur un lien du dropdown.
  3. Le menu mobile restait ouvert après navigation (les liens en `#anchor` ne démontent pas la page).
  4. Boutons sans accessibilité (pas d'`aria-label`).
  5. Bordure `border` sur les 4 côtés de la nav → trait disgracieux.
- **Correctifs :**
  - `useRef` + `useEffect` avec listener `mousedown` pour fermer au clic extérieur.
  - `onClick={() => setDropdownOpen(false)}` sur les liens du dropdown.
  - Propagation `onLinkClick` : `Navbar → MenuOverlay → NavLink` pour fermer le menu mobile.
  - `aria-label`, `aria-expanded`, `aria-haspopup` sur le bouton dropdown ; `aria-label` sur les burgers.
  - `border` → `border-b`, suppression de `bg-opacity-100` inutile, libellé « Blocs » visible en `lg`.

### 4.7 — Footer obsolète / illisible

- **Fichier :** `src/app/components/Footer.jsx`
- **Avant :** « © 2024 » en dur, `text-slate-600` (quasi invisible sur fond `#121212`).
- **Après :** `© {new Date().getFullYear()}` dynamique, couleur `#ADB7BE`, disposition `flex-col sm:flex-row` responsive.

---

## 5. Section Actualités IA (qualité des données)

### 5.1 — Filtre IA inefficace ❌

- **Fichier :** `src/app/api/news/alternative/route.js`
- **Cause :** `text.includes('ia')` / `includes('ai')` matche ces sous-chaînes **n'importe où dans un mot** (ex. « v**rai**ment », « f**ai**lles »).
- **Mesure :** test sur les flux réels → **45/45 articles** considérés comme « IA » (météo, Orange, émeutes…).
- **Correctif :** matching par **mot entier** avec regex `\b...\b` :
  ```js
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
  ```
- **Après correction :** 7/45 sur les 3 flux d'origine, **22/100** sur le flux Google News IA → pertinence réelle.

### 5.2 — Sources insuffisantes / mono-source

- **Ajout :**
  - `Google News - IA` (recherche FR : « intelligence artificielle » OR « IA » OR ChatGPT) → ~22 articles IA pertinents par jour.
  - `Frandroid`.
- **Plafond de 8 articles par source** avant fusion + tri par date + limite globale à 20 → une seule source ne domine plus la section.

### 5.3 — Badge source toujours « RSS Feed »

- `parseRSS(xmlText)` ne recevait pas le nom de la source.
- **Correctif :** `parseRSS(xmlText, source.name)` → badge affichant « Numerama », « Le Monde - Tech », etc.
- Pour Google News, extraction du vrai média depuis le suffixe du titre (« Titre - Source ») → sources réelles : « ActuIA », « France TV », « Boursorama »…
- Badge tronqué côté front : `max-w-[60%] + truncate` pour ne pas casser la carte.

### 5.4 — CDATA et HTML bruts dans les descriptions

- **Avant :** descriptions contenant `<![CDATA[...]]>` et du HTML échappé (`<a href...>`).
- **Correctif dans `cleanHtmlEntities()` :**
  - déballage des CDATA (`<!\[CDATA\[([\s\S]*?)\]\]>`),
  - suppression des balises HTML (avant **et après** décodage des entités),
  - nouveaux décodeurs : `&rsquo;`, `&lsquo;`, `&#039;`, `&#8220;`, `&#8221;`, `&#8230;`, `&hellip;`,
  - compression des espaces multiples (`\s+` → `' '`).
- **Ordre important :** l'extraction d'image se fait **avant** le nettoyage (`extractImageFromContent(rawDescription)`), sinon les balises `<img>` sont déjà supprimées.

### 5.5 — Extraction d'images enrichie

- Ajout de la reconnaissance `media:content` / `enclosure` (`url="..."`), utile pour les flux RSS modernes.

### 5.6 — Liens d'ouverture des cartes

- Les articles de secours ont `url: '#'` → `target="_blank"` ouvrait un onglet vide.
- **Correctif :** `target={article.url && article.url !== '#' ? '_blank' : undefined}`.

### 5.7 — 🐛 Cartes d'actualités invisibles (opacité à 0)

**Symptôme :** les articles sont bien présents (réponse API et DOM), mais **aucune carte n'est visible** sur la page.

**Cause racine (confirmée dans `node_modules/framer-motion/dist/es/utils/use-in-view.mjs`) :**

```js
function useInView(ref, { once = false } = {}) {
    const [isInView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current || (once && isInView)) return;  // ← 1er rendu : ref.current === null
        ...
        return inView(ref.current, onEnter, options);
    }, [root, ref, margin, once]);   // ← deps STABLES : ne se ré-exécute JAMAIS
    return isInView;
}
```

- Pendant le chargement, `NewsSection` retourne un spinner **sans le `<ul ref={ref}>`** → `ref.current === null` au moment de l'exécution de l'effet → **aucun `IntersectionObserver` n'est créé**.
- Quand les données arrivent, le `<ul>` monte et le ref se remplit, mais les dépendances de l'effet (`root, ref, margin, once`) sont stables → **l'effet ne se ré-exécute pas**.
- `isInView` reste donc `false` à vie → les cartes restent dans l'état `initial` = `{ y: 50, opacity: 0 }` → **100 % invisibles**.

**Correctif (`src/app/components/NewsSection.js`) :**
- Suppression du couplet `useRef` + `useInView` + `cardVariants`.
- Utilisation de **`whileInView`** : l'observateur est créé **par chaque `motion.li` à son propre montage**, donc robuste au rendu conditionnel :
  ```jsx
  <motion.li
    key={article.id}
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.08 }}
  >
  ```
- Le `delay` est plafonné (`Math.min(index, 8)`) pour éviter d'attendre ~2 s avant l'affichage des dernières cartes.

> ⚠️ **Note :** `ProjectsSection.jsx` utilise encore l'ancien pattern `useInView`, mais il n'est **pas affecté** car son `<ul ref={ref}>` est rendu dès le premier commit (et le composant n'est pas utilisé dans `page.js` actuellement).

### 5.8 — Cartes sans illustration quasi noires

**Symptôme :** les articles sans image (Google News ne fournit pas d'illustration) affichaient un bloc `from-blue-900/20 to-purple-900/20` avec icône grise → quasi invisible sur le fond `#1d1d1d`.

**Correctifs :**
- Fallback rehaussé : `bg-gradient-to-br from-blue-900/60 via-indigo-900/50 to-purple-900/60`, icône `text-blue-300` + nom de la source en `text-blue-200`.
- **Entrelacement des sources** dans `fetchNewsFromRSS()` : au tri exclusivement par date, les articles Google News (les plus récents, sans image) dominaient la sélection. Désormais les 5 sources alternent → mélange fraîcheur + illustrations.
- **Résultat mesuré :** 20 articles dont **13 avec image / 7 sans**, toutes les sources représentées (Numerama, 01net, Frandroid, ActuIA, France TV…).

---

## 6. Tableau récapitulatif de tous les correctifs

| # | Type | Fichier(s) | Bug | Correctif |
|---|---|---|---|---|
| 1 | 🔴 Build | `AboutSection`, `AlternanceSection`, `EmailSection`, `HeroSection` | 12 erreurs apostrophes JSX | `&apos;` |
| 2 | 🔴 Build | `AboutSection.jsx` | `<Image>` sans `alt` | `alt` ajouté + responsive |
| 3 | 🔴 Build | `api/send/route.js` | `new Resend()` au module scope → build KO | Initialisation paresseuse + erreurs 400/500 |
| 4 | 🟠 Fct. | `EmailSection.jsx` | Liens sociaux relatifs → 404 | URLs `https://` complètes |
| 5 | 🟠 Fct. | `EmailSection.jsx` | Formulaire sans gestion d'erreur | `try/catch`, états, message d'erreur |
| 6 | 🟠 Fct. | `tableau-competence/page.jsx` | Lien PDF inexistant | Chemin réel corrigé |
| 7 | 🟠 Fct. | `NewsSection.js` + `next.config.js` | Images distantes refusées | `unoptimized` + domaines ajoutés |
| 8 | 🟠 Fct. | `layout.js` | `lang="en"` + metadata par défaut | `lang="fr"` + metadata réelles |
| 9 | 🟡 Aff. | `HeroSection.jsx` | `col-span-8/4` sur 1 colonne → overflow mobile | `col-span-12 sm:col-span-*` |
| 10 | 🟡 Aff. | `HeroSection.jsx` | Image 300 px dans cercle 250 px | `max-w/max-h + object-contain` |
| 11 | 🟡 Aff. | `globals.css` | Dégradé blanc sur `body` | Fond `#121212` fixe + smooth scroll |
| 12 | 🟡 Aff. | `page.js` + 7 pages blocs + `AchievementsSection` | `px-12`/`px-16` non responsive | Breakpoints `px-4 sm:px-8 lg:px-12` |
| 13 | 🟡 Aff. | `Navbar` + `NavLink` + `MenuOverlay` | Menus jamais fermés, pas d'aria | Clic extérieur, fermeture à la navigation, aria |
| 14 | 🟡 Aff. | `Footer.jsx` | © 2024 figé, texte illisible | Année dynamique + contraste |
| 15 | 🟠 Contenu | `api/news/alternative/route.js` | Filtre IA matchait tout (45/45) | Regex mot entier `\b` |
| 16 | 🟠 Contenu | `api/news/alternative/route.js` | Sources pauvres / mono-source | Google News IA + Frandroid, plafond 8/source |
| 17 | 🟠 Contenu | `api/news/alternative/route.js` | Badge source = « RSS Feed » | Nom de source réel + parsing Google News |
| 18 | 🟠 Contenu | `api/news/alternative/route.js` | CDATA/HTML bruts dans les textes | Nettoyage complet + 2 passes de strip |
| 19 | 🟠 Contenu | `api/news/alternative/route.js` | Images non extraites après nettoyage | Extraction **avant** nettoyage + `media:content` |
| 20 | 🟡 Aff. | `NewsSection.js` | Onglet vide sur `url:'#'`, badge source débordant | `target` conditionnel + `truncate` |
| 21 | 🔴 Visibilité | `NewsSection.js` | **Cartes d'actualités invisibles** (`opacity: 0` — `useInView` jamais déclenché) | Remplacement par `whileInView` (observateur monté avec chaque carte) |
| 22 | 🟡 Aff. | `NewsSection.js` + `api/news/alternative/route.js` | Cartes sans image quasi noires + mono-source | Fallback contrasté + entrelacement des 5 sources |

**Légende :** 🔴 bloquait le build ou la visibilité · 🟠 bug fonctionnel · 🟡 défaut d'affichage/UX

---

## 7. Validation effectuée

| Contrôle | Commande | Résultat |
|---|---|---|
| Lint | `npx next lint` | ✅ `✔ No ESLint warnings or errors` |
| Build production | `npx next build` | ✅ 14/14 pages générées, exit code 0 |
| Page d'accueil | `GET /` | ✅ 200 — `lang="fr"`, bon `<title>`, liens sociaux présents |
| Pages blocs | `GET /blocs/bloc1…bloc6`, `/blocs/tableau-competence` | ✅ 200 |
| API actualités | `GET /api/news/alternative` | ✅ 200 — 20 articles entrelacés (13 avec image / 7 sans), sources réelles |
| Visibilité cartes | Vérification du bundle compilé | ✅ `whileInView` présent dans `.next/static/chunks` (l'ancien `useInView` a disparu de `NewsSection`) |

Démarrage de test : `npx next start -p 3113` (serveurs de test arrêtés après validation).

---

## 8. Points d'attention / configuration requise

1. **Formulaire de contact :** variables d'environnement nécessaires :
   ```env
   RESEND_API_KEY=re_xxxxx
   FROM_EMAIL=alexandre@exemple.com
   ```
   Sans elles, l'API renvoie `500 {"error":"Service d'envoi d'email non configuré"}` — le build, lui, reste valide.
2. **Lien GitHub** (`https://github.com/Brian310507`) : déduit du compte du remote git — **à confirmer** avant mise en ligne.
3. **Flux RSS :** le cache est en mémoire (30 min) et remis à zéro à chaque redémarrage du serveur ; en environnement serverless, prévoir Redis/Upstash.
4. **`images.domains`** est une option dépréciée dans les versions récentes de Next.js (voir section 9).
5. **`url: '#'`** des articles de secours : la section affiche un état vide propre (`Aucune actualité disponible`) si tous les flux tombent en erreur après le fallback.

---

## 9. Pistes pour la phase de modernisation

- [ ] Upgrade **Next.js 13.4 → 15.x** + **React 19**.
- [ ] Migration `images.domains` → `images.remotePatterns`.
- [ ] Typage **TypeScript** + couche d'accès API typée.
- [ ] Factorisation des 7 pages blocs en un composant unique piloté par des données.
- [ ] Tests (Vitest + Testing Library) sur `NewsSection`, `EmailSection`, `Navbar`.
- [ ] CI GitHub Actions (`lint` + `build`) pour empêcher toute régression du build.
- [ ] Mise en cache des actualités externalisée (Redis) + webhook de rafraîchissement.
- [ ] Accessibilité : revue complète contrastes, focus visibles, `prefers-reduced-motion` pour Framer Motion.

---

*Document généré le 22/10/2026 — voir aussi `CHANGELOG.md` et `API_DOCUMENTATION.md` à la racine du projet.*