'use strict';

/**
 * @ngdoc overview
 * @name ebusninessCardApp
 * @description
 * # ebusninessCardApp
 *
 * Main module of the application.
 */
 


var a = angular
  .module('ebusninessCardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);
  


a.controller("initModule",['$scope','$http','maindata',function($scope,$http,maindata){
	
	function init(){
		$scope.loading=true;
		var postdata='';

		$http.get('/services/response.json')
		.success(function(data){
			
			$scope.loading=false;
			maindata.setData(data);
			
			
		})
		.error(function(){
			console.error("please contact system admin");
			$scope.loading=false;
		});
		
		$scope.getCategories = maindata.getCategories;
	
	}
	$scope.setActivetab =maindata.setActivetab;
	$scope.getAllData = maindata.getAllData;
	
	init();
}])
.factory('maindata',function(){
	var originaldata;
	var activetab='all';
	
	function getCardsIds (){
			if(originaldata && originaldata.response && originaldata.response.categories)
			{
				var categories=originaldata.response.categories
				for(var i=0;i<categories.length;i++)
				{
					
					if(categories[i].category === activetab)
						return categories[i].list;
				}
			}
		}
	
	return{
		setData:function(data){
			originaldata=data;
			
			var count=0;
			angular.forEach(originaldata.response.data, function(value, key) {
			  count=count+1;
			 });
			 originaldata.response.data.count=count;
		},
		getCategories : function(){
			if(originaldata)
			{
				if(originaldata.response && originaldata.response.categories){
					return originaldata.response.categories;
				}
			}
		},
		setActivetab: function(tabname){
			activetab = tabname;
		},
		getActivetab : function(){
			
			return activetab;
		},
		getCards :function(){
			var cards=[];
			var list = getCardsIds();
			if( list ){
				for( var i=0;i<list.length;i++)
				{
					cards.push(originaldata.response.data[list[i]]);
				}
			}
			return cards;
		},
		getAllData: function(){

			if(originaldata && originaldata.response && originaldata.response.data)
				return originaldata.response.data
		}
	}
})
.controller("tabController",['$scope','maindata',function($scope,maindata){
	$scope.getCards = maindata.getCards;
}])



  
  
  
  
