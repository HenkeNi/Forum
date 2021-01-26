// (Access Controll List)

module.exports = function (settings) {
  
  let { restPrefix } = settings;

  return function (req, res, next) {

    // Check if url has restPrefix
    if (req.url.indexOf(restPrefix) !== 0) {
      // Url does not start with restPrefix --> do nothing..
      next();
      return;
    }

    // Check if function exist in settings with same name as table that are querying
    //let tableName = req.url.replace(restPrefix, '').split('/')[0];

    let tableName = req.url.replace(restPrefix, '').split('/')[1];
    
    console.log("Table name: ", tableName);

    // if no method name with same name as table in settings 
    // or the method returns false --> forbid access
    if (typeof settings[tableName] !== 'function' || !settings[tableName](
      req.session.user || {}, req.method, req
    )) {
      res.status(403);
      res.json({ error: 'Not allowed: No such table??' });
      return;
    }

    next();
  } 
};