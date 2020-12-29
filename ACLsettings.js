module.exports = {
  /*
    Settings for acl: 
    where does our rest api live -> restPrefix
    +1 function per table that can return true (allowed route)
    or false (not allowed route)
  */
  restPrefix: '/api/',
  users(user, method, req) {
    // Allow everyone to create a user if userRole is basic user
    if (method === 'POST' && req.body.userRole === 'member') { return true; }
    
    // Allow admins to create user with any role
    if (method === 'POST' && user.userRole === 'admin') { return true; }

    // Allow all logged in users to see list of other users
    if (method === 'GET' && user.userRole) { return true; }

    // Allow admins to change info about a user
    if (method === 'PUT' && user.userRole === 'admin') { return true; }

    // Allow a user to change their own info (split.pop is how to get id from url)
    if (method === 'PUT' && +req.url.split('/').pop() === user.id) { return true; }
    
    // Allow admins to delete users
    if (method === 'DELETE' && user.userRole === 'admin') { return true; }
    
    return false; // otherwise don't allow the request
  },
  login() {
    return true; // always allow attempts to login and logout
  }
};