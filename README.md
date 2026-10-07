# Rupesh Bodkhe — Portfolio

A personal React portfolio with blue ink, red-pencil details, warm editorial typography, visitor-controlled light/dark themes. Personal facts and portfolio content live in `src/data.js`.

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
- GSAP adds desktop scroll choreography: a gently turning hero portrait and layered project cards. Mobile keeps native vertical reading and skips these library downloads.
- Section headings and navigation use selected official Material UI outlined SVGs, stored locally in `SectionIcon.jsx` with the upstream license in `public/third-party-licenses/`. They do not require an icon font or a UI styling runtime.
- All ten main sections appear in navigation. The active link and URL hash follow the section at the sticky header’s reading line; scrolling replaces history entries instead of adding them. Section resizing and direct links are accounted for.
- A CSS-driven strip cycles through six distinct phrases on desktop and mobile, suspends offscreen, and wraps all phrases visibly when motion is paused or reduced.
- Background threads animate at the page edges. A global pause control stops decorative background and scroll motion; the preference persists.
- Light/dark themes follow the operating system on a first visit and remember a visitor’s explicit choice. The initial theme is applied before first paint.
- Featured projects stack on desktop and become a normal vertical list on mobile. Each opens a native dialog containing the complete project details.
- IntersectionObserver reveals content once. CSS scroll timelines progressively draw project diagrams in supporting browsers, with static fallbacks elsewhere.
- Reduced-motion preferences disable decorative movement, stacked positioning, and smooth scrolling, including when changed while the site is open.
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
- `src/components/ThemeToggle.jsx`: persistent appearance settings.
- `src/components/AmbientBackground.jsx`: decorative SVG flow and shared motion control.
- `src/styles/sections.css`: career, skills, education, credentials, writing and contact layouts.
- `src/styles/chatbot.css`: assistant interface.
- `src/components/ScrollMotion.jsx`: reading progress and responsive GSAP choreography.
- `src/hooks/useSectionNavigation.js`: active-section tracking, URL synchronization and direct-link alignment.
- `src/components/CuriosityStrip.jsx`: responsive phrase strip with visibility-aware animation.
- `src/hooks/useScrollReveal.js`: one-time visibility reveals.
- `src/components/AssistantLauncher.jsx`: deferred assistant loading and keyboard shortcut.

## Deployment

The existing `.github/workflows/deploy.yml` builds and deploys to GitHub Pages when `main` is pushed or the workflow is run manually. The site uses a root-domain Vite base (`/`). Local changes alone do not publish a new version.
