DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  ID SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  created TIMESTAMP NOT NULL,
  description VARCHAR
)