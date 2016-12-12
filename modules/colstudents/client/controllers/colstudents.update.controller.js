(function () {
    'use strict';

    // ColStudents controller
    angular
        .module('colstudents')
        .controller('ColStudentsUpdateController', ColStudentsUpdateController);

    ColStudentsUpdateController.$inject = ['$scope','$state', '$stateParams','colstudentResolve','$log','$location'];

    function ColStudentsUpdateController ($scope, $state, $stateParams,  Colstudents, $log,$location) {
        var vm = this;

        vm.update = function() {
            var colstudent = $scope.colstudent;

            colstudent.$update(function() {
                $location.path('colstudents/' + colstudent._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };




    }

    })();