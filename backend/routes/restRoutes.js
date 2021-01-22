const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

// Get 
router.get('/subforums', restController.getAllSubforums);
router.get('/threads/:subforumId', restController.getAllSubforumThreads);
router.get('/users/:id', restController.getUserById);
router.get('/posts/:threadId', restController.getThreadPosts);


// POST
router.post("/threads", restController.createThread);
router.post("/posts", restController.createPost);


// PUT
router.put("/closethread/:threadId", restController.closeThread);
router.put("/user/:id", restController.updateUser);

// DELETE
router.delete("/deletepost/:id", restController.deletePost);
router.delete("/deleteusers/:id", restController.deleteUser);

//router.post('/threads/:subforumId', restController.createThread);





//router.get('/users', restController.getUsers);
//router.get('/threads', restController.getAllThreads);
//router.get('/thread/:threadId', restController.getThreadPosts)
//router.get('/:id', restController.getThreadById);

// POST

// PUT

// DELETE


module.exports = router;