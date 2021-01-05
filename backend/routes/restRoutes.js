const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

// Get 
router.get('/subforums', restController.getAllSubforums);
router.get('/threads/:subforumId', restController.getAllSubforumThreads);
//router.get('/users', restController.getUsers);
//router.get('/threads', restController.getAllThreads);
//router.get('/thread/:threadId', restController.getThreadPosts)
//router.get('/:id', restController.getThreadById);

// POST

// PUT

// DELETE


module.exports = router;