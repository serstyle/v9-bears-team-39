const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const Todo = require('../../models/Todo');

router.get('/:userid', auth, (req, res) => {
  Todo.find({ user: req.params.userid }).then(todos => res.json(todos));
});

router.post('/', auth, (req, res) => {
  if (!req.body.userid || !req.body.title) {
    return res.status(400).json('title required');
  }
  const newTodo = new Todo({
    title: req.body.title,
    user: req.body.userid,
  });

  newTodo
    .save()
    .then(todo => res.json(todo))
    .catch(() => res.status(400).json('something went wrong'));
});

// check if userid === todo.userid
// req.body.userid could be replace by the jwt id
router.delete('/:id', auth, (req, res) => {
  Todo.findById(req.params.id)
    .then(todo =>
      todo.user.toString() === req.body.userid
        ? todo.remove().then(() => res.json({ success: true }))
        : res.status(400).json({ success: false })
    )
    .catch(err => res.status(400).json({ success: false }));
});

// only good user should be able to put
router.put('/:id', auth, (req, res) => {
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
