
var db = require('../DB/config.js');

//retrieve sql query for inserting poll into polls table
var queryString = require('../DB/psql/index.js');

module.exports.populateAnswers = function(userData, callback, database) {


  var queryParameters = [userData]
  console.log('db is', db)

  return db.query(queryString.populateAnswers, queryParameters)
    .then(function(eventObjId) {
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      return callback(error, null);
    });
};

module.exports.insertAnswer = function(userData, callback, database) {

  var queryParameters = [userData.student_id, userData.assignment_id, userData.answer, userData.answer_time]
  return db.query(queryString.insertAnswer, queryParameters)
    .then(function(eventObjId) {
      return callback(null, eventObjId);
    })
    .catch(function(error) {
      return callback(error, null);
    });
};