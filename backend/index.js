const express = require('express');
const session = require('express-session');
const store = require('better-express-store');

const restRoutes = require('./routes/restRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const RestApi = require('./RestApi');
const ACL = require('./ACL');
const ACLsettings = require('./ACLsettings')

const path = require('path');


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
new RestApi(app, '/rest/', '../database/database.db');
//new RestApi(app, '/api/', './database.db');

app.use('/rest/v1', restRoutes);
app.use('/rest/v1', authRoutes);




app.use(express.static('dist'));

// app.use(express.static(path.join(dirname, 'frontend')));
// app.get('/', (req, res)=>{
//  res.sendFile(path.join(dirname, "../frontend/dist/index.html"));
// });

//app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))

/*app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});*/



// Start web server
app.listen(4000, () => { console.log('Listening on port 4000') }); 












