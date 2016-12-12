(function () {
    'use strict';

    // ColStudents controller
    angular
        .module('colstudents')
        .controller('ColStudentsViewController', ColStudentsViewController);

    ColStudentsViewController.$inject = ['$scope', '$state', 'Authentication', 'colstudentResolve','$modal', '$log'];

    function ColStudentsViewController ($scope, $state, Authentication, colstudents,$modal,$log) {
        var vm = this;

        vm.authentication = Authentication;
        vm.colstudent = colstudents;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.updater = updater;


        // Remove existing Student
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.colstudent.$remove($state.go('colstudents.list'));
            }
        }


        // Save Student
        function updater() {


                vm.colstudent.$update(successCallback, errorCallback);


            function successCallback(res) {
                $state.go('colstudents.view', {
                    colstudentId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }

        /**This function checks the letter grade of the course to see if its in the required range returning the
         * CSS class
         * @param letterValue
         * @returns {CSS class to be displayed}
         */
        $scope.passingValue = function (letterValue) {
            if(letterValue === "F"||letterValue === "D" ||letterValue === "D-"||letterValue === "D+" ||
                letterValue === ""){
                return "color-red";
            }
            else
                return "color-green";

        };


        vm.modalUpdate = function (size, selectedColstudent,courseTitle) {
        var courseDetails = $modal.open({
            templateUrl: 'modules/colstudents/client/views/edit-course-colstudent.client.view.html',
            controller:function ($scope,$modalInstance,colstudent) {
            $scope.colstudent = colstudent;
            $scope.title = courseTitle;

                $scope.update = function() {
                    var colstudent = $scope.colstudent;

                    colstudent.$update(function() {

                    }, function(errorResponse) {
                        $scope.error = errorResponse.data.message;
                    });
                };

                $scope.ok = function () {
                    $modalInstance.close($scope.colstudent);
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

        },
        size: size,
        resolve:{
          colstudent: function () {
            return selectedColstudent;
          }
        }
      });
    courseDetails.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    },function () {
      $log.info('Modal dismissed at :' + new Date());
    });
};}})();



















