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

### Validate content categories

Run the test suite to verify that every category listed in `categories.json` has
corresponding content files and UI entries:

```bash
npm test
# or
pnpm test
```

## Documentation

See [World Expansion OS — IP Readiness Toolkit (v1)](docs/world-expansion/toolkit.md) for guidance on preparing worlds for intellectual property development.


