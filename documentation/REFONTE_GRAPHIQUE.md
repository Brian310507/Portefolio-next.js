# 🎨 Refonte graphique — Thème Cyberpunk: Edgerunners

> **Date :** 22/10/2026  
> **Objectif :** aligner le portfolio sur l'identité visuelle de la série **Cyberpunk: Edgerunners**  
> **Références :** les 4 images du dossier `/style` du projet (poster officiel, plan Night City, logo spray vert, logo titre jaune-vert)  
> **Validation :** `next lint` → 0 erreur · `next build` → 14/14 pages · routes testées → 200

---

## 1. Analyse des références

| Référence | Éléments repris |
|---|---|
| Poster officiel (jaune acide) | Jaune **#FCEE0A** en couleur héro, typo noire sur jaune |
| Plan Night City | Fond bleu-nuit quasi noir **#04060C**, néons cyan/magenta, grille technique |
| Logo spray | Vert toxique **#B6FF00** en accent secondaire |
| Logo titre | Dégradé **jaune → vert → cyan** avec glow, typo angulaire **italique** majuscule |

---

## 2. Design tokens (nouveaux)

**Palette** (`tailwind.config.js`) :

| Token | Valeur | Usage |
|---|---|---|
| `acid` | `#FCEE0A` | Couleur héro (boutons, titres, badge source, glow) |
| `toxic` | `#B6FF00` / bright `#39FF14` | Accent secondaire, fin des dégradés |
| `neon.cyan` | `#00F0FF` | Navigation, bordures HUD, texte technique |
| `neon.pink` | `#FF2D95` | Erreurs, lueurs d'ambiance, glitch |
| `neon.orange` | `#FF6B1A` | Accent ponctuel |
| `night.950 → 600` | `#04060C → #1B2740` | Fonds et surfaces (Night City) |

**Typographie** (`layout.js`, via `next/font`) :

- `font-display` → **Chakra Petch** (400/600/700 + italique) : titres, boutons, logo — proche du logo Edgerunners.
- `font-sans` → **Rajdhani** (400→700) : texte courant, ambiance tech.
- `Inter` supprimé.

---

## 3. Effets globaux (`globals.css`)

