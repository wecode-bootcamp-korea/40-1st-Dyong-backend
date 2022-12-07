-- migrate:up
ALTER TABLE users ALTER COLUMN point SET DEFAULT 500000;

-- migrate:down

