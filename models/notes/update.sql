UPDATE notes
SET
  date = ${date},
  comments = ${comments},
  rating = ${rating},
  book_id = ${book_id}
WHERE id = ${id}
RETURNING *;
