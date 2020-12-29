const express = require('express');
const session = require('express-session');
const store = require('better-express-store');

const app = express();
const RestApi = require('./RestApi');
const ACL = require('./ACL');
const ACLsettings = require('./ACLsettings')



// Make express able to read 'req.body'
app.use(express.json()); 


// Add express-session as middleware to our express app (to handle sessions)
app.use(session({
  secret: require('./session-secret.json'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: store({ dbPath: './database.db' })
}));

// Add own middleware for handling ACL (Access Controll)
app.use(ACL(ACLsettings));


// Create the REST api
new RestApi(app, '/api/', './database.db');


// Start web server
app.listen(3000, () => { console.log('Listening on port 3000') }); 












