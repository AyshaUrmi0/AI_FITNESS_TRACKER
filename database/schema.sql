CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE interactions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  input TEXT NOT NULL,
  response TEXT NOT NULL,
  mode VARCHAR(10) NOT NULL, -- 'text' or 'voice'
  created_at TIMESTAMP DEFAULT NOW()
);
