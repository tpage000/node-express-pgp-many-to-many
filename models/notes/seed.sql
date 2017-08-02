INSERT INTO notes(date_added, comments, rating, book_id)
VALUES ('2017-7-20', 'They put a man on the moon', 5, 1)
RETURNING *;
