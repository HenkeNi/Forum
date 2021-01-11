const sqlite3 = require("better-sqlite3");
const db = sqlite3('../database/database.db');
const Encrypt = require('../Encrypt');

const register = async (req, res) => {
  console.log("REGISTER USER");
  req.body.password = Encrypt.multiEncrypt(req.body.password);

  let statement = db.prepare(/*sql*/`
    INSERT INTO users (email, password, username, userRole) values ($email, $password, $username, $userRole)`);
  res.json(statement.run(req.body));
}


const login = async (req, res) => {

  console.log("SIGN IN USER");

  if (req.body.password) {
    req.body.password = Encrypt.multiEncrypt(req.body.password);
  }

  let statement = db.prepare(/*sql*/`
    SELECT * FROM users
    WHERE email = $email AND password = $password
  `);
  let user = statement.get(req.body) || null;

  if (user) {
    delete user.password;
    req.session.user = user;
  }
  res.json(user);
} 


const whoami = async (req, res) => {
  console.log("CURRENT USER", req.session.user);
  res.json(req.session.user || null);
}


const logout = async (req, res) => {
  console.log("LOGOUT USER");
  delete req.session.user;
  res.json({ loggedOut: true });
}

module.exports = {
  register,
  login,
  whoami,
  logout
};