
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

module.exports.insertAssignment = function(userData, callback, database) {

  var queryParameters = [userData.owner, userData.question, userData.due_date, userData.category];
  console.log(queryParameters)
  return db.query(queryString.insertAssignment, queryParameters)
    .then(function(eventObjId) {
      console.log('sucess')
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      console.log('FAIL', error)
      return callback(error, null);
    });
};

module.exports.insertConnection = function(userData, callback, database) {

  var queryParameters = [userData.student, userData.assignment];
  return db.query(queryString.insertConnection, queryParameters)
    .then(function(eventObjId) {
      console.log('sucessSSS')
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      console.log('errorrrrr')
      return callback(error, null);
    });
};