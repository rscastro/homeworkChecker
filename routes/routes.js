
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var request = require('request');
var UserModel = require('./Models/userModel');
var AssignmentModel = require('./Models/assignmentModel');
var AnswerModel = require('./Models/answerModel');



// ROUTE TO RETRIEVE API(S) DATA 
router.route('/teacherassignments/:id')
  .get(function(req, res) {

    var loc = req.params;

    UserModel.getUserInfo(loc.id, function(error, userResults) {
      if (!userResults.length) {
        res.send(404)
      } else {
        AssignmentModel.getTeacherAssignments(loc.id, function(error, results) {
          res.json({
            user: userResults[0],
            data: results
          })

        })
      }


    })
  });


router.route('/studentassignments/:username')
  .get(function(req, res) {

    var loc = req.params;

    UserModel.getUserInfo(loc.username, function(error, userResults) {
      if (!userResults.length || error) {
        res.send(404)
      } else {
        AssignmentModel.getStudentAssignments(userResults[0]['user_name'], function(error, results) {
          if (error) {
            res.send(error)
          }
          res.json({
            user: userResults[0],
            data: results
          })

        })
      }


    })



  });

router.route('/answers')
  .post(function(req, res) {

    var loc = req.body;
    AnswerModel.insertAnswer({
      student_id: loc.student_id,
      assignment_id: loc.assignment_id,
      answer: loc.answer,
      answer_time: loc.answer_time
    }, function(error, results) {
      res.json(results)

    })


  });

router.route('/populateAnswers/:id')
  .get(function(req, res) {

    var loc = req.params;
    AnswerModel.populateAnswers(loc.id, function(error, results) {
      res.json(results)

    })


  });

router.route('/userinfo/:username')
  .get(function(req, res) {

    var loc = req.params.username;
    UserModel.getUserInfo(loc, function(error, results) {
      res.json(results)

    })
  });



module.exports = router;