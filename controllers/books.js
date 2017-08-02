// BOOKS CONTROLLER
const router = require('express').Router();

// db
const db = require('../db/connect_db');

// sql files
const Book = require('../models/index').books;
const Note = require('../models/index').notes;

// routes
router.get('/', async (req, res) => {
  try {
    const data = await db.any(Book.all);
    res.status(200).json({ success: true, data, message: 'retrieved all books' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not get all books' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await db.one(Book.find, req.params.id);
    book.notes = await db.any(Note.search, req.params.id);
    book.tags = await db.any(Book.search, req.params.id);
    res.status(200).json({ success: true, data: book, message: 'found a book' });
  } catch(err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not get book' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await db.one(Book.add, req.body);
    res.status(201).json({ success: true, data, message: 'created a book' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not create book' });
  }
});

router.put('/:id', async (req, res) => {
  req.body.id = req.params.id;
  try {
    const data = await db.one(Book.update, req.body);
    res.status(200).json({ success: true, data, message: 'updated a book' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not update book' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = db.one(Book.remove, req.params.id);
    res.status(200).json({ success: true, data, message: 'deleted a book' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not delete book' });
  }
});

router.post('/addtag', async (req, res) => {
  try {
    const data = await db.one(Book.associate, req.body)
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err.message)
  }
});

module.exports = router;
