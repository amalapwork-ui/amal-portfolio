# Repository Guidelines

## Project Structure & Module Organization

Single-page portfolio built with React 18 + TypeScript + Vite. All sections are top-level components in `src/components/` and assembled in `src/pages/Index.tsx` — that file is the canonical render order for the page.

- `src/components/` — one file per section (HeroSection, AboutSection, ProjectsSection, SkillsSection, ExperienceSection, EducationSection, ContactSection) plus shared UI (Navbar, Footer, Loader, ThemeProvider, Marquee, DinoGame)
- `src/index.css` — all CSS custom properties (HSL color tokens, dark/light mode, glass morphism, neon effects, custom animations). Extend here before reaching for inline styles.
- `public/` — static PDF résumés served as-is
- Path alias `@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.json`)

Theme state (dark/light) lives in `ThemeProvider.tsx` via Context API and persists to `localStorage`. Access via the exported hook — do not read `localStorage` directly in components.
`ThemeProvider` toggles the `.dark` class on `document.documentElement` — this is how Tailwind's dark-mode variant activates.

Two non-obvious shared components:
- `CustomCursor.tsx` — replaces the system cursor site-wide; the `cursor-none` CSS class in `index.css` hides the default cursor
- `DinoGame.tsx` — an easter egg mini-game surfaced somewhere in the UI; keep it self-contained with no external state dependencies

## Build & Development Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview the production build locally
```

No test runner is configured. TypeScript type-checking is the primary correctness gate:

```bash
npx tsc --noEmit  # Type-check without emitting files
```

## Coding Style & Naming Conventions

- **TypeScript strict mode is on** (`strict: true` in `tsconfig.json`). All code must pass strict checks — no implicit `any`, no unchecked nulls.
- Component files use PascalCase matching the component name (e.g., `HeroSection.tsx` exports `HeroSection`).
- No ESLint or Prettier config is present; format consistently with the existing code (2-space indent, single quotes in TSX).
- Tailwind utility classes are the primary styling mechanism. Custom CSS in `index.css` is for design tokens and effects not expressible in Tailwind alone.
- Animations use **Framer Motion** for component transitions and **GSAP** for scroll-driven effects — do not add raw CSS `@keyframes`. Keep responsibilities separate: Framer Motion for enter/exit and state-driven motion, GSAP for timeline/scroll sequences.
- Icons come from **lucide-react** — do not introduce a second icon library.

## Commit Guidelines

Use short lowercase imperative subject lines (`enable game on mobile`, `fix navbar scroll behavior`). One commit per logical change.
