'use strict';

angular.module('hacksterApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.fontSize = [
      '14',
      '16',
      '18',
      '14',
      '16',
      '18'
    ];
    var options = [{
       name: 'Something Cool',
       value: 'something-cool-value'
    }, {
       name: 'Something Else',
       value: 'something-else-value'
    }];
      
    $scope.submitData = function() {
        var formData = $("#form-data").serializeArray();
        sessionStorage.setItem("customerData", formData);
        $location.path("/theme");
    }
      
  });
