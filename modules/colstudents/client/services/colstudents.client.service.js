//Colstudents service used to communicate Colstudents REST endpoints
(function () {
  'use strict';

  angular
    .module('colstudents')
    .factory('ColstudentsService', ColstudentsService);

  ColstudentsService.$inject = ['$resource'];

  function ColstudentsService($resource) {
    return $resource('api/colstudents/:colstudentId', {
      colstudentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
