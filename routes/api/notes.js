const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');

const Note = require('../../models/Note');

// get all notes by id in params
router.get('/:userid', auth, (req, res) => {
  Note.find({ user: req.params.userid })
    .then(notes => res.json(notes))
    .catch(() => res.status(400).json('id not found'));
});

// post new note with a title and a body for the user

router.post('/', auth, (req, res) => {
  if (!req.body.userid || !req.body.title || !req.body.body) {
    return res.status(400).json('title and body required');
  }
  const newNote = new Note({
    user: req.body.userid,
    title: req.body.title,
    body: req.body.body,
  });
  newNote
    .save()
    .then(note => res.json(note))
    .catch(() => res.status(400).json('something went wrong'));
});

// change here

router.delete('/:id', auth, (req, res) => {
  Note.findById(req.params.id)
    .then(note =>
      note.userid === req.body.userid
        ? note.remove().then(() => res.json({ success: true }))
        : res.status(400).json({ success: false })
    )
    .catch(err => res.status(400).json({ success: false }));
});

// update route

router.put('/:id', auth, (req, res) => {
  const updateNote = {};
  if (req.body.title) updateNote.title = req.body.title;
  if (req.body.body) updateNote.body = req.body.body;
  Note.findOneAndUpdate(
    { _id: req.params.id, user: req.body.userid },
    { $set: updateNote },
    { new: true }
  ).then(note => res.json(note));
});

module.exports = router;
