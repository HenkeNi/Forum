const sqlite3 = require('better-sqlite3');
const Encrypt = require('./Encrypt');


module.exports = class RestApi {

  constructor(expressApp, urlPrefix = '/api/', pathToDB = '../database/database.db') {
    this.app = expressApp;
    this.db = sqlite3(pathToDB);
    this.prefix = urlPrefix;
    //let tables = this.getAllTables();

    for (let table of this.getAllTables()) {
      this.createGetAllRoute(table);
      this.createGetRoute(table);
      this.createPostRoute(table);
      this.createPutRoute(table);
      this.createDeleteRoute(table);
    }
    this.addLoginRoutes();
  }

  // Get all table names
  getAllTables() {
    let statement = this.db.prepare(`
      SELECT name
      FROM sqlite_master
      WHERE type = $type
    `);
    return statement.all({ type: 'table' }).map(x => x.name);
  }

  createGetAllRoute(table) {
    this.app.get(this.prefix + table, (req, res) => {
      let statement = this.db.prepare(`
        SELECT * FROM ${table}
      `);

      /*let result = statement.all();
        result.forEach(x => delete x.password);
        res.json(result);*/

      res.json(statement.all().map(x => ({ ...x, password: undefined })));

      //res.json(statement.all());
    });
  }

  createGetRoute(table) {
    this.app.get(this.prefix + table + '/:id', (req, res) => {
      let statement = this.db.prepare(`
        SELECT * FROM ${table}
        WHERE id = $id
      `);
      let result = statement.get(req.params) || null;   
      if (result) { delete result.password; }

      res.json(result); 
    });
  }

  createPostRoute(table) {
    this.app.post(this.prefix + table, (req, res) => {
      let b = req.body;
      if (b.password) { b.password = Encrypt.multiEncrypt(b.password); } // encrypt password fields (if any!)

      // build statement
      let statement = this.db.prepare(`
        INSERT INTO ${table} (${Object.keys(b)})
        VALUES (${Object.keys(b).map(x => '$' + x)})  
      `);
      res.json(statement.run(b));
    });
  }

  createPutRoute(table) {
    this.app.put(this.prefix + table + '/:id', (req, res) => {
      let b = req.body;
      if (b.password) { b.password = Encrypt.multiEncrypt(b.password); } // encrypt password fields (if any!)

      // add id to b (req.body)
      b.id = req.params.id;

      let statement = this.db.prepare(`
        UPDATE ${table} 
        SET ${Object.keys(b).map(x => x + ' = $' + x)}   
        WHERE  id = $id    
      `);
      res.json(statement.run(b));
    });
  }

  createDeleteRoute(table) {
    this.app.delete(this.prefix + table + '/:id', (req, res) => {
      let statement = this.db.prepare(`
        DELETE FROM ${table} WHERE id = $id
      `);
      res.json(statement.run(req.params));
    });
  }



  // Add routes for login, check if logged in and log out (Note pure rest routes...)
  addLoginRoutes() {

    // POST = Login
    this.app.post(this.prefix + 'login', (req, res) => {
      if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }

      let statement = this.db.prepare(`
        SELECT * FROM users
        WHERE email = $email AND password = $password 
      `);
      let user = statement.get(req.body) || null;
      if (user) {
        delete user.password;
        req.session.user = user; // Save logged in user in session
      }
      res.json(user);
    });

    // GET (= Login) - check if logged in and return user if so
    this.app.get(this.prefix + 'login', (req, res) => {
      res.json(req.session.user || null);
    });

    // DELETE (= Log out) - logged out a logged in user
    this.app.delete(this.prefix + 'login', (req, res) => {
      delete req.session.user; // delete the session
      res.json({ loggedOut: true });
    });

  }
  
}

