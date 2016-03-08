
var db = require('../DB/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../DB/psql/index.js');


module.exports.getStudentAssignments = function(userData, callback, database) {

  var queryParameters = [userData]
  return db.query(queryString.getStudentAssignments, queryParameters)
    .then(function(eventObjId) {
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      return callback(error, null);
    });
}


module.exports.getTeacherAssignments = function(userData, callback, database) {

  var queryParameters = [userData];
  return db.query(queryString.getTeacherAssignments, queryParameters)
    .then(function(eventObjId) {
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      return callback(error, null);
    });
};