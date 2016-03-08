
var db = require('../DB/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../DB/psql/index.js');

module.exports.getUserInfo = function(userData, callback, database) {
  db = database || db;


  var queryParameters = [userData]
  console.log('db is', db)
    //console.log('event model insert', queryParameters, queryString.getTeacherAssignments)
    //insert eventObj into eventObjs table
  return db.query(queryString.getOneUser, queryParameters)
    .then(function(eventObjId) {
      console.log('inserted eventObj id is', eventObjId);
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      //console.log('error inserting eventObj to db, error is:', error);
      return callback(error, null);
    });
};

module.exports.insertUser = function(userData, callback, database) {

  var queryParameters = [userData.full_name, userData.user_name, userData.type]
  console.log('db is', db)
    //console.log('event model insert', queryParameters, queryString.getTeacherAssignments)
    //insert eventObj into eventObjs table
  return db.query(queryString.insertUser, queryParameters)
    .then(function(eventObjId) {
      console.log('inserted eventObj id is', eventObjId);
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      //console.log('error inserting eventObj to db, error is:', error);
      return callback(error, null);
    });
};