const express = require('express');
const session = require('express-session');
const store = require('better-express-store');

const restRoutes = require('./routes/restRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const RestApi = require('./RestApi');
const ACL = require('./ACL');
const ACLsettings = require('./ACLsettings')


// Make express able to read 'req.body'
app.use(express.json()); 



app.use((error, req, res, next) => {
  if (error) {
    res.status(500);
    res.json({
      error: 'An error occurred',
      errorDetails: error
    });
  }
})

// Add express-session as middleware to our express app (to handle sessions)
app.use(session({
  secret: require('./session-secret.json'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: store({ dbPath: '../database/database.db' })
}));

// Add own middleware for handling ACL (Access Controll)
app.use(ACL(ACLsettings));


// Create the REST api
//new RestApi(app, '/api/', '../database/database.db');
//new RestApi(app, '/api/', './database.db');


// Start web server
app.listen(4000, () => { console.log('Listening on port 4000') }); 

app.use('/rest', restRoutes);
app.use('/rest', authRoutes);












