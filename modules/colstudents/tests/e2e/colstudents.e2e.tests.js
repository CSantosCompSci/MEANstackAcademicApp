'use strict';

describe('Colstudents E2E Tests:', function () {
  describe('Test Colstudents page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/colstudents');
      expect(element.all(by.repeater('colstudent in colstudents')).count()).toEqual(0);
    });
  });
});
