const sqlite3 = require("better-sqlite3");
const db = sqlite3('../database/database.db');
const Encrypt = require('../Encrypt');

const register = async (req, res) => {
  if (req.body.email === "" || req.body.password === "" || req.body.username === "" ||
    !isValidEmail(req.body.email) || req.body.password.length < 8) {
    res.status(422).json({ error: "Invalid registration attempt!" });
    return;
      //return "Failed to register";
  }

  req.body.password = Encrypt.multiEncrypt(req.body.password);

  let statement = db.prepare(/*sql*/`
    INSERT INTO users (email, password, username)
    VALUES ($email, $password, $username)
  `);
  res.json(statement.run(req.body));
}


const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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