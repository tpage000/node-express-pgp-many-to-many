// TAGS CONTROLLER
const router = require('express').Router();

// db
const db = require('../db/connect_db');

// sql files
const Tag = require('../models/index').tags;

// routes
router.get('/', async (req, res) => {
  try {
    const data = await db.any(Tag.all);
    res.status(200).json({ success: true, data, message: 'retrieved all tags' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not get all tags' });
  }
});

router.get ('/:id', async (req, res) => {
  try {
    const tag = await db.one(Tag.find, req.params.id);
    tag.books = await db.any(Tag.search, req.params.id);
    res.status(200).json({ success: true, data: tag, message: 'found the tag' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not find tag' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await db.one(Tag.add, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not create tag' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await db.one(Tag.remove, req.params.id);
    res.status(200).json({ success: true, data, message: 'deleted tag' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message , message: 'could not delete tag' });
  }
});

router.post('/addbook', async (req, res) => {
  try {
    const data = await db.one(Tag.associate, req.body);
    res.status(200).json({ success: true, data, message: 'added book to tag' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not add book to tag' });
  }
});

module.exports = router;
