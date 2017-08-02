SELECT notes.id, notes.date, 
       notes.comments, notes.rating,
       notes.book_id, books.title, 
       books.year, books.cover, 
       books.read
FROM notes
JOIN books
ON notes.book_id = books.id;
