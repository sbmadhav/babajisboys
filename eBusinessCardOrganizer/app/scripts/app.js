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
	
		$('.category-edit').click(function(){
		$('.category-check').slideToggle();
		});
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
	$scope.isShowCard = maindata.isShowCard;
	
	init();
}])
.factory('maindata',function(){
	var originaldata;
	var activetab='all';
	var iscardshown=false;
	
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
			iscardshown= false;
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
		},
		isShowCard: function(){
			return iscardshown;
		},
		setShowCard: function(flag){
			iscardshown = flag;
		}
	}
})
.controller("tabController",['$scope','maindata','$http',function($scope,maindata,$http){
	$scope.getCards = maindata.getCards;
	$scope.showCard =function(evt,id){
		if( evt )
			evt.preventDefault();
		maindata.setShowCard(true);
		
		
		$http.get('/services/card.json')
			.success(function(data){
				console.log(data);
				$scope.card = data.response; 
			})
			.error(function(){
				console.error("loading problem in card json");
			})
	}
	
	$scope.closeShowCard = function(evt)
	{
		if( evt )
			evt.preventDefault();
		maindata.setShowCard(false);
	}
}])



  
  
  
  
