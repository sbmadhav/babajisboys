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
    $scope.options = [
       'White',
       'Black',
       'Create New'
    ];
    var orgJson = {
        'Sapient': 'Black',
        'Google': 'White',
        'Microsoft': 'Green'
    };
      
    $scope.orgSelected = function() {
        if( orgJson[$scope.org] != undefined ){
            $("#theme").attr("disabled", "disabled");
            $(".theme-selected").text(orgJson[$scope.org] + " theme is selected");
        }
        else {
            $("#theme").removeAttr("disabled");
            $(".theme-selected").text("");
        }
    };
    
    $scope.preview = function() {        
        $("#card-name").text("abc");
    };
      
    $scope.submitData = function() {
        var formData = $("#form-data").serializeArray();
        sessionStorage.setItem("customerData", formData);
        $location.path("/theme");
    };
      
  });
