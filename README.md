# Node, Express, Postgres
## Many to many - RESTFul API

"Books App" 📚

[single-model]()

[one-to-many]()

Differences from one-to-many

Adds **Tags** model. Users can make any arbitrary collection of books, give that collection a description, and query for books in the collection. Tags and books have a many-to-many relationship -- a tag can can have many books, and a book can have many tags.

Books and tags are related through a join table.

## setup
**Clone repo**

**Create db from bash**

```
$ psql -f db/create_db.sql
```

**Create tables by running schema files from bash**

create books table

```
$ psql books_app_api -f models/books/schema.sql
```

create tags table

```
$ psql books_tags_app_api -f models/tags/schema.sql
```

create join table

```
$ psql books_tags_app_api -f models/joinBooksTags/schema.sql
```

## CONSTRAINTS

If a tag or book is deleted (if one side of the relationship disappears), the entire relationship should be removed from the join table:

![](https://i.imgur.com/u0SNzPC.png)

Note that if the REFERENCES constraint is not added, getting a book or a tag will work as usual without errors even if a related book or tag no longer exists. The non-existent book or tag is just not included in the output. However, the join table will be polluted with useless rows. Using REFERENCES will prevent the deletion of books or tags if they are represented in the join table. ON DELETE CASCADE will allow deletion of books and tags by removing useless rows from the join table.

REFERENCES also prevents directly adding a row to the join table that relates a non-existent book or tag:

![](https://i.imgur.com/kQKRMqC.png)

Use UNIQUE on its own line with a collection of column names to prevent duplicate rows. (Example: if book 1 is related to tag 1, there will be a corresponding row. What if the user tries to relate book 1 to tag 1 again? If we want to prevent a duplicate row being added:

![](https://i.imgur.com/MHv1ViE.png)

We can still add as many book 1 and tag 1 individaully as we like, but cannot add a row with both book 1 and tag 1 after already having added one.

<br>

## ENDPOINTS with relational data

`/books/1`

show a single book -- with an array of all tags related to the book.

![](https://i.imgur.com/IyffkZ5.png)

![](https://i.imgur.com/Dpr8bMA.png)

search.sql
![](https://i.imgur.com/kn5pWFO.png)

`/tags/1`

show a tag - with an array of all books related to the tag.

![](https://i.imgur.com/ocs32p8.png)

![](https://i.imgur.com/FqZPiHb.png)

search.sql
![](https://i.imgur.com/0PHTjM4.png)




