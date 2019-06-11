const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const router = express.Router();

const Note = require('../../models/Note');

router.post('/', auth, (req, res)=>{
    const newNote = new Note({
        title: req.body.title,
        body: req.body.body
    })

router.post('/', (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    body: req.body.body,
  });

router.delete('/:id', auth, (req,res)=>{
    Note.findById(req.params.id)
    .then(note => note.remove().then(()=> res.json({success :true})))
    .catch(err => res.status(400).json({success:false}))
})

router.delete('/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => note.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(400).json({ success: false }));
});

module.exports = router;
