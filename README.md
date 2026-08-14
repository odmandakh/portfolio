# Odmandakh OS

A personal portfolio presented as a simple, macOS-inspired desktop. Projects, skills, experience, certificates, and contact info live behind familiar desktop objects — folders, files, widgets, and apps — instead of a conventional scrolling resume page.

**Live site:** [odmandakh.me](https://odmandakh.me)

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — dev server & build
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) — window open/close/drag transitions
- [lucide-react](https://lucide.dev/) — icons

No backend, no database. All portfolio content is static, typed data (see [Content](#content)).

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

Other scripts:

| Command | Description |
|---|---|
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Typecheck only (`tsc --noEmit`, no ESLint configured) |

## Project structure

```
src/
├── components/
│   ├── Desktop/     # TopBar, DesktopIcon — the desktop shell
│   ├── Common/      # Window — shared draggable window chrome
│   ├── Widgets/     # Compact desktop widgets (Experience, GitHub, LeetCode)
│   └── Views/        # Full window content for each desktop item
├── data/            # Static content — profile, projects, skills, certificates, experience
├── hooks/           # Live-data hooks (useGithubStats, useLeetcodeStats)
├── types/           # Shared TypeScript interfaces for all content models
└── utils/           # Small pure helpers (e.g. years-of-experience calculation)
```

Each desktop item (Projects, Certificates, About, Skills, CV, Experience, GitHub, LeetCode, Contact) is declared once in `src/data/desktopItems.ts` and rendered through the shared `Window` component — adding a new project, skill, certificate, or experience entry only requires editing the relevant file in `src/data/`, never the layout components.

## Content

| Data file | Powers |
|---|---|
| `data/profile.ts` | About panel, top bar, contact info |
| `data/projects.ts` | Projects folder |
| `data/skills.ts` | Skills tree |
| `data/certificates.ts` | Certificates folder |
| `data/experience.ts` | Experience widget & timeline |

GitHub and LeetCode widgets are **not** static data — they fetch live on mount:

- GitHub: [api.github.com](https://docs.github.com/en/rest) (public REST API) for repos/stars, plus [github-contributions-api.jogruber.de](https://github.com/jogruber/github-contributions-api) for the contribution calendar.
- LeetCode: [leetcode-api-faisalshohag.vercel.app](https://github.com/faisalshohag/leetcode-api) (community proxy — LeetCode has no official public API).

Both fail gracefully (loading/error states) rather than falling back to fake numbers if the source is unreachable.

## Theming

Follows the visitor's OS `prefers-color-scheme`, defaulting to dark. There is no manual theme toggle.

## Deployment

Deploys automatically to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. The custom domain is set via `public/CNAME`.

## Design constraints

This is a portfolio wearing a desktop metaphor, not an OS simulator. Deliberately out of scope: a dock, a taskbar, a functioning terminal, fake system logs/specs, window resizing, or any other decoration that doesn't serve presenting the actual content. See `docs/REQUIREMENTS.md` for the full product requirements.
