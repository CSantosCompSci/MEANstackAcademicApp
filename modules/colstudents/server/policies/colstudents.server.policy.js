'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Colstudents Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/colstudents',
      permissions: '*'
    }, {
      resources: '/api/colstudents/:colstudentId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/colstudents',
      permissions: '*'//['get', 'post']
    }, {
      resources: '/api/colstudents/:colstudentId',
      permissions: ['*']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/colstudents',
      permissions: '',//['get']
    }, {
      resources: '/api/colstudents/:colstudentId',
      permissions: ''//['get']
    }]
  }]);
};

/**
 * Check If Colstudents Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Colstudent is being processed and the current user created it then allow any manipulation
  if (req.colstudent && req.user && req.colstudent.user && req.colstudent.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
