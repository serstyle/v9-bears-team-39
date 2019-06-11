const express = require('express');

const router = express.Router();

const Todo = require('../../models/Todo');

router.get('/', (req, res) => {
  Todo.find().then(todos => res.json(todos));
});

router.post('/', (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
  });

  newTodo.save().then(todo => res.json(todo));
});

router.delete('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(400).json({ success: false }));
});

router.put('/:id', (req, res) => {
  Todo.findById(req.params.id).then(todo => {
    if (todo.completed) {
      Todo.updateOne({ _id: req.params.id }, { $set: { completed: undefined } })
        .then(() => res.json(todo))
        .catch(err => res.status(400).json(err));
    } else {
      Todo.updateOne(
        { _id: req.params.id },
        { $set: { completed: new Date() } }
      )
        .then(() => res.json(todo))
        .catch(err => res.status(400).json(err));
    }
  });
});

module.exports = router;
