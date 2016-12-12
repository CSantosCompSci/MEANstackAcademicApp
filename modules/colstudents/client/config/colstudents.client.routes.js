(function () {
  'use strict';

  angular
    .module('colstudents')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('colstudents', {
        abstract: true,
        url: '/colstudents',
        template: '<ui-view/>'
      })
      .state('colstudents.list', {
        url: '',
        templateUrl: 'modules/colstudents/client/views/list-colstudents.client.view.html',
        controller: 'ColstudentsListController',
        controllerAs: 'vm',
        permission: 'user',
        data: {
          pageTitle: 'Colstudents List'
        }
      })
      .state('colstudents.memo', {
        url: '/memo',
        templateUrl: 'modules/colstudents/client/views/form-colstudent.client.view.html',
        controller: 'ColStudentsViewController',
        controllerAs: 'vm',
        resolve: {
          colstudentResolve: newColstudent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Colstudents Create'
        }
      })
      .state('colstudents.edit', {
        url: '/:colstudentId/edit',
        templateUrl: 'modules/colstudents/client/views/edit-course-colstudent.client.view.html',
        controller: 'ColStudentsViewController',
        controllerAs: 'vm',
        resolve: {
          colstudentResolve: getColstudent
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Colstudent {{ colstudentResolve.name }}'
        }
      })
      .state('colstudents.view', {
        url: '/:colstudentId',
        templateUrl: 'modules/colstudents/client/views/view-colstudent.client.view.html',
        controller: 'ColStudentsViewController',
        controllerAs: 'vm',
        resolve: {
          colstudentResolve: getColstudent
        },
        data:{
          pageTitle: 'Colstudent {{ colstudentResolve.name }}'
        }
      });
  }

  getColstudent.$inject = ['$stateParams', 'ColstudentsService'];

  function getColstudent($stateParams, ColstudentsService) {
    return ColstudentsService.get({
      colstudentId: $stateParams.colstudentId
    }).$promise;
  }

  newColstudent.$inject = ['ColstudentsService'];

  function newColstudent(ColstudentsService) {
    return new ColstudentsService();
  }
})();
