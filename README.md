# Luma — Buzzvel Front-End Challenge 2026

A responsive landing page for **Luma**, a fictional online-courses platform, built from the
"Buzzvel FE Test 2026" Figma file with **Next.js (App Router), TypeScript and Tailwind CSS**.

- **Live preview:** https://luma-buzzvel-fechallenge26.vercel.app/
- **Languages:** English at [`/`](https://luma-buzzvel-fechallenge26.vercel.app/) (the design language) and Portuguese at [`/pt`](https://luma-buzzvel-fechallenge26.vercel.app/pt). See [English / Portuguese](#english--portuguese).

> **Note for reviewers:** the site opens in **English**, exactly as designed. The browser language does **not** redirect you. A Portuguese version is available from the language button in the header (or at `/pt`).

![Lighthouse](docs/lighthouse.png)
_TODO: Lighthouse screenshot (mobile + desktop)._

---

## Getting started

Requirements: **Node.js 20.9+** and npm.

```bash
npm install
npm run dev        # http://localhost:3000 (English) and http://localhost:3000/pt (Portuguese)
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (both languages are statically prerendered) |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | `tsc --noEmit` (strict mode) |
| `npm test` | Unit and component tests (Vitest + React Testing Library) |
| `npm run test:watch` | Tests in watch mode |

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, `cacheComponents`, static prerendering), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4: design tokens from Figma in `@theme` (`app/globals.css`) |
| Animation | [Motion](https://motion.dev) (`LazyMotion` + `m`, features loaded on demand) and CSS keyframes |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering) |
| i18n | [next-intl](https://next-intl.dev) |
| Icons | [lucide-animated](https://lucide-animated.com) (MIT), adapted to the project's Motion setup |
| Tests | Vitest, React Testing Library, user-event, jest-dom |

## Project structure

```
app/
  [locale]/            layout (fonts, metadata, providers), page, localized 404
  global-not-found.tsx 404 for URLs outside the locale layout
  globals.css          Figma tokens (colors, type scale, shadows, motion) + base styles
  og.png/route.tsx     Open Graph image generated at build time (next/og)
components/
  ui/                  reusable primitives: Button, Container, SectionHeading, CategoryCard, ContactForm…
  sections/            one component per page section (Hero, Categories, FeaturedCourse…)
  layout/              Header, DesktopNav, MobileMenu, LocaleSwitcher, Footer, BackToTop…
  motion/              animation building blocks: Reveal, ScrollMask, ClipReveal, Parallax, CountUp…
  icons/animated/      lucide-animated icons
data/                  typed page content, one module per section, in English and Portuguese
messages/              UI strings for next-intl (en.json, pt.json)
i18n/                  routing, request config, locale-aware navigation
lib/                   helpers: cn, validateContact, hooks, fonts, site URL
proxy.ts               next-intl locale routing (Next 16's replacement for middleware)
__tests__/             tests
```

### Component principles

- **Server Components by default.** `"use client"` only where there is state or animation (menu, form, language picker, animated wrappers).
- **Content is data.** Sections receive typed props from `data/*`, so no copy is hard-coded in components. That makes the components reusable and the page translatable.
- **Typed primitives with variants** (`Button` variant/size, `Eyebrow` tone, `Reveal` variant…) are shared by every section.
- **One `h1`** (Hero), then one `h2` per section; every section is labelled by its heading.

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), a **"Skip to content"** link and a logical heading outline.
- Full **keyboard support**, with a visible focus ring (white on blue sections for contrast). After an anchor jump, focus moves to the target section.
- **Mobile menu:** `aria-expanded`/`aria-controls`; Esc closes it and returns focus to the toggle; the page behind can't scroll while it's open.
- **Language picker:** follows the menu button pattern (`menuitemradio` + `aria-checked`) with arrow keys, Home/End, Esc, Tab and outside-click handling. Each option carries its own `lang`.
- **Contact form:**
  - real `<label>`s;
  - errors linked with `aria-describedby` and `aria-invalid`;
  - focus moves to the first invalid field;
  - the result is announced in a `role="status"` region.
- **Animated counters and masked headings:** screen readers always get the final value or the full sentence (`aria-label`, hidden duplicates).
- **Featured course switching** is announced through an `aria-live` region.
- **Reduced motion:**
  - every Motion animation honours `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`);
  - CSS animations use `motion-safe:`, plus a global CSS safety net;
  - parallax, counters, the custom cursor and smooth scrolling are disabled.
- Error colour `#c62828` was added (not in Figma) to meet WCAG AA on white.

## Performance

- **Hero (LCP):**
  - the entrance is pure CSS (no JS needed before it plays);
  - the headline animates only `transform`;
  - the hero image is the only one loaded eagerly, with `fetchPriority="high"`.
- **Images:** every `next/image` has `sizes`, so the browser gets AVIF/WebP at the right width.
- **Fonts:** Inter and Plus Jakarta Sans via `next/font` (variable fonts, Latin subset, `display: swap`, self-hosted).
- **Motion:**
  - `LazyMotion` (strict) loads the animation features asynchronously;
  - only `transform`, `opacity` and `clip-path` are animated, so there is no layout shift;
  - infinite floats are CSS, so they cost no JS.
- **Static output:** `/` and `/pt` are prerendered at build time.

---

## English / Portuguese

The mobile frame of the design had the contact form in Portuguese, while the rest of the page was in English. I turned that inconsistency into a feature.

- **Routes:**
  - `/` is English (the design language) and `/pt` is Brazilian Portuguese, reusing the Portuguese strings from the mobile frame;
  - `localePrefix: "as-needed"` and **no automatic redirect** based on the browser language, so reviewers always see the original design first.
- **Where the text lives:**
  - long-form content is in typed per-locale modules (`data/*.ts`, `Localized<T>`);
  - short UI strings are in `messages/*.json`, typed through next-intl's `AppConfig`.
- **Numbers** are formatted with Intl: 24,000 / 24.000 · 24K / 24 mil · 4.9 / 4,9.
- **Per-locale metadata:** `<html lang>`, canonical URL, `hreflang` alternates and Open Graph locale.
- **Switching** language keeps the scroll position.

## Intentional design changes

These differ from the Figma **on purpose**. They are not fidelity misses.

1. **Hero on mobile.** The design places the image above the headline. I moved it below the copy and CTAs, so the main message and the primary actions are visible in the first viewport, and so the visual order matches the reading order.
2. **Category icons.** I added a small animated icon next to each category number (lucide-animated). Each icon plays once as its card scrolls in, and again on hover or keyboard focus.
3. **Mobile menu.** The open state wasn't designed.
   - The hamburger morphs into a close icon.
   - The panel opens as a top-down curtain, with links rising through masks.
   - The page behind dims, and scrolling is locked while the menu is open.
4. **Categories drive the featured course.** Clicking a category card scrolls to the Featured Course and swaps it for that category's course. Product Design is the original design content; the other three are mock courses. The swap replays the reveal animations and is announced to screen readers.
5. **Custom cursor.** On mouse/trackpad devices only:
   - the native cursor stays visible, and a brand-coloured ring trails it;
   - over buttons, the ring morphs into the button's outline, matching its size and border radius;
   - over plain text links it hides, since those have their own underline hover;
   - it turns yellow on blue and dark sections;
   - it is disabled for users who prefer reduced motion.
6. **English / Portuguese**, as described above.

Small additions that don't change the design: a back-to-top button in the footer, a branded 404 page, and a greeting in the browser console for whoever opens DevTools.

## Decisions and ambiguities

- **Repeated step label.** On desktop, How It Works shows "STEP 01" on all three steps, while mobile shows 01/02/03. I used 01/02/03, assuming a design error.
- **No tablet frame.** Layouts between 402px and 1280px are my own interpretation: stacked until `lg`, with intermediate adjustments.
  - **People:** the 520px collage only fits beside the text from 1280px. Below that, the text sits above a centred collage, and under 402px the collage is scaled down.
  - **How It Works:** the steps stay stacked up to 1024px.
  - **Final CTA:** the decorative shapes appear from 1280px only, because at 1024px they would overlap the title.
- **Sticky header.** It isn't specified in the design. I made it sticky (translucent with blur once you scroll) to make navigation easier.
- **Links.**
  - Navigation links point to section anchors.
  - "View course" leads to the contact form, since there is no course page, and "Browse all courses" goes to the categories.
  - Footer links without a destination (Careers, Journal, Terms, Privacy) use `#`.
- **Contact form.** As the brief allows, there is no backend:
  - client-side validation (name ≥ 2 characters, valid email, message ≥ 10 characters);
  - a simulated 800ms request;
  - success and error states.
- **Copy differences between frames.** "How It Works" says "who actually use these skills" on mobile and "who use these skills" on desktop. I used the desktop text.
- **Figma assets and tokens.**
  - Some photos were JPEGs exported with a `.png` extension; I renamed them to `.jpg`.
  - The tokens named `backgrounnd-*` (typo) were normalised to `background-*`.
- **Page identity.** The favicon and app icons were created from the "l." mark of the logo (they don't exist in the Figma). The Open Graph image is generated at build time with `next/og` and served at `/og.png`. It is a route handler rather than the `opengraph-image` file convention, because with the root layout under `[locale]` a root-level metadata image is resolved without `metadataBase`.

## Tests

`npm test` runs 32 tests (Vitest + React Testing Library) covering behaviour, not markup:

- **`validateContact`:** required fields, minimum lengths after trimming, invalid emails.
- **`ContactForm`:**
  - errors linked to their fields;
  - focus on the first invalid field;
  - live revalidation;
  - success and failure states;
  - Portuguese error messages.
- **`MobileMenu`:** `aria-expanded`/`aria-controls`, Esc closes and returns focus, closes after choosing a link.
- **`LocaleSwitcher`:**
  - menu semantics;
  - focus on the active language;
  - arrow keys, Home/End and Esc;
  - switches locale without scrolling.
- **Categories → Featured Course:** clicking a card switches the course, the selected state and the live announcement, in both languages.
- **`Button`:** variants, sizes and the cursor wrap target.
- **i18n parity:** EN and PT have the same message keys, categories, courses and form fields.

Components render with the same providers as the app (next-intl + strict `LazyMotion`), with animations turned off.

## Known gaps

- **No end-to-end tests.** There are no E2E or automated accessibility (axe) tests yet. Interactions are covered at the component level, and accessibility was checked manually.
- **Mock content.** The three extra featured courses reuse photos from the People section.
- **Experimental flag.** `global-not-found` relies on Next 16's experimental `globalNotFound` flag. It only serves URLs that never reach the locale layout; the localized 404 covers the rest.

## Time spent

_TODO: approximate hours._

## Use of AI

I used **Claude Code** (Anthropic) as a pair programmer throughout the project. It was connected to the Figma file through the **Figma MCP server**.

- **Design extraction.** Claude read the frames and variables through MCP to extract tokens (colours, type scale, spacing) and section structure. I compared the result against the Figma section by section, desktop and mobile.
- **Implementation.** Claude wrote most of the code from my instructions, one section at a time. I reviewed every change and ran the page myself after each step. I also iterated a lot on the animations: several ideas were rejected or reworked after I saw them, for example a continuous orbit on the People collage, a magnetic button and scroll-linked icon motion.
- **Design decisions were mine:**
  - the intentional changes listed above;
  - the animation direction;
  - turning the Portuguese form into full i18n;
  - the cursor behaviour.
- **Verification:**
  - every change went through `npm run lint`, `npm run typecheck` and `npm run build`;
  - behaviour is covered by the test suite;
  - I checked responsiveness and keyboard navigation manually in the browser;
  - Next.js 16 APIs were checked against the docs bundled in `node_modules/next/dist/docs`, since this version has breaking changes (for example `proxy.ts` instead of middleware, and `next/image` without `priority`).
