(function () {
      'use strict';

      angular
          .module('colstudents')
          .controller('ColstudentsListController', ColstudentsListController);

      ColstudentsListController.$inject = ['ColstudentsService', '$scope', '$location', '$modal', '$log'];

      function ColstudentsListController(ColstudentsService, $scope, $location, $modal, $log) {
        var vm = this;

        vm.colstudents = ColstudentsService.query();

        /** vm.modalInstance = function (size, selectedStudent) {
      var studentDetails = $modal.open({
        templateUrl: 'modules/colstudents/client/views/view-colstudent.client.view.html',
        controller:function ($scope,$modalInstance,colstudent) {
          $scope.colstudent= colstudent;
        },
        size: size,
        resolve:{
          colstudent: function () {
            return: selectedStudent;
          }
        }
      });
    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    },function () {
      $log.info('Modal dismissed at :' + new Date());
    });

    })
         }

         /**$scope.viewStudent = function (view) {
      $location.path(view);
      //var student = 'modules/colstudents/client/views/view-colstudent.client.view.html'
      
    }*/
      }
    }
)();
/**angular.module('colstudents').directive('colstudentList', [function (){
  return{
    restrict: 'E',
    transclude : true,
    templateUrl:'modules/colstudents/client/views/student-list-template.html',
    link: function ($scope, element, attrs) {
    }
  };
}]);
 */