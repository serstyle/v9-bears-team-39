const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');

const Wiki = require('../../models/Wiki');

// get all Wikis by id in params
router.get('/:userid', auth, (req, res) => {
  Wiki.find({ user: req.params.userid })
    .sort([['date', -1]])
    .then(wikis => res.json(wikis))
    .catch(() => res.status(400).json('id not found'));
});

// post new Wiki with a title and a body for the user

router.post('/', auth, (req, res) => {
  if (!req.body.userid || !req.body.title || !req.body.body) {
    return res.status(400).json('title and body required');
  }
  const newWiki = new Wiki({
    user: req.body.userid,
    title: req.body.title,
    body: req.body.body,
  });
  newWiki
    .save()
    .then(wiki => res.json(wiki))
    .catch(() => res.status(400).json('something went wrong'));
});

// change here

router.delete('/:id', auth, (req, res) => {
  Wiki.findById(req.params.id)
    .then(wiki =>
      wiki.userid === req.body.userid
        ? wiki.remove().then(() => res.json({ success: true }))
        : res.status(400).json({ success: false })
    )
    .catch(err => res.status(400).json({ success: false }));
});

// update route

router.put('/:id', auth, (req, res) => {
  const updateWiki = {};
  if (req.body.title) updateWiki.title = req.body.title;
  if (req.body.body) updateWiki.body = req.body.body;
  Wiki.findOneAndUpdate(
    { _id: req.params.id, user: req.body.userid },
    { $set: updateWiki },
    { new: true }
  ).then(wiki => res.json(wiki));
});

module.exports = router;