| Classe / Effet | Description |
|---|---|
| Fond `body` | `#04060C` + grille cyan 48 px (façon HUD / city grid) |
| `body::after` | **Scanlines** fixes subtiles (effet écran), `pointer-events: none` |
| `::selection` | Jaune acide sur texte noir |
| Scrollbar | Piste nuit + pouce bordé cyan → jaune au survol |
| `scroll-padding-top: 96px` | Ancres (#about, #contact) dégagées de la nav fixe |
| `.section-title` | Titre display italique majuscule + halo cyan |
| `.text-glow-acid` / `.text-glow-cyan` | Néons textuels |
| `.btn-acid` | Bouton plein jaune, **coins coupés** (clip-path), glow au survol, géré en `:disabled` |
| `.btn-ghost` | Bouton contour cyan, coins coupés + glow |
| `.hud-card` | Panneau à coins coupés, dégradé nuit, bordure cyan translucide |
| `.input-hud` | Champ : bordure cyan → jaune + glow au focus |
| `.stripes` | **Bandes de danger** jaune/noir diagonales (navbar + footer) |
| `.glitch` | Glitch cyan/magenta via `::before/::after` (data-text), désactivé si `prefers-reduced-motion` |

---

## 4. Composants re-stylés

| Composant | Changements clés |
|---|---|
| **Navbar** | Fond nuit `95/95` + `backdrop-blur`, bande de danger en haut, bordure bas **jaune**, logo Chakra Petch italique jaune glow, liens cyan → jaune au survol, dropdown HUD (items inversés jaune/noir au survol), burgers cyan/jaune |
| **NavLink** | Majuscules, `font-display`, tracking large, cyan → acid au survol |
| **Hero** | Titre display italique majuscule ; « Bonjour, je suis » en jaune avec **effet glitch** ; prénom en dégradé `acid → toxic → cyan` ; boutons `.btn-acid` + `.btn-ghost` ; portrait en cercle `ring-acid` + halo cyan ; lueurs néon (jaune / magenta) |
| **Achievements** | Panneau `.hud-card`, chiffres jaunes glow, libellés cyan majuscules |
| **About** | Titre `.section-title`, image bordée glow cyan, onglets actifs jaunes + barre `acid → toxic` |
| **Alternance** | Titre dégradé jaune→vert→cyan, cartes `.hud-card`, puces jaune/magenta, CTA `.btn-acid` |
| **Actualités** | `.section-title`, bouton `.btn-acid`, cartes `night-800` bord cyan → jaune au survol, **badge source jaune noir** (poster), date cadre cyan, fallback cyan→pink, erreurs magenta |
| **Contact** | Titre display italique, halo pink/cyan, champs `.input-hud`, `.btn-acid`, succès vert toxique |
| **Footer** | Bandes de danger, bord jaune, texte display majuscule, année cyan |
| **Pages blocs (×7)** | Fond `night-950`, H1 display italique, H2 jaunes, liens cyan, boutons « Voir » `.btn-acid`, bordures d'images cyan |
| **ProjectCard/Tag** | Thème néon + **bug corrigé** : classe invalide `bg-[#181818]py-6` → `bg-night-900 py-6` |
| **Tableau de compétences** | Titre `text-blue-900` (**invisible sur fond sombre**) → `text-acid` |

---

## 5. Récapitulatif des fichiers modifiés

```
tailwind.config.js                  → palette acid/toxic/neon/night + fontDisplay + shadows
src/app/globals.css                 → fond, scanlines, grille, scrollbar, classes d'effets
src/app/layout.js                   → Chakra Petch + Rajdhani (remplace Inter)
src/app/page.js                     → bg-night-950
src/app/components/Navbar.jsx       → nav cyberpunk + bande de danger
src/app/components/NavLink.jsx      → liens display cyan/jaune
src/app/components/HeroSection.jsx  → titre glitch + dégradé + boutons coins coupés + halo portrait
src/app/components/AchievementsSection.jsx → HUD
src/app/components/AboutSection.jsx → titre + image néon
src/app/components/TabButton.jsx    → onglets acid/toxic
src/app/components/AlternanceSection.jsx → cartes HUD + puces néon
src/app/components/NewsSection.js   → cartes/badges/boutons thématisés
src/app/components/EmailSection.jsx → champs + bouton + halo
src/app/components/Footer.jsx       → bandes de danger
src/app/components/BlocLayout.jsx   → thème (composant actuellement non utilisé)
src/app/components/ProjectCard.jsx  → thème + fix classe CSS invalide
src/app/components/ProjectTag.jsx   → thème
src/app/blocs/*/page.jsx  (×7)      → fond, titres, liens, boutons
```

---

## 6. Points d'attention

1. **Accessibilité** : le glitch est désactivé en cas de `prefers-reduced-motion`. Contrastes jaune/noir et cyan/noir conformes.
2. **Scanlines** : overlay global en `opacity 0.4` — réglable dans `globals.css` (`body::after`) si jugé trop appuyé.
3. **`.btn-acid`** utilise `clip-path` : les `box-shadow` sont clippés → le glow passe par `filter: drop-shadow`.
4. **Projets** : `ProjectsSection` n'est pas inclus dans `page.js` (état antérieur) mais a été thématisé par cohérence.
5. Les anciens tokens `primary`/`secondary` (bleu/violet) restent dans la config pour compatibilité.
6. **`shadow-neon-acid`** posé sur un `.btn-acid` est sans effet visuel (clippé) — le glow de survol fait foi.

---

## 7. Pistes d'approfondissement

- [ ] Bandes de danger comme séparateurs entre sections.
- [ ] Textures d'ambiance (plans Night City) en fond léger des pages blocs.
- [ ] Effet de scan au survol des cartes Actualités.
- [ ] Police « graff » locale pour le titre principal.
- [ ] Captures d'écran avant/après à ajouter dans ce document.

---

## 8. Mise à jour palette v2 — Interface style menus Cyberpunk 2077

> Nouvelle direction (22/10/2026) : le corps de la page adopte les couleurs des **menus in-game** (captures fournies dans `/style` : écran Cyberware + réglages Interface) plutôt que le jaune du poster Edgerunners.

### 8.1 Nouvelles valeurs des tokens (`tailwind.config.js`)

> Les **noms de tokens sont conservés** pour ne pas remodifier les 24 fichiers : `acid` = rouge, `toxic` = cyan clair.

| Token | Ancienne valeur (Edgerunners) | Nouvelle valeur (menus in-game) |
|---|---|---|
| `acid` | `#FCEE0A` (jaune) | **`#FF1D3D`** (rouge crimson — labels/bordures/primaire) |
| `acid.dim` | `#D9D200` | `#C7102B` |
| `toxic` | `#B6FF00` (vert) | **`#66EDED`** (cyan clair — états actifs/ON) |
| `neon.cyan` | `#00F0FF` | **`#4DE8E8`** (aqua des toggles ON) |
| `neon.pink` | `#FF2D95` | `#FF3355` (rouge d'erreur) |
| `night.950→600` | bleus marins `#04060C→#1B2740` | **bordeaux `#0A0306→#33111A`** |
| `shadow.neon-*` | glows jaune/cyan/rose | glows **rouge / cyan / rouge** |

### 8.2 Effets globaux adaptés

- **Fond `body`** : `#0A0306` + **halo rouge radial en haut** (comme le menu de réglages) + grille 48 px rouge.
- **Sélection texte** : cyan sur noir (style toggle **ON**).
- **Scrollbar** : piste bordeaux, pouce bordé rouge → rouge au survol.
- **`.section-title`** : texte **rouge `#FF3B52`** + halo rouge (les labels du jeu sont rouges ; le blanc reste réservé aux titres H1/valeurs).
- **`.btn-acid`** : fond rouge `#E00B2C`, texte **blanc**, survol `#FF1D3D` + glow (contraste 5:1).
- **`.btn-ghost`** : contour/texte cyan (style toggle ON).
- **`.hud-card`** : panneau bordeaux `#1A090E→#12060A`, **bordure rouge** translucide.
- **`.input-hud`** : bordure rouge par défaut → **focus cyan + glow** (champ actif).
- **`.stripes`** : bandes **rouge/noir** (plus de jaune).
- **`.glitch`** : décalages **cyan (`::before`) + rouge (`::after`)**.

### 8.3 Inversion de logique « labels rouges / interactif cyan »

Règle relevée sur les captures : *les libellés sont rouges, les éléments actifs ou interactifs sont cyan*.

| Endroit | Avant | Après |
|---|---|---|
| Liens de nav (`NavLink`) | cyan → rouge au survol | **rouge → cyan au survol** |
| Bouton dropdown Blocs | cyan → rouge | **rouge → cyan** |
| Burgers mobiles | contour cyan → rouge | **contour rouge → cyan** |
| Items du dropdown | survol fond rouge | **survol fond cyan + texte noir** (ON) |
| Onglets (About) | actif rouge / inactif gris | **actif cyan / inactif rouge**, barre rouge→cyan |
| Chiffres Achievements | rouges glow | **cyan glow** ; libellés → **rouge** |
| Cartes Actualités | bord cyan → rouge au survol | **bord rouge → cyan au survol** |
| Puces « Environnement idéal » | magenta | **cyan** |
| Dégradés titre (Hero, Alternance) | rouge→vert→cyan | **rouge → cyan** (2 arrêts) |

Inchangé (conforme aux captures) : liens des pages blocs cyan, H2 des blocs rouges, boutons `.btn-acid` rouges, badges source rouges à texte noir, erreurs rouges, succès cyan.

### 8.4 Validation v2

- `next lint` → 0 erreur · `next build` → 14/14 pages · routes `/`, blocs → 200.
- CSS compilé vérifié : `ff1d3d`, `4de8e8`, `0a0306`, `rgba(255,29,61,…)` présents ; **`fcee0a` et `00f0ff` absents**.

*Voir aussi : `BUGS_ET_CORRECTIFS.md` dans ce dossier.*