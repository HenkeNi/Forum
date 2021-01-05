const sqlite3 = require('better-sqlite3');
const db = sqlite3('../database/database.db');


const getAllSubforums = async (req, res) => {
  console.log("FETCHING... subforums");
  let statement = db.prepare(/*sql*/ `
    SELECT * FROM subforums`);
  res.json(statement.all());
}


// const getAllThreads = async (req, res) => {
//   let statement = db.prepare(/*sql*/ `
//       SELECT threads.* FROM threads, subforums WHERE threads.subforumId = $subforumId AND subforum.id = $subforumId
//   `);
//   res.json(statement.all({ subforumId: req.params.subforumId }));
// }


const getAllSubforumThreads = async (req, res) => {
  console.log("FETCHIN threads");
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





// const getThreadPosts = async (req, res) => {
//   let statement = db.prepare(`
//     SELECT * FROM posts WHERE threadId = $threadId ORDER BY published_time ASC
//   `);
//   res.json(statement.all(req.params));
// }



// const getAllUsers = async (req, res) => {
//   let statement = db.prepare(/*sql*/ `SELECT * FROM users`);
//     res.json(statement.all());
// }














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
  // getAllThreads,
  // getThreadById,
  // getThreadPosts,
  // getAllUsers,







  //getPosts,
  //createThread,
  //createPost,
}