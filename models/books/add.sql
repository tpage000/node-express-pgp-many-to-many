INSERT INTO books (title, author, cover, year, read)
VALUES (${title}, ${author}, ${cover}, ${year}, ${read}) 
RETURNING *;
