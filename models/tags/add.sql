INSERT INTO tags (name, created, description)
VALUES (${name}, ${created}, ${description}) 
RETURNING *;
