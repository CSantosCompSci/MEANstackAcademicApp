(function () {
  'use strict';

//var colstudentapp = angular.module('colstudents');
angular.module('colstudents').controller('ColstudentsController', ColstudentsController);

//colstudentapp.controller('ColstudentsController,['$scope', '$state','$location', 'Authentication', 'colstudentResolve'
ColstudentsController.$inject = ['$scope', '$state', 'Authentication', 'colstudentResolve'];

  function ColstudentsController ($scope, $state, Authentication, Colstudents) {

    var vm = this;
    vm.authentication = Authentication;

  //Create new Student
  $scope.create = function () {
    //Create new student object
    var colstudent = new Colstudents({
      LastName: this.LastName,
      FirstName: this.FirstName,
      MAT251CalcI: this.MAT251CalcI,
      MAT252CalcII: this.MAT252CalcII,
      MAT320DiscreteMath: this.MAT320DiscreteMath,
      CPS210CompSciI: this.CPS210CompSciI,
      CPS310CompSciII: this.CPS310CompSciII,
      CPS315CompSciIII: this.CPS315CompSciIII,
      CPS352OOP: this.CPS352OOP,
      CPS330AssemblyArch: this.CPS330AssemblyArch,
      CPS415DiscContAlgorithms: this.CPS415DiscContAlgorithms,
      CPS340OpSys: this.CPS340OpSys,
      CPS425LangProcessing: this.CPS425LangProcessing,
      CPS493Elect1: this.CPS493Elect1,
      CPS493Projects: this.CPS493Projects,
      EGC230DigLogic: this.EGC230DigLogic,
      EGC208DigLogicLab: this.EGC208DigLogicLab,
      ScienceI: this.ScienceI,
      ScienceII: this.ScienceII,
      MAT251CalcIComment: this.MAT251CalcIComment,
      MAT252CalcIIComment: this.MAT252CalcIIComment,
      MAT320DiscreteMathComment: this.MAT320DiscreteMathComment,
      CPS210CompSciIComment: this.CPS210CompSciIComment,
      CPS310CompSciIIComment: this.CPS310CompSciIIComment,
      CPS315CompSciIIIComment: this.CPS315CompSciIIIComment,
      CPS352OOPComment: this.CPS352OOPComment,
      CPS330AssemblyArchComment: this.CPS330AssemblyArchComment,
      CPS415DiscContAlgorithmsComment: this.CPS415DiscContAlgorithmsComment,
      CPS340OpSysComment: this.CPS340OpSysComment,
      CPS425LangProcessingComment: this.CPS425LangProcessingComment,
      CPS493Elect1Comment: this.CPS493Elect1Comment,
      CPS493ProjectsComment: this.CPS493ProjectsComment,
      EGC230DigLogicComment: this.EGC230DigLogicComment,
      EGC208DigLogicLabComment: this.EGC208DigLogicLabComment,
      ScienceIComment: this.ScienceIComment,
      ScienceIIComment: this.ScienceIIComment
    });
    vm.colstudent = colstudent;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    //Redirect after save

    colstudent.$save(function (response) {
      //$location.path('colstudents/' + response._id);

      //clear form fields
      $scope.LastName = '';
      $scope.FirstName = '';
      $scope.MAT251Calc = '';
      $scope.MAT252CalcII = '';
      $scope.MAT320DiscreteMath = '';
      $scope.CPS210CompSciI = '';
      $scope.CPS310CompSciII = '';
      $scope.CPS315CompSciIII = '';
      $scope.CPS352OOP = '';
      $scope.CPS330AssemblyArch = '';
      $scope.CPS415DiscContAlgorithms = '';
      $scope.CPS415DiscContAlgorithms = '';
      $scope.CPS340OpSys = '';
      $scope.CPS425LangProcessing = '';
      $scope.CPS493Elect1 = '';
      $scope.CPS493Projects = '';
      $scope.EGC230Dig.Logic = '';
      $scope.EGC208DigLogicLab = '';
      $scope.ScienceI = '';
      $scope.ScienceII = '';
      $scope.MAT251CalcComment = '';
      $scope.MAT252CalcIIComment = '';
      $scope.MAT320DiscreteMathComment = '';
      $scope.CPS210CompSciIComment = '';
      $scope.CPS310CompSciIIComment = '';
      $scope.CPS315CompSciIIIComment = '';
      $scope.CPS352OOPComment = '';
      $scope.CPS330AssemblyArchComment = '';
      $scope.CPS415DiscContAlgorithmsComment = '';
      $scope.CPS415DiscContAlgorithmsComment = '';
      $scope.CPS340OpSysComment = '';
      $scope.CPS425LangProcessingComment = '';
      $scope.CPS493Elect1Comment = '';
      $scope.CPS493ProjectsComment = '';
      $scope.EGC230Dig.LogicComment = '';
      $scope.EGC208DigLogicLabComment = '';
      $scope.ScienceIComment = '';
      $scope.ScienceIIComment = '';
    }, function (errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

   // vm.authentication = Authentication;


    // Remove existing Colstudent
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.colstudent.$remove($state.go('colstudents.list'));
      }
    }

  this.studentView = function(selectedCustommer){

  };

    // Save Colstudent
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.colstudentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.colstudent._id) {
        vm.colstudent.$update(successCallback, errorCallback);
      } else {
        vm.colstudent.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('colstudents.view', {
          colstudentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
