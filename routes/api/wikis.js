const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const Wiki = require('../../models/Wiki');

router.get('/:userid', auth, (req, res) => {
  Wiki.find({ user: req.params.userid })
    .sort([['date', -1]])
    .then(wikis => res.json(wikis))
    .catch(() => res.status(400).json('id not found'));
});


// @route     POST api/wikis
// @desc      Add new wiki
// @access    Private

router.post('/', auth, (req, res) => {
  if (!req.body.userid || !req.body.title || !req.body.body) {
    return res.status(400).json('title, body and userid is required');
  }
  const newWiki = new Wiki({
    title: req.body.title,
    user: req.body.userid,
    body: req.body.body
  });

  newWiki
    .save()
    .then(wiki => res.json(wiki))
    .catch(() => res.status(400).json('something went wrong'));
});


// @route     DELETE api/wikis/:id
// @desc      Delete contact
// @access    Private

router.delete('/:id', auth, (req,res)=>{
    Wiki.findById(req.params.id)
    .then(wiki => wiki.remove().then(()=> res.json({success :true})))
    .catch(err => res.status(400).json({success:false}))
})

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
