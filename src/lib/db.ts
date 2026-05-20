import { neon, NeonQueryFunction } from "@neondatabase/serverless";

// Lazy singleton — initializes on first call, not at import/build time
let _sql: NeonQueryFunction<false, false> | null = null;
function sql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL env var is not set");
    _sql = neon(url);
  }
  return _sql;
}

export type User = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  plan: "free" | "pro" | "studio";
  created_at: string;
};

export type Splat = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  url: string;
  size_bytes: number | null;
  views: number;
  is_public: boolean;
  slug: string | null;
  created_at: string;
};

// ---- Users ----

export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await sql()`
    SELECT * FROM users WHERE email = ${email.toLowerCase()} LIMIT 1
  `;
  return (rows[0] as User) ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const rows = await sql()`
    SELECT * FROM users WHERE id = ${id} LIMIT 1
  `;
  return (rows[0] as User) ?? null;
}

export async function createUser(
  email: string,
  name: string,
  passwordHash: string
): Promise<User> {
  const rows = await sql()`
    INSERT INTO users (email, name, password_hash)
    VALUES (${email.toLowerCase()}, ${name}, ${passwordHash})
    RETURNING *
  `;
  return rows[0] as User;
}

// ---- Splats ----

export async function getSplatsByUser(userId: string): Promise<Splat[]> {
  const rows = await sql()`
    SELECT * FROM splats WHERE user_id = ${userId} ORDER BY created_at DESC
  `;
  return rows as Splat[];
}

export async function createSplat(
  userId: string,
  name: string,
  url: string,
  sizeBytes?: number,
  description?: string
): Promise<Splat> {
  const rows = await sql()`
    INSERT INTO splats (user_id, name, url, size_bytes, description)
    VALUES (${userId}, ${name}, ${url}, ${sizeBytes ?? null}, ${description ?? null})
    RETURNING *
  `;
  return rows[0] as Splat;
}

export async function incrementSplatViews(splatId: string): Promise<void> {
  await sql()`UPDATE splats SET views = views + 1 WHERE id = ${splatId}`;
}

export async function deleteSplat(splatId: string, userId: string): Promise<void> {
  await sql()`DELETE FROM splats WHERE id = ${splatId} AND user_id = ${userId}`;
}
