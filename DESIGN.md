# Design

## Theme

Dark mode, committed strategy. The surface IS the statement — near-pure-black with editorial green and amber ticker gold as the two brand colors. Inspired by Bloomberg at midnight: dark glass, precision typography, green phosphors, amber data.

## Color Palette

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `void` | `#111110` | `oklch(0.09 0 0)` | Main background |
| `surface` | `#1a1a1a` | `oklch(0.13 0 0)` | Sections, navbar, panels |
| `surface-2` | `#232823` | `oklch(0.17 0.006 152)` | Elevated cards, subtle tinted |
| `edge` | `#2e2e2e` | `oklch(0.22 0 0)` | Borders, dividers |
| `ink` | `#ebebeb` | `oklch(0.93 0 0)` | Primary text |
| `ink-muted` | `#787878` | `oklch(0.55 0 0)` | Secondary text, labels |
| `ink-faint` | `#4a4a4a` | `oklch(0.35 0 0)` | Placeholders, disabled |
| `moss` | `#2FAD6F` | `oklch(0.70 0.16 152)` | Brand green — text + borders only |
| `moss-dim` | `#1A8550` | `oklch(0.55 0.14 152)` | Hover on moss |
| `moss-fg` | `#0a0a0a` | `oklch(0.09 0 0)` | Text on moss fills |
| `ember` | `#F0B548` | `oklch(0.82 0.14 82)` | Ticker amber — CTA fills + text |
| `ember-dim` | `#C8912C` | `oklch(0.68 0.15 72)` | Hover on ember CTA |
| `ember-fg` | `#111110` | `oklch(0.09 0 0)` | Text on ember fills |

## Typography

| Role | Family | Weights | Usage |
|---|---|---|---|
| Display serif | Cormorant | 400, 600, italic | Hero h1 ONLY — editorial authority moment |
| Sans / UI | Space Grotesk | 300–700 | Everything else: body, nav, h2–h3, buttons |

Pairing rationale: maximum contrast axis (high-contrast old-style serif vs. geometric grotesque). Cormorant reserved for ONE moment per site, making it feel deliberate rather than default.

## Signature Element

A single 1px amber (`ember`) horizontal rule beneath the hero headline. Appears ONLY in:
1. Below the hero h1 (the brand statement)
2. As the SponsorBar's bottom border accent

This line is the visual anchor — "the line everything must cross."

## Components

### Buttons
- **Primary CTA**: `bg-ember text-ember-fg` — amber fill, near-black text, `hover:bg-ember-dim`
- **Secondary / Ghost**: `border border-moss text-moss bg-transparent hover:bg-moss/10`
- All buttons: `rounded-lg` (not `rounded-2xl`), `transition-colors duration-200`

### Inputs
- `bg-void border border-edge text-ink rounded-lg`
- Focus: `focus:border-moss focus:ring-1 focus:ring-moss/25`
- Placeholder: `placeholder-ink-faint`

### Cards / Panels
- Preferred: `bg-surface-2 border border-edge rounded-xl`
- No `rounded-2xl` — too soft for the editorial aesthetic

### Nav
- `bg-surface/85 backdrop-blur-md border-b border-edge`

## Motion

- Hover: `duration-200 ease-out` — never `transition-all`
- Entrance: `fade-up` (existing), `fade-in` (modal)
- No bounce, no spring
- `prefers-reduced-motion`: instant transitions

## Layout

- Max content width: `max-w-5xl` for standard pages, `max-w-6xl` for nav
- Section vertical rhythm: `py-20` baseline, `py-24` for prominent sections
- Mobile breakpoint: 414px (sm:)
