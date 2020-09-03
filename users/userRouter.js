const express = require('express');
const db = require('./userDb')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const newPost = req.body
  db.insert(newPost)
  .then((post)=> res.status(201).json(post))
  .catch(()=>res.status(500).json({errorMessage: "server error"}))
});

// router.post('/:id/posts', (req, res) => {
//   // do your magic!
// });

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then((users)=> res.status(200).json(users))
  .catch(()=>res.status(500).json({errorMessage: "server error"}))
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params
  db.getById(id)
  .then((user)=> res.status(200).json(user))
  .catch(()=> res.status(500).json({errorMessage: "server error"}))
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params
  db.getUserPosts(id)
  .then((posts)=>res.status(200).json(posts))
  .catch(()=> res.status(500).json({errorMessage: "server error"}))
  
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params
  db.remove(id)
  .then((one)=> res.status(200).json(one))
  .catch(()=> res.status(500).json({errorMessage: "server error"}))

});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const {id} = req.params
  const change = req.body
  db.update(id,change)
  .then((one)=> res.status(200).json(one))
  .catch(()=> res.status(500).json({errorMessage: "server error"}))
});

//custom middleware

function validateUserId(req, res, next) {
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

function validateUser(req, res, next) {
  // do your magic!
  !req.body.name ? res.status(400).json({message: "make sure to provied name"}) : next()
}



module.exports = router;
