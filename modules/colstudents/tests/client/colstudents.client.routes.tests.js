(function () {
  'use strict';

  describe('Colstudents Route Tests', function () {
    // Initialize global variables
    var $scope,
      ColstudentsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ColstudentsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ColstudentsService = _ColstudentsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('colstudents');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/colstudents');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ColstudentsController,
          mockColstudent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('colstudents.view');
          $templateCache.put('modules/colstudents/client/views/view-colstudent.client.view.html', '');

          // create mock Colstudent
          mockColstudent = new ColstudentsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Colstudent Name'
          });

          //Initialize Controller
          ColstudentsController = $controller('ColstudentsController as vm', {
            $scope: $scope,
            colstudentResolve: mockColstudent
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:colstudentId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.colstudentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            colstudentId: 1
          })).toEqual('/colstudents/1');
        }));

        it('should attach an Colstudent to the controller scope', function () {
          expect($scope.vm.colstudent._id).toBe(mockColstudent._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/colstudents/client/views/view-colstudent.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ColstudentsController,
          mockColstudent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('colstudents.create');
          $templateCache.put('modules/colstudents/client/views/form-colstudent.client.view.html', '');

          // create mock Colstudent
          mockColstudent = new ColstudentsService();

          //Initialize Controller
          ColstudentsController = $controller('ColstudentsController as vm', {
            $scope: $scope,
            colstudentResolve: mockColstudent
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.colstudentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/colstudents/create');
        }));

        it('should attach an Colstudent to the controller scope', function () {
          expect($scope.vm.colstudent._id).toBe(mockColstudent._id);
          expect($scope.vm.colstudent._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/colstudents/client/views/form-colstudent.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ColstudentsController,
          mockColstudent;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('colstudents.edit');
          $templateCache.put('modules/colstudents/client/views/form-colstudent.client.view.html', '');

          // create mock Colstudent
          mockColstudent = new ColstudentsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Colstudent Name'
          });

          //Initialize Controller
          ColstudentsController = $controller('ColstudentsController as vm', {
            $scope: $scope,
            colstudentResolve: mockColstudent
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:colstudentId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.colstudentResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            colstudentId: 1
          })).toEqual('/colstudents/1/edit');
        }));

        it('should attach an Colstudent to the controller scope', function () {
          expect($scope.vm.colstudent._id).toBe(mockColstudent._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/colstudents/client/views/form-colstudent.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
