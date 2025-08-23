# World Expansion Toolkit

## Canonical API

The server loads canonical entities from `canon/sst.yaml` when it starts. Each entity is accessible by a unique ID.

**Endpoint**

```
GET /api/canon/:id
```

Returns the canonical entity matching `:id` as JSON or `404` if the ID is not found.

## Embedding Workflow

Run the embedding script to generate vectors for each canonical entity and store them in the database. The script uses the OpenAI embeddings API and the `pgvector` extension for PostgreSQL.

```
OPENAI_API_KEY=your-key \
DATABASE_URL=postgres://user:pass@host:port/db \
node scripts/embed-canon.js
```

The script reads the same YAML file, embeds each entity, and upserts the resulting vectors into the `canon_embeddings` table.

Example IDs include `silver_star_tower` and `golden_gate`.
