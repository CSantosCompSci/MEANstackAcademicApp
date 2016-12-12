'use strict';

/**
 * Module dependencies
 */
var colstudentsPolicy = require('../policies/colstudents.server.policy'),
  colstudents = require('../controllers/colstudents.server.controller');

module.exports = function(app) {
  // Colstudents Routes
  app.route('/api/colstudents').all(colstudentsPolicy.isAllowed)
    .get(colstudents.list)
    .post(colstudents.create);

  app.route('/api/colstudents/:colstudentId').all(colstudentsPolicy.isAllowed)
    .get(colstudents.read)
    .put(colstudents.update)
    .delete(colstudents.delete);

  // Finish by binding the Colstudent middleware
  app.param('colstudentId', colstudents.colstudentByID);
};
