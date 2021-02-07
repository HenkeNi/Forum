module.exports = {
  /*
    Settings for acl: 
    where does our rest api live -> restPrefix
    +1 function per table that can return true (allowed route)
    or false (not allowed route)
  */
  restPrefix: '/rest/',
  subforums(user, method, req) {
    if (method === 'GET') { return true; }
  },
  threads(user, method, req) {
    //return true;
    if (method === 'GET') { return true; }

    if (method === 'POST' && (user.userRole === 'member' || user.userRole === 'admin' || user.userRole === 'moderator')) { return true; }

    if (method === 'PUT' && (user.userRole === 'admin' || user.userRole === 'moderator')) { console.log("CLOSING THREAD"); return true; }
 
    if (method === 'DELETE' && (user.userRole === 'admin' || user.userRole === 'moderator')) { return true; }
  },
  posts(user, method, req) {
    
    if (method === 'GET') { return true; }

    if (method === 'POST' && (user.userRole === 'member' || user.userRole === 'admin' || user.userRole === 'moderator')) { return true; }
  
    if (method === 'DELETE' && (user.userRole === 'admin' || user.userRole === 'moderator')) { return true; }

    console.log(req.body);
    if (method === 'PUT' && (user.userRole === 'admin' || user.userRole === 'moderator' || req.body.userId === user.id)) { return true; }
  },
  users(user, method, req) {

    // Allow all logged in users to see list of other users
    //if (method === 'GET' && user.userRole) { return true; } // TODO: keep it like this (check if users is logged in else -> anonymous User)
    if (method === 'GET') { return true; }

    // Allow everyone to create a user if userRole is basic user
    if (method === 'POST' && req.body.userRole === 'member') { return true; }
    
    // Allow admins to create user with any role
    if (method === 'POST' && user.userRole === 'admin') { return true; }

    // Allow admins to change info about a user
    if (method === 'PUT' && user.userRole === 'admin') { return true; }

    // Allow a user to change their own info (split.pop is how to get id from url)
    if (method === 'PUT' && req.body.userRole !== 'admin' && +req.url.split('/').pop() === user.id) { return true; }
    
    // Allow admins to delete users
    if (method === 'DELETE' && user.userRole === 'admin') { return true; }
    
    return false; // otherwise don't allow the request
  },
  login() {
    return true; // always allow attempts to login and logout
  },
  register(user, method, req) {
    if (method === 'POST' && user.userRole !== 'admin') { return true; }
    return false;
    //return true; // TODO: FIX!!!
  },
  whoami() {
    return true;
  },
  logout() {  
    return true; // TODO : bara loga ut om det finns en userRole??
  },


  // ************ TEST ******
  conversations(user, method, req) {

    if (method === 'GET' && user.userRole) { console.log("IN HERE"); return true; } 
    
    if (method === 'POST' && user.userRole) { return true; } 
    
    if (method === 'DELETE' && user.userRole) { return true; }

    return false;
  },
  conversationsXusers(user, method, req) {
    if (method === 'GET' && user.userRole) { return true; } 
    
    if (method === 'POST' && user.userRole) { return true; } 
    
    if (method === 'DELETE' && user.userRole) { return true; }

    return false;
  },
  messages(user, method, req) {

    // Everyone can do a get
    if (method === 'GET' && user.userRole) { return true; } // TODO: Bara dem med rätt conversationsId ska få tillgång till meddelanden
    
    // All logged in users can do a post
    if (method === 'POST' && user.userRole) { return true; } 

    if (method === 'DELETE' && user.userRole) { return true; }

    if (method === 'PUT' && user.userRole) { return true; }

    return false;
  },

  quotes(user, method, req) {
    if (method === 'POST' && user.userRole) { return true; }

    if (method === 'GET') { return true; }

    return false;
  }


};