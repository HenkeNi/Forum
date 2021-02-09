const Encrypt = require("../Encrypt");
const sqlite3 = require('better-sqlite3');
const db = sqlite3('../database/database.db');


//*************** TEST AREA ********************
const createConversation = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    INSERT INTO conversations DEFAULT VALUES
    
  `);
    res.json(statement.run(req.body));
}

const createMessage = async (req, res) => {
  console.log("SENDING MESSAGE");
  let statement = db.prepare(/*sql*/`
    INSERT INTO messages (senderId, text, send_date, conversationId)
      VALUES($senderId, $text, $send_date, $conversationId);
  `);
  res.json(statement.run(req.body));
}

const addUserToConversation = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    INSERT INTO conversationsXusers (userId, conversationId)
      VALUES($userId, $conversationId);
  `);
  res.json(statement.run(req.body));
}


const getUsersInConversation = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    SELECT
      userId, username
    FROM
      users,
      conversations,
      conversationsXusers
    WHERE 
      users.id = conversationsXusers.userId
    AND
      conversations.id = conversationsXusers.conversationId
    AND conversations.id = $id
  `);
  res.json(statement.all({ id: req.params.id }));
}

const getMessagesInConversation = async (req, res) => {
  console.log("GETTING MESSAGES");
  let statement = db.prepare(/*sql*/`
    SELECT
      messages.id AS id, senderId, text, send_date, unread
    FROM
      messages,
      conversations
    WHERE 
      conversations.id = $convId
    AND messages.conversationId = $convId
  `);
  res.json(statement.all({ convId: req.params.id }));
}

const getConversations = async (req, res) => {
  console.log("GET user's conversations")
  let statement = db.prepare(/*sql*/`
    SELECT 
      conversations.id AS convID
    FROM
      conversations,
      users,
      conversationsXusers
    WHERE
      users.id = conversationsXusers.userId
    AND
      users.id = $id
    AND 
      conversations.id = conversationsXusers.conversationId
  `);
    res.json(statement.all({ id: req.params.id }));
}


const getQuoteForPost = async (req, res) => {
  console.log("GETTING QUOTES FOR POST");
  let statement = db.prepare(/*sql*/`
    SELECT * FROM quotes
    WHERE quotes.postId = $id
  `);
  res.json(statement.all({ id: req.params.id }));
}

// deleteUserFromConversation
const deleteConversationXusers = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    DELETE FROM 
      conversationsXusers
    WHERE
      conversationsXusers.userId = $userId
    AND 
      conversationsXusers.conversationId = $conversationId
  `);

  res.json(statement.run(req.body));
}

const deleteMessage = async (req, res) => {
  let statement = db.prepare(/*sql*/"DELETE FROM messages WHERE messages.id = " + req.params.id + " AND messages.senderId = " + req.session.user.id);
    
  res.json(statement.run());
}

//***********************************







const searchForUser = async (req, res) => {
  let statement = db.prepare(/*sql*/"SELECT * FROM users WHERE username LIKE '%" + req.params.name + "%' AND NOT users.id = " + req.session.user.id);
  //let statement = db.prepare(/*sql*/"SELECT * FROM users WHERE username LIKE 'bat%'");
  res.json(statement.all({ name: req.params.name }));
}



// GET
const getAllSubforums = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
    SELECT * FROM subforums`);
  res.json(statement.all());
}

const getAllUsers = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    SELECT * FROM users
  `);
  res.json(statement.all());
}

const getAllSubforumThreads = async (req, res) => {
  let statement = db.prepare(/*sql*/ `
    SELECT * FROM threads 
    WHERE subforumId = $subforumId 
    ORDER BY published_time ASC
  `);
  res.json(statement.all(req.params)); // TODO: CHECK::::
}

const getThreadPosts = async (req, res) => {
  console.log("FETCHIN POSTS");
  let statement = db.prepare(/*sql*/`
    SELECT * FROM posts 
    WHERE threadId = $threadId 
    ORDER BY published_time ASC
  `);
  res.json(statement.all(req.params));
}

const getUserById = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    SELECT * FROM users 
    WHERE id = $id
  `);

  let user = statement.get(req.params) || null;
  if (user) {
    delete user.password;
    res.json(user);
  } else {
    res.status(404).json({ error: "No user with that id!" });
  }
};


// Found better solution....
const getNumberOfThreadsInSubforum = async (req, res) => {
  let statement = db.prepare(/*sql*/`
        SELECT COUNT(subforumId)
        FROM threads  
        WHERE subforumId = $id;
  `);
  res.json(statement.all({ id: req.params.subforumId }));
}

const getNumberOfPostsInThread = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    SELECT COUNT(threadId) 
    FROM posts 
    WHERE threadId = $id
  `);
  res.json(statement.all({ id: req.params.threadId }));
}


//TODO: RENAME; is for specific conversations....
// For specific conversations...
const getNumberOfUnreadMessages = async (req, res) => {

  // console.log("User int here!=!=!=!: ", req);
  // console.log("or here", res);
  console.log("session user", req.session.user.id);

  let statement = db.prepare(/*sql*/"SELECT COUNT(unread) FROM messages WHERE messages.conversationId = $id AND messages.unread = 1 AND NOT messages.senderId = " + req.session.user.id);
    
  res.json(statement.all({ id: req.params.id }));
}


