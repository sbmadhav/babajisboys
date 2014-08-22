'use strict';

angular.module('hacksterApp')
  .controller('MainCtrl', function ($scope, $location, $firebase) {
    var ref = new Firebase("https://ebusinesscard.firebaseio.com/accounts");
    var sync = $firebase(ref);
      
    ref.on('value',function(data){     
        $scope.accounts = data.val();        
        console.log(data.val());        
    });
      
    var syncObject = sync.$asObject();
      // synchronize the object with a three-way data binding
      // click on `index.html` above to see it used in the DOM!
      syncObject.$bindTo($scope, "data");
      
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
        var formData = $("#form-data").serializeArray();=        
        var abc = {"accounts": formData};
        sync.$set(abc);
        //$location.path("/theme");
    };
      
  });
