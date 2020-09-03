const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then((posts)=> res.status(200).json(posts) )
  .catch(()=> res.status(500).json({errorMessage: "Server Error"}) )
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const {id} = req.params
  db.getById(id)
  .then((post)=> res.status(200).json(post))
  .catch(()=> res.status(500).json({errorMessage: "Server Error"}) )
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const {id} = req.params
  db.remove(id)
  .then((one)=>res.status(200).json(one))
  .catch(()=> res.status(500).json({errorMessage: "Server Error"}) )
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  // do your magic!
  const {id} = req.params
  const change = req.body
  db.update(id, change)
  .then((one)=> res.status(200).json(one))
  .catch(()=> res.status(500).json({errorMessage: "Server Error"}) )
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
  .then(user => {
      if (user) {
          console.log("user", user);
          next();
      } else {
          res.status(404).json({ message: "invalid user id" });
      }
  })
  .catch(error => {
      res.status(500).json({ message: error.message });
  });
}

function validatePost(req, res, next) {
  // do your magic!
  !req.body.text ? res.status(400).json({message: "Make Sure To Provied The Text"}) : next()
}

module.exports = router;
