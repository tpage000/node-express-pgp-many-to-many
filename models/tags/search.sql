SELECT books.id, books.title, books.author, books.year
FROM joinbookstags
JOIN books
ON books.id = book_id
WHERE tag_id = $1;
