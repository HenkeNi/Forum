const sqlite3 = require('better-sqlite3');
const db = sqlite3('../database/database.db');


const getAllSubforums = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
    SELECT * FROM subforums`);
  res.json(statement.all());
}

const getAllSubforumThreads = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
    SELECT * FROM threads WHERE subforumId = $subforumId ORDER BY published_time ASC
  `);
  res.json(statement.all(req.params)); // TODO: CHECK::::
}









// const getThreadById = async (req, res) => {
//   let statement = db.prepare(`
//     SELECT * FROM threads WHERE id = $id
//   `);
//   res.json(statement.get(req.params));
// }





const getThreadPosts = async (req, res) => {
  console.log("FETCHIN POSTS");
  let statement = db.prepare(`
    SELECT * FROM posts WHERE threadId = $threadId ORDER BY published_time ASC
  `);
  res.json(statement.all(req.params));
}



// const getAllUsers = async (req, res) => {
//   let statement = db.prepare(/*sql*/ `SELECT * FROM users`);
//     res.json(statement.all());
// }


// TODO: Check if inside of restApi
const getUserById = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    SELECT * FROM users WHERE id = $id
  `);

  //res.json(statement.all(req.params));



  // TODO: REMOVE!!??!
  let user = statement.get(req.params) || null;
  if (user) {
    delete user.password;
    res.json(user);
  } else {
    res.status(404).json({ error: "No user with that id!" });
  }
};









const createThread = async (req, res) => {
  console.log("POSTING NEW THREAD");
  let statement = db.prepare(/*sql*/`
    INSERT into threads (title, userId, published_time, subforumId, active) 
    VALUES ($title, $userId, $published_time, $subforumId, $active)
  `);

  res.json(statement.run(req.body));
} 


const createPost = async (req, res) => {
  console.log("POSTING NEW POST");
  let statement = db.prepare(/*sql*/`
    INSERT into posts (message, userId, threadId, published_time)
    VALUES ($message, $userId, $threadId, $published_time)
  `);
  res.json(statement.run(req.body));
}



// const getForumThreads = async (req, res) => {
//   let statement = db.prepare(/*sql*/`SELECT * FROM threads WHERE thread.subforumId = subforums.id`);
//   res.json(statement.all({ subjectId: req.params.subjectId }));
// }

// const getThreads = async (req, res) => {
//   let statement = db.prepare(/*sql*/`SELECT * FROM subforums`);
//   res.json(statement.all({ subjectId: req.params.subjectId })); // TODO: FIX
// } 

// const getPosts = async (req, res) => {
//   let statement = db.prepare(/*sql*/ `
//     SELECT * FROM posts.* FROM posts, threads WHERE posts.threadId = $threadId AND threads.id = $threadId
//     `);
// }

// const createThread = async (req, res) => {
//   let statement = db.prepare(/*sql*/`
//   INSERT into ForumThreads (thread_info, created, created_by, thread_title, category) VALUES ($thread_info, $created, $created_by, $thread_title, $category)`);

//   res.json(statement.run({thread_info: req.body.thread_info, created: req-body.created, created_by: req.body.created_by, thread_title: req.body,thread_title, category: req.body.category}))
// }

// createPost = async (req, res) => {

// }


module.exports = {
  getAllSubforums,
  //getAllThreads,
  getAllSubforumThreads,
  getUserById,
  getThreadPosts,


  createThread,
  createPost,


  // getAllThreads,
  // getThreadById,
  // getThreadPosts,
  // getAllUsers,







  //getPosts,
  //createThread,
  //createPost,
}