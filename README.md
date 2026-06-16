# Abdisalan AI

A digital-twin portfolio chatbot for Abdisalan Ali. Visitors chat with "Abdisalan AI" to learn about his experience, skills, and projects — answers are grounded strictly in the profile data in [`src/lib/profile.ts`](src/lib/profile.ts), nothing is invented.

## Setup

1. Install dependencies (already done if you just scaffolded this):
   ```bash
   npm install
   ```
2. Add your Anthropic API key:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and set `ANTHROPIC_API_KEY` to a key from [console.anthropic.com](https://console.anthropic.com/settings/keys).
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

Until `ANTHROPIC_API_KEY` is set, the chat UI works but responds with a message explaining the AI backend isn't configured yet — the rest of the site (layout, About page) is fully usable without a key.

## Project structure

- `src/lib/profile.ts` — the knowledge base (single source of truth about Abdisalan).
- `src/lib/system-prompt.ts` — builds the system prompt enforcing tone and "don't invent facts" rules.
- `src/app/api/chat/route.ts` — streams responses from the Claude API.
- `src/app/page.tsx` — the chat UI (ChatGPT-style), persists history to `localStorage`.
- `src/app/about/page.tsx` — static fallback page rendering the profile data directly.

## Updating Abdisalan's info

Edit `src/lib/profile.ts` only — both the chatbot's knowledge base and the About page read from it, so it stays in sync automatically.

## Deploying

Push to a GitHub repo and import it on [Vercel](https://vercel.com/new), then add `ANTHROPIC_API_KEY` as an environment variable in the Vercel project settings.
