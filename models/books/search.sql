SELECT tags.id, tags.name, tags.description
FROM joinbookstags
JOIN tags
ON tags.id = tag_id
WHERE book_id = $1;
