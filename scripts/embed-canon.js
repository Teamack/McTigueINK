import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';
import { OpenAI } from 'openai';
import pg from 'pg';
import pgvector from 'pgvector/pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const canonFile = path.join(__dirname, '..', 'canon', 'sst.yaml');
const canon = YAML.parse(fs.readFileSync(canonFile, 'utf8'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pgvector.registerType(pool);

async function main() {
  await pool.query(
    'CREATE TABLE IF NOT EXISTS canon_embeddings (id TEXT PRIMARY KEY, embedding vector(1536))'
  );

  for (const [id, data] of Object.entries(canon)) {
    const text = `${data.name}\n${data.description}`;
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    const vector = embedding.data[0].embedding;
    await pool.query(
      'INSERT INTO canon_embeddings (id, embedding) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET embedding = EXCLUDED.embedding',
      [id, new pgvector.Vector(vector)]
    );
    console.log(`Embedded ${id}`);
  }

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
