'use strict';

var sqlLoad = require('sql-load');
var path = require('path');
/**
 * This is a directory of all the SQL strings that are used by the database.
 * To add a Query, create a sql file in the `psql/` directory and then require it
 * in the module.exports object of this file.
 * @type {Object}
 */
module.exports = {


  getStudentAssignments: sqlLoad(path.join(__dirname, './get-student-assignments')),
  getTeacherAssignments: sqlLoad(path.join(__dirname, './get-teacher-assignments')),
  insertAnswer: sqlLoad(path.join(__dirname, './insert-answer')),
  populateAnswers: sqlLoad(path.join(__dirname, './populate-answers')),
  getOneUser: sqlLoad(path.join(__dirname, './get-one-user.sql')),
  
};
