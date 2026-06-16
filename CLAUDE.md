# Business Competition Website — Claude Code Instructions

## Project Overview
A high school business/entrepreneurship competition website. It has three main
areas: a public-facing homepage, a registration page, and a protected qualifying
round page that only registered + logged-in users can access.

All placeholder content (competition name, dates, logos, images) should be
clearly marked with [PLACEHOLDER] so it is easy to find and replace later.

---

## Tech Stack
- **React** (Create React App)
- **Tailwind CSS** for all styling
- **React Router v6** for page navigation
- **Supabase** for:
  - Auth (email + password login)
  - Database (storing registrations)
- **Vercel** for deployment (via GitHub)

---

## Environment Variables
Never hardcode secrets. Always use `.env` variables and reference them via
`process.env.REACT_APP_*`. Create a `.env.example` file listing all required
keys without values. Add `.env` to `.gitignore`.

Required variables:
```
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
```

---

## Folder Structure
```
src/
  components/        ← reusable UI pieces (Navbar, Footer, CountdownTimer, etc.)
  pages/             ← one file per route
    HomePage.jsx
    RegisterPage.jsx
    QualifyingPage.jsx
  styles/            ← global CSS if needed beyond Tailwind
  supabaseClient.js  ← single Supabase client instance, imported everywhere
  App.jsx            ← routes live here
  index.js
```

---

## Pages & What Each One Does

### 1. HomePage (`/`)
The public landing page. Must include:
- **Hero section**: Competition name [PLACEHOLDER], tagline [PLACEHOLDER], and
  a clear CTA button → "Register Now" linking to `/register`
- **Mission section**: What the competition is, who it's for, why participate.
  Use [PLACEHOLDER] text.
- **Key Details section**: Date [PLACEHOLDER], location [PLACEHOLDER], prizes
  [PLACEHOLDER]. Use icon + text cards.
- **Countdown Timer**: Live countdown to competition date [PLACEHOLDER].
  Build as a reusable `<CountdownTimer />` component.
- **Photo/Image section**: Use placeholder images (from https://picsum.photos)
  until real ones are provided.
- **Contact section**: Email [PLACEHOLDER], social links [PLACEHOLDER].
- **Navbar**: Logo [PLACEHOLDER] + links to Home, Register. If user is logged
  in, also show a link to the Qualifying Round.
- **Footer**: Copyright, competition name [PLACEHOLDER].

### 2. RegisterPage (`/register`)
Two-step flow on one page:

**Step 1 — Create account** (Supabase Auth):
- Email field
- Password field (min 6 chars, show strength indicator)
- Confirm password field
- "Create Account" button → creates Supabase auth user

**Step 2 — Complete profile** (shown after account creation):
- First name
- Last name
- Age (number input)
- "Complete Registration" button → saves to `registrations` table in Supabase

After both steps succeed, redirect user to `/qualifying`.

Show clear inline validation errors. Show a loading state on buttons while
async calls are in progress.

### 3. QualifyingPage (`/qualifying`) — PROTECTED
Only accessible to logged-in users. If a user visits this URL without being
logged in, redirect them to `/register`.

For now, this page is a **placeholder**. Display:
- A welcome message: "Welcome, [user's first name]!"
- A card or section that says: "[PLACEHOLDER] — Qualifying round content goes
  here. This may be a quiz, a written submission, or a file upload."
- A logout button that signs the user out via Supabase and redirects to `/`
- Further competition details: "[PLACEHOLDER]"

---

## Supabase Setup Instructions
Document these steps in a `SETUP.md` file at the project root:

1. Create a free project at supabase.com
2. Create a `registrations` table with columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `user_id` (uuid, references auth.users.id)
   - `first_name` (text)
   - `last_name` (text)
   - `age` (int2)
   - `created_at` (timestamptz, default: now())
3. Enable Row Level Security (RLS) on the table
4. Add a policy: users can only insert and read their own row
   (`auth.uid() = user_id`)
5. Copy Project URL and anon key into `.env`

---

## Auth Rules
- Use Supabase's built-in email/password auth
- Store the Supabase client as a singleton in `src/supabaseClient.js`
- Use a React context (`AuthContext`) to track the current session across the app
- The `<ProtectedRoute>` wrapper component checks auth state and redirects if
  not logged in

---

## Code Rules
- Always output **full files**, never partial snippets or diffs
- Every component in its own file
- Use **functional components** and **React hooks** only (no class components)
- Comment any non-obvious logic
- All forms must have **loading states** and **error handling**
- Mobile-first responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Use **React Router `<Link>`** for internal navigation, never `<a href>`
- No inline styles — Tailwind classes only

---

## Design Direction
- The site is for high school students but should look professional and
  energetic — not childish, not corporate-boring
- Typography should feel bold and modern
- Make deliberate color choices that feel unique to a business competition
  (not the generic blue startup look)
- The hero section should make an immediate strong impression
- Keep the signature design element consistent across all pages (e.g. a
  specific accent color, a typographic treatment, a geometric motif)
- Responsive down to 414px (iPhone 11)

---

## Git Rules
- `.env` is in `.gitignore` — never commit it
- `.env.example` IS committed — keep it updated
- Commit messages should be short and descriptive:
  `feat: add countdown timer component`
  `fix: redirect unauthenticated users from /qualifying`