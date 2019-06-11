const express = require('express');

const router = express.Router();

const Note = require('../../models/Note');

router.get('/', (req, res) => {
  Note.find().then(notes => res.json(notes));
});

router.post('/', (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    body: req.body.body,
  });

  newNote.save().then(note => res.json(note));
});

router.delete('/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => note.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(400).json({ success: false }));
});

module.exports = router;
