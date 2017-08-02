UPDATE books
SET 
  title = ${title},
  author = ${author},
  cover = ${cover},
  year = ${year},
  read = ${read}
WHERE id = ${id}
RETURNING *;
