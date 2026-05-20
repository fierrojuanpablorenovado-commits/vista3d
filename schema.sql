-- Vista3D database schema
-- Run once on a fresh Neon Postgres database

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  plan        VARCHAR(50) NOT NULL DEFAULT 'free',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS splats (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  url         TEXT NOT NULL,          -- public CDN / Vercel Blob URL
  size_bytes  BIGINT,
  views       INTEGER NOT NULL DEFAULT 0,
  is_public   BOOLEAN NOT NULL DEFAULT true,
  slug        VARCHAR(100) UNIQUE,    -- optional vanity slug for sharing
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS splats_user_id_idx ON splats(user_id);
CREATE INDEX IF NOT EXISTS splats_slug_idx ON splats(slug);
