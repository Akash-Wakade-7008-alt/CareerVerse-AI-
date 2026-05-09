# CareerVerse AI

CareerVerse AI is a Next.js 16 app that helps students experience careers through AI simulations, skill analytics, and report dashboards.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Gemini API
- Supabase

## Routes

- `/` Home
- `/careers` Career simulation library
- `/simulation/[career]` Interactive simulation flow
- `/report` AI-generated career report
- `/parent` Parent dashboard
- `/about` Product vision and methodology
- `/stack` Tech architecture + live stack health
- `/api/simulate` Simulation API
- `/api/report` Report API
- `/api/health` Runtime health API

## Environment

Create `.env.local` with:

```bash
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npx next build --webpack
```

Note: In restricted sandbox environments, `next build` with Turbopack can fail due process/port restrictions. Webpack build is validated and passes.
