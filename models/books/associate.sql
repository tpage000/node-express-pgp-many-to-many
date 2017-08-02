INSERT INTO joinbookstags ( book_id, tag_id )
VALUES ( ${book_id}, ${tag_id} )
RETURNING *;

