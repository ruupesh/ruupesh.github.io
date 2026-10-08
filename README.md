# Rupesh Bodkhe — Portfolio

A dark-only personal React portfolio with charcoal grain, cobalt system studies, red accents and a tactile portrait. Personal facts and portfolio content live in `src/data.js`.

## Run locally

Use Node 24 (matching the deployment workflow).

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

## Design and motion

- The hero uses one large Polaroid portrait, captioned with Rupesh’s name and role, alongside his introduction and work links.
- GSAP and ScrollTrigger coordinate all ten sections: portrait turns, metric assembly, exploded project studies, biography highlights, a career spine, unfolding skill panels, archival education cards, fanning credentials, journal entries and contact icons. Both libraries are lazy-loaded; essential content starts visible.
- Anime.js adds hand-drawn pencil accents, connected project diagrams, chart assembly, staggered skill / technology labels, career disclosure details, project-dialog sequencing, surface feedback and spring-based social-icon interactions. It animates child elements and separate variables, so GSAP retains ownership of scroll surfaces. The extra engine is lazy-loaded and skipped entirely for an initial reduced-motion preference.
- Section headings and navigation use selected official Material UI outlined SVGs, stored locally in `SectionIcon.jsx` with the upstream license in `public/third-party-licenses/`. They do not require an icon font or a UI styling runtime.
- All ten main sections appear in navigation. The active link and URL hash follow the section at the sticky header’s reading line; scrolling replaces history entries instead of adding them. Section resizing and direct links are accounted for.
- A CSS-driven strip cycles through six distinct phrases on desktop and mobile, suspends offscreen, and wraps all phrases visibly when the OS requests reduced motion.
- A layered SVG contour field, background halo and edge threads move with page scroll. Three additional curves briefly change shape when a section enters the reading area, then rest. There is no visitor pause control or stored motion preference; old manual-pause preferences are ignored.
- Dark appearance is applied before first paint, including for visitors who previously saved a light preference. There is no theme toggle.
- Featured projects remain in view during short desktop scroll chapters and become a normal vertical list on mobile, where the artwork still rotates and reveals its layers. Each opens a native dialog containing the complete project details.
- ScrollTrigger owns responsive section choreography and responds to changing career-accordion height. Reduced-motion alternatives revert GSAP styles and expose the complete static content.
- Reduced-motion preferences disable decorative movement, sticky project chapters, and smooth scrolling, including when changed while the site is open. Hidden tabs suspend GSAP activity automatically.
- Anime.js scopes revert child transforms and restore SVG strokes when preferences change. Entrance sequences run once, interactive controllers are reused, and no Anime.js animation loops indefinitely. Touch and keyboard users receive the same interaction feedback as mouse users.
- The career section uses native expandable details. All responsibilities remain available.
- The assistant and its Markdown/API dependencies load only after a click or Cmd/Ctrl+K. Responses fall back to local answers if the backend is absent or unavailable.

## Configuration

Optional Vite environment variables, supplied locally in `.env.local` or through the existing GitHub Actions repository variables:

- `VITE_RESUME_URL`: resume link; defaults to the PDF already in `public/`.
- `VITE_PORTFOLIO_BE_CHAT_API`: assistant API endpoint accepting `{ messages: [{ role, content }] }` and returning `{ response: string }`.

Frontend environment variables are public; do not put secrets in them.

## Main files

- `src/data.js`: canonical personal, project, work, skills and publication content.
- `docs/brand-direction.md`: brand identity, research sources, voice, evidence hierarchy and design rationale.
- `src/styles/styles.css`: semantic theme tokens, shared layout and foundation styles.
- `src/styles/brand.css`: personal typography, hero, evidence, portrait and brand refinements.
- `src/styles/ambient.css`: background motion.
- `src/styles/atelier.css`: midnight palette, textured surfaces, portrait and project 3D composition.
- `src/styles/choreography.css`: section-specific dimensional surfaces and animated ink / timeline details.
- `src/styles/anime.css`: pencil strokes, material feedback and interaction sheen.
- `public/textures/grain.svg`: small, locally served, repeating grain texture.
- `src/components/AmbientBackground.jsx`: SVG contour field and automatic motion preference / visibility handling.
- `src/styles/sections.css`: career, skills, education, credentials, writing and contact layouts.
- `src/styles/chatbot.css`: assistant interface.
- `src/components/ScrollMotion.jsx`: responsive GSAP / ScrollTrigger choreography and portrait pointer response.
- `src/animation/animeMotion.js`: Anime.js detail animation and project-dialog scopes.
- `src/hooks/useAnimeMotion.js`: lazy loading and lifetime management for Anime.js scopes.
- `src/hooks/useSectionNavigation.js`: active-section tracking, URL synchronization and direct-link alignment.
- `src/components/CuriosityStrip.jsx`: responsive phrase strip with visibility-aware animation.
- `src/hooks/useScrollReveal.js`: section ref; content visibility is independent of animation loading.
- `src/components/AssistantLauncher.jsx`: deferred assistant loading and keyboard shortcut.

## Deployment

The existing `.github/workflows/deploy.yml` builds and deploys to GitHub Pages when `main` is pushed or the workflow is run manually. The site uses a root-domain Vite base (`/`). Local changes alone do not publish a new version.
