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
       'Red',
       'Black',
       'Green',
       'Create New'
    ];
    var orgJson = {
        'Sapient': 'Black',
        'Google': 'Red',
        'Microsoft': 'Green'
    };
      
    $scope.orgSelected = function() {
        if( orgJson[$scope.org] != undefined ){
            $("#theme").attr("disabled", "disabled");
            $(".theme-selected").text(orgJson[$scope.org] + " theme is selected");
            $scope.theme = orgJson[$scope.org];
            $(".theme-selected").css("color", orgJson[$scope.org]);
        }
        else {
            $("#theme").removeAttr("disabled");
            $(".theme-selected").text("");
        }
    };
    
    $scope.preview = function(evt) {  
        
        evt.preventDefault();
        if( $scope.theme == "Black"){
            $(".modal-content").css("background-color", "black");
            $(".modal-dialog").css("color", "white");
            $(".card-wrapper").css("border", "1px white solid");
        } else if( $scope.theme == "Red"){
             $(".modal-content").css("background-color", "Red");
             $(".modal-dialog").css("color", "white");
             $(".card-wrapper").css("border", "1px white solid");
        } else if( $scope.theme == "Green"){
             $(".modal-content").css("background-color", "green");
             $(".modal-dialog").css("color", "white");
             $(".card-wrapper").css("border", "1px white solid");
        }
    };
      
    $scope.submitData = function() {
        var formData = $("#form-data").serializeArray();
        sessionStorage.setItem("customerData", formData);
        $location.path("/theme");
    };
      
  });
