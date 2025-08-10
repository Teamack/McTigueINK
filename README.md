# McTigueInk Writing Backend

**Purpose**  
This is the service layer for McTigueInk’s author platform — the “world-lore brain” and creative pipeline behind Ethyrea and other McTigueInk works.  
It ingests manuscripts, breaks them into scenes, tags characters/locations, embeds text for semantic search, and serves project dashboards.

---

## Stack
- **Next.js 14 (App Router)** – API routes + eventual dashboard
- **Postgres (Supabase)** + **pgvector** – for structured + semantic search
- **Drizzle ORM** – migration-first DB schema
- **Auth** – Supabase Auth (email + OAuth)
- **Testing** – Vitest (unit), Playwright (E2E)
- **CI/CD** – GitHub Actions → staging & production

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Supabase project with `pgvector` enabled

### Setup
```bash
# Clone
git clone git@github.com:McTigueInk/writing-backend.git
cd writing-backend

# Install
pnpm install

# Environment
cp .env.example .env.local
# Fill in SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE

# Dev
pnpm dev
```
