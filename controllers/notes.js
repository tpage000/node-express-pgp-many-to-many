// NOTES CONTROLLER
const router = require('express').Router();

// db
const db = require('../db/connect_db');

// sql files
const Note = require('../models/index').notes;

// routes
router.get('/', async (req, res) => {
  try {
    const data = await db.any(Note.all);
    res.status(200).json({ success: true, data, message: 'retrieved all notes' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not get all notes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await db.one(Note.add, req.body);
    res.status(201).json({ success: true, data, message: 'created a note' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not create note' });
  }
});

router.put('/:id', async (req, res) => {
  req.body.id = req.params.id;
  try {
    const data = await db.one(Note.update, req.body);
    res.status(200).json({ success: true, data, message: 'updated a note' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not update note' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = db.one(Note.remove, req.params.id);
    res.status(200).json({ success: true, data, message: 'deleted a note' });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message, message: 'could not delete note' });
  }
});

module.exports = router;