const getTotalNumberOfNewMessages = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    SELECT COUNT(unread)
FROM
messages,
conversations,
conversationsXusers
WHERE
messages.conversationId = conversations.id
AND 
messages.unread = 1
AND 
conversations.id = conversationsXusers.conversationId
AND 
conversationsXusers.userId = $id
AND NOT
messages.senderId = $id
  `);
    res.json(statement.all({ id: req.params.id }));
}



// let statement = db.prepare(/*sql*/`
//     SELECT COUNT(unread)
//     FROM messages
//     WHERE 
//       messages.conversationId = $id
//     AND
//       messages.unread = 1 
//     AND 
//       NOT messages.senderId = ${req.session.user.id}
//   `);




// PUT
const createThread = async (req, res) => {
  console.log("POSTING NEW THREAD");
  let statement = db.prepare(/*sql*/`
    INSERT INTO threads (title, userId, published_time, subforumId) 
    VALUES ($title, $userId, $published_time, $subforumId)
    `);
    
    //WHERE NOT (user.isActive = 0 (SELECT * FROM users WHERE id = userId))
  res.json(statement.run(req.body));
} 


const createPost = async (req, res) => {
  console.log("POSTING NEW POST");
  let statement = db.prepare(/*sql*/`
    INSERT into posts (message, userId, threadId, published_time, warning)
    VALUES ($message, $userId, $threadId, $published_time, $warning)
  `);
  res.json(statement.run(req.body));
}

const createQuote = async (req, res) => {
  console.log("Posting new quote");
  let statement = db.prepare(/*sql*/`
    INSERT INTO quotes (message, userId, postId, published_time, isEdited)
    VALUES ($message, $userId, $postId, $published_time, $isEdited)
  `);
    res.json(statement.run(req.body));
}



const closeThread = async (req, res) => {
  console.log("CLOSING THREAD");
  let statement = db.prepare(/*sql*/`
    UPDATE threads 
    SET active = 0
    WHERE id = $threadId
  `);

  res.json(statement.run({ threadId: req.params.threadId }));
}


const deletePost = async (req, res) => {
  let statement = db.prepare(/*sql*/`
    DELETE FROM posts 
    WHERE id = $id
  `);
  res.json(statement.run({ id: req.params.id }));
}

// const deleteAllUserThreads = async (req, res) => {
//   let statement = db.prepare(/*sql*/`
//     DELETE FROM threads
//     where userId == $id
//   `);
//   res.json(statement.run({ id: req.params.id }));
// }

// const deleteAllUserPosts = async (req, res) => {
//   let statement = db.prepare(/*sql*/`
//     DELETE FROM posts
//     where userId == $id
//   `);
//   res.json(statement.run({ id: req.params.id }));
// }

const deleteUser = async (req, res) => {
  console.log("DELETING USER");
  let statement = db.prepare(/*sql*/`
    DELETE FROM users
    WHERE id = $id 
  `);
  res.json(statement.run({ id: req.params.id }));
}

const deleteThreadById = async (req, res) => {
  console.log("DELETE THREAD BY ID");
  let statement = db.prepare(/*sql*/`
    DELETE FROM threads
    WHERE id = $id
  `);
  res.json(statement.run({ id: req.params.id }));
}



const updateUser = async (req, res) => {
  console.log("UPDATING USER");

  // TOD: if req.body.userRole Sätt alltid till member? - dum ide!, tänk om moderator eller admin uppdateras

  if (req.body.password) {
    req.body.password = Encrypt.multiEncrypt(req.body.password);
  }

  req.body.id = req.params.id;

  let statement = db.prepare(/*sql*/`
    UPDATE users
    SET ${Object.keys(req.body).map(x => x + ' = $' + x)}   
    WHERE id = $id
  `);
  res.json(statement.run(req.body));
}

const updateMessage = async (req, res) => {
  console.log(req.body);

  req.body.id = req.params.id;

  console.log("Update messages");
  let statement = db.prepare(/*sql*/`
    UPDATE messages
    SET ${Object.keys(req.body).map(x => x + ' = $' + x)}
    WHERE id = $id
  `);
  res.json(statement.run(req.body));
}


const updatePost = async (req, res) => {
  console.log("UPDATING POST");

  let statement = db.prepare(/*sql*/`
    UPDATE posts
    SET ${Object.keys(req.body).map(x => x + ' = $' + x)}  
    WHERE id = $id
  `);
  res.json(statement.run(req.body));
}






module.exports = {
  getAllSubforums,
  getAllUsers,
  getAllSubforumThreads,
  getUserById,
  getThreadPosts,
  createThread,
  createPost,
  createQuote,
  closeThread,
  deletePost,
  deleteUser,
  updateUser,
  updatePost,
  getQuoteForPost,

  getNumberOfThreadsInSubforum,
  getNumberOfPostsInThread,
  getTotalNumberOfNewMessages,

  deleteThreadById,
  deleteConversationXusers,

  createConversation,
  addUserToConversation,
  getUsersInConversation,
  createMessage,
  getMessagesInConversation,
  getConversations,
  searchForUser,

  updateMessage,
  getNumberOfUnreadMessages,

deleteMessage
}