# Rupesh Bodkhe — personal brand direction

## The idea

**A curious mind. An engineer who ships.** A personal portfolio for an AI engineer whose curiosity becomes working systems. Convey experimentation, technical depth, and ownership through actual work. Warmth comes from Rupesh's name, existing portrait, direct voice, writing, and playful interactions.

The three intended takeaways are: **builds production AI; owns delivery; learns and explains**. The experience should feel like entering someone's thoughtfully arranged workspace. It should not look like a software company's sales page.

## Research and its limits

Reviewed 7 October 2026; motion and dark-only direction updated 8 October 2026. Job descriptions are examples of role requirements, not endorsements, universal hiring criteria, or guarantees of interviews. The UX portfolio study concerns UX hiring; applying its presentation principles to this engineering portfolio is a design inference.

| Primary source | What the source supports | Portfolio decision |
| --- | --- | --- |
| [OpenAI: Full-Stack Software Engineer, Emerging Products](https://openai.com/careers/full-stack-software-engineer-emerging-products-san-francisco/) | End-to-end ownership, ambiguous 0-to-1 work, product experiments, architecture, metrics and iteration. | Make shipped outcomes and scope of ownership easy to find. |
| [Anthropic: Applied AI Engineer, Enterprise Tech](https://job-boards.greenhouse.io/anthropic/jobs/5057647008) | Production LLMs, prompting, agents, evaluation, MCP, deployment, intellectual openness and communication. | Surface existing AI results, orchestration work and technical writing. |
| [Google: Senior Software Engineer, AI/ML, Core](https://www.google.com/about/careers/applications/jobs/results/126285664877454022-senior-software-engineer-aiml-core) | Product delivery, system architecture, deployment, optimization, debugging, collaboration and accessibility. | Give backend performance and full-stack/cloud ownership equal credibility to AI work. |
| [NN/g: 5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/) | A survey of 204 UX hiring professionals emphasizes scannable case studies, individual contributions, context and results. | Put concise proof before long detail; retain every complete project description. |
| [NN/g: The Role of Animation and Motion in UX](https://www.nngroup.com/articles/animation-purpose-ux/) | Motion helps explain feedback, state and spatial relationships; competing movement distracts. | Use one signature interaction, quiet supporting motion and clear controls. |
| [Bruno Simon's portfolio](https://bruno-simon.com/) | A firsthand example of a coherent interactive personal world, with quality and device controls. | Make engineering tangible through one original interactive idea while preserving immediate access to work. |
| [Brittany Chiang's portfolio](https://brittanychiang.com/) | A firsthand example combining direct positioning, contributions, projects, writing and personal details. | Keep the person visible and the professional evidence easy to inspect. |

## Creative interpretation

The **blue ink / red pencil** palette, restrained editorial typography, portrait framing and diagram language are creative decisions informed by the user's preferences. They are not prescribed by hiring research. Curiosity comes through the personal voice, writing and selected work.

Avoid borrowed identities and recognizable copies of other portfolios. Avoid invented quotations, hobbies, daily rituals, personal anecdotes, research notes or exaggerated claims. Do not present decorative diagrams as confidential or verified system architecture.

## The hero

Keep the introduction understandable to technical and nontechnical visitors alike. Use one large Polaroid portrait with the name Rupesh Bodkhe and the smaller caption Fullstack AI Engineer. Avoid repeating the name as a separate introduction or signature. Focus the remaining space on personal voice, current work and clear links to selected projects and the résumé. The current personal location is Hyderabad, India, as explicitly corrected by the user; employment locations remain their original records. Use a balanced text layout on desktop and a single reading column on mobile. Do not add a technical playground or demonstration to this section.

Navigation exposes every main section and uses “See the impact” as its leading link to `/#impact`. The active link and URL track scrolling at the fixed header’s reading line, including after layout changes. The curiosity strip uses distinct phrases and moves on mobile; motion-off layouts show all phrases rather than clipping them.

## Color, texture and motion direction

The user requested dark-only appearance on 8 October 2026. Apply charcoal `#0c1017` before first paint, ignoring old light-theme preferences. The principal accents are muted cobalt `#97b5ec` and red `#d48779`. Use bright warm text `#f0eee8`, secondary text `#a3acbc`, and borders `#2a3343`. No theme toggle, neon, decorative Unicode arrows or asterisks.

Texture is a small local grain tile, etched calibration rings around the portrait, a subtle crosshatch in the impact section, and grid / layered lacquer surfaces in project artwork. The warm Polaroid is deliberately tactile against the cool dark palette.

The [Apple iPhone Air presentation](https://www.apple.com/iphone-air/) is a reference for turning an object and revealing its construction during scrolling. This portfolio applies that visual principle to the actual portrait and existing project diagrams, rather than copying Apple's imagery. The layers are decorative interpretations, not verified architectural schematics. [WebKit's scroll animation guide](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) supports tying animation to scroll position and providing reduced-motion alternatives. GSAP / ScrollTrigger provide the same scroll choreography on mobile and desktop without requiring CSS scroll timeline support. The libraries load independently of the visible content.

Three project studies rotate and separate layers as the visitor scrolls. Desktop uses short sticky chapters; mobile keeps a direct vertical reading flow with the same scroll-controlled artwork. The portrait turns during scrolling and gently responds to a desktop pointer. Avoid empty showpiece sections, terminals, invented personal anecdotes or animations unrelated to the work.

Use only nearby scene geometry, batch reads before writes, never continuously rerender React during motion, and retain native scrolling and ordinary navigation. The user requested removal of the visitor pause control. OS reduced-motion preferences provide static normal-flow cards, and hidden tabs suspend GSAP activity. Old manually saved pause preferences are ignored. No WebGL, frame sequences or video backgrounds.

GSAP motion is specific to each section: metric panels assemble around unchanged figures; biography highlights draw under text; a career spine progresses alongside real roles; skills unfold as instrument panels; education uses an archival card; credentials fan into place with a rotating medal; writing settles as journal pages; contact icons turn into their row. The fixed contour field changes with total page scroll instead of running an endless background scene.

Anime.js supplies the smaller details inside those surfaces. Pencil strokes draw beneath section titles and the existing name caption; project connections trace through the original SVG diagrams; the analytics chart assembles; skills and technology labels arrive in a short sequence; native career disclosures and project dialogs settle their details. Social icons use spring feedback on focus, mouse hover and touch. Three contour curves change shape briefly when a new section passes through the reading area. No new biography or project claims are introduced.

The Anime.js implementation follows the official [SVG drawing documentation](https://animejs.com/documentation/svg/createdrawable/), [scope cleanup API](https://animejs.com/documentation/scope/scope-methods/revert/) and [spring easing API](https://animejs.com/documentation/easings/spring/). Keep GSAP responsible for parent scroll planes and Anime.js responsible for child elements and independent interaction variables. Scopes must restore SVG attributes as well as inline styles. Reuse interaction controllers, avoid indefinite loops, skip the extra library when motion is initially reduced, and keep the static fallback complete.

## Evidence hierarchy and factual boundaries

`src/data.js` remains the source of truth for personal information, employment, education, skills, projects, awards and publications. Changing presentation must not change these facts or remove access to full detail.

| Existing evidence | What it demonstrates | Keep its original context |
| --- | --- | --- |
| Response accuracy improved from 50% to 99% | Applied AI improvement and prompt engineering | Hashedin by Deloitte; Fortune 500-facing ITSM SaaS application. Do not call it universal model accuracy or invent an evaluation method. |
| 400k+ users / over 400,000 global employees | Production delivery at scale | Enterprise RAG chatbot work. Do not convert this into paying users, monthly active users, or users of every project. |
| ETL processing reduced from 8 hours to under 5 minutes | Performance and backend problem solving | CLSA ETL system. Keep it separate from the PyPoller application's 8 hours/day saved. |
| Analytics assistant built in one month | Delivery speed and end-to-end ownership | Data Analytics Assistant/Chatbot. Do not invent revenue or adoption figures. |
| Productionized MultiAgent Orchestrator with Google ADK, A2A and MCP | Architecture and current agent engineering experience | Preserve the original descriptions, tools and scope. |
| AI features from design to production at Electronic Arts | Current ownership and cross-functional impact | Preserve SDE 2 - AI Engineer title and June 2026–Present dates. |
| Two existing Medium articles | Curiosity, explanation and technical communication | Retain original titles, descriptions, dates and links. |

Reading order: name and role → contextual evidence → selected systems → experience → skills and credentials → writing → contact. Complete project details belong in accessible dialogs. Résumé and contact should be easy to reach throughout.

## Voice

Write as a person: concise, clear and curious. Prefer concrete verbs and actual outcomes over self-awarded labels such as “visionary,” “world-class,” or “extraordinary.” Express the user's stated curiosity through approachable section labels and interaction, without rewriting factual biography. Keep company names as employment context rather than decorative endorsement logos.

## Motion, accessibility and performance guardrails

- Keep essential text and links in normal HTML. The hero should communicate through clear typography and personal content.
- Use native scrolling. Scrolling can transform the artwork and reveal relationships, but must not trap navigation or make readers wait for text.
- Keep background movement quiet and behind content. Avoid simultaneous competing animations, flashes and neon bloom.
- No visitor motion toggle, as explicitly requested by the user. Honor `prefers-reduced-motion`, including changes during a visit, and stop hidden-tab activity.
- Prefer transform and opacity for supporting animation; batch nearby geometry reads before transform writes; avoid continuous React state updates when idle or repeated allocation.
- Keep mobile layouts readable at 320px, support touch without hover dependency, and preserve keyboard navigation, visible focus and modal focus restoration.
- Load optional assistant and scroll-animation code independently of essential content where practical. Measure the production build; do not assume a library is lightweight.

## Review checklist

Verify dark-only appearance at 1440, 1024, 390 and 320px; confirm stored light preferences and light OS settings still open dark; check desktop and mobile scroll rotation; scroll navigation; all six complete project dialogs; résumé and external links; absence of the manual pause control, ignored legacy pause preferences and reduced motion; no runtime errors, horizontal overflow or residual lime/neon treatment. Check actual source data remains unchanged. Performance numbers should state their measurement context and must not be presented as universal device guarantees.
