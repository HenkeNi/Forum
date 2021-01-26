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
router.put("/threads/:threadId", restController.closeThread);
router.put("/users/:id", restController.updateUser);

// DELETE
router.delete("/posts/:id", restController.deletePost);
router.delete("/users/:id", restController.deleteUser);



router.delete("/threads/:userId", restController.deleteAllUserThreads);
router.delete("/posts/:userId", restController.deleteAllUserPosts);
//router.post('/threads/:subforumId', restController.createThread);





//router.get('/users', restController.getUsers);
//router.get('/threads', restController.getAllThreads);
//router.get('/thread/:threadId', restController.getThreadPosts)
//router.get('/:id', restController.getThreadById);

// POST

// PUT

// DELETE


module.exports = router;