INSERT INTO notes (date, comments, rating, book_id)
VALUES (${date}, ${comments}, ${rating}, ${book_id})
RETURNING *;
