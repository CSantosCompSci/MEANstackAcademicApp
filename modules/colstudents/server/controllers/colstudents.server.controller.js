'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Colstudent = mongoose.model('Colstudent'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Colstudent
 */
exports.create = function(req, res) {
  var colstudent = new Colstudent(req.body);
  colstudent.user = req.user;

  colstudent.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(colstudent);
    }
  });
};

/**
 * Show the current Colstudent
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var colstudent = req.colstudent ? req.colstudent.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  //colstudent.isCurrentUserOwner = req.user && colstudent.user && colstudent.user._id.toString() === req.user._id.toString() ? true : false;
  res.jsonp(colstudent);
};

/**
 * Update a Colstudent
 */
exports.update = function(req, res) {
  var colstudent = req.colstudent ;

  colstudent = _.extend(colstudent , req.body);

  colstudent.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(colstudent);
    }
  });
};

/**
 * Delete an Colstudent
 */
exports.delete = function(req, res) {
  var colstudent = req.colstudent ;

  colstudent.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(colstudent);
    }
  });
};

/**
 * List of Colstudents
 */
exports.list = function(req, res) { 
  Colstudent.find().sort('-created').populate('user', 'displayName').exec(function(err, colstudents) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(colstudents);
    }
  });
};

/**
 * Colstudent middleware
 */
exports.colstudentByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Colstudent is invalid'
    });
  }

  Colstudent.findById(id).populate('user', 'displayName').exec(function (err, colstudent) {
    if (err) {
      return next(err);
    } else if (!colstudent) {
      return res.status(404).send({
        message: 'No Colstudent with that identifier has been found'
      });
    }
    req.colstudent = colstudent;
    next();
  });
};
