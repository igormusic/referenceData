(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name com.module.core.directive:home
   * @description
   * # home
   */
  angular
    .module('com.module.core')
    .directive('home', function () {
      return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink (scope, element, attrs) {
          element.text('this is the home directive ' + attrs);
        }
      };
    })
    .directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {            
          function into(input) {
            return JSON.parse(input);
          }
          function out(data) {
            return JSON.stringify(data);
          }
          ngModel.$parsers.push(into);
          ngModel.$formatters.push(out);

        }
    };
});

})();
