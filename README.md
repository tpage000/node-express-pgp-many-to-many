# Node, Express, Postgres
## Many to many - RESTFul API

Objectives

* Write SQL for queries instead of ORM
* Multiline SQL statements in `.sql` files

"Books App" 📚

Differences from one-to-many

Adds **Tags** model. Users can make any arbitrary collection of books, give that collection a description, and query for books in the collection. Tags and books have a many-to-many relationship -- a tag can can have many books, and a book can have many tags.

Books and tags are related through a join table.

create tags table

create join table

```
psql books_tags_app_api -f models/joinBooksTags/schema.sql
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

## async / await

* Using **async** with the **req, res** callback apparently is fine as long as errors are accounted for: [async / await in express routes](https://medium.com/@yamalight/danger-of-using-async-await-in-es7-8006e3eb7efb)

* In production multiple queries should done with a pg-promise **task**, but it is overkill for students first learning the ropes of pg-promise:

```javascript
router.get('/:id'. (req, res) => {
  db.task(async t => {
    const book = await t.one(Book.find, req.params.id);
    book.notes = await t.any(Note.all, req.params.id);
    return book;
  })
  .then(data => {
    res.status(200).json({ status: 'success', data, message: 'found a book' });
  })
  .catch(err => {
    res.status(400).json({ status: 'failure', data: err.message, message: 'could not find book' });
  });
});
```

Therefore, students can stick with basic awaits within a try/catch for now :

```javascript
router.get('/:id', async (req, res) => {
  try {
    const book = await db.one(Book.find, req.params.id);
    book.notes = await db.any(Note.all, req.params.id);
    res.status(200).json({ success: true, data: book, message: 'found a book' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not find book' })
  }
});
```




#### PG-PROMISE RESOURCES

Like pg, but with Promises instead of callbacks (and more)

* [API Basics](http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/)
* [pg-promise examples from creator](https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example)
* [queryfiles usage from pg-promise creator](http://vitaly-t.github.io/pg-promise/QueryFile.html)

#### DEV NOTES

**Restart server after changes to QueryFile**

Changing a `.sql` file doesn't restart the server and reload the changes: `new QueryFile` will not re-instantiate. Restart server to instantiate new QueryFile after changing a `.sql` file.

**Errors and exceptions**

In the `.catch` clause of a db query, the base err object will appear in console but not in response (when using QueryFile). For response text, pg-promise errors from queryFile show in `err.message`.

![](https://i.imgur.com/1xamXbi.png)

Errors within queryfiles themselves are also possible. (commented out above)

```javascript
if (err instanceof db.$config.pgp.errors.QueryFileError) {             
	console.log('query file error', err);                                
}                                                                      
```

#### Postgres / SQL Resources

* [formatting](http://www.sqlstyle.guide/)
* [json](http://www.postgresqltutorial.com/postgresql-json/)
* [postgres reference](http://www.postgresqltutorial.com/)
* [vim highlighting](https://github.com/exu/pgsql.vim)
* [validate json schema](https://github.com/gavinwahl/postgres-json-schema)
* [constraints](https://www.postgresql.org/docs/9.2/static/ddl-constraints.html)


#### Misc

Validation: only way to protect against empty strings is with CHECK

```sql
title VARCHAR NOT NULL CHECK (title <> '')
```

NOTEWORTHY ERRORS:

```
error: syntax error at or near "$"
```

If you forgot to supply an object to a 'create' or 'update' query, the QueryFile will kick up this error. It's as if it's trying to read SQL as opposed to pg-promise's named parameters syntax.

Don't do this on a create route:

![](https://i.imgur.com/H8bNGUU.png)

Do do this instead  (include the `req.body` object as data ):

![](https://i.imgur.com/vleQVbc.png)


<br>

Must use **x-www-form-urlencoded** option in Postman to send data

![](https://i.imgur.com/Mksv6jQ.png)

Otherwise will receive 'column' does not exist:

![](https://i.imgur.com/tv7owCJ.png)

**trailing whitespace matters** in key names within postman. 
<br>
<hr>

## ENDPOINTS with relational data

`/books/1`

show a single book -- with an array of all tags related to the book.

![](https://i.imgur.com/IyffkZ5.png)

`/tags/1`

show a tag - with an array of all books related to the tag.

![](https://i.imgur.com/ocs32p8.png)


