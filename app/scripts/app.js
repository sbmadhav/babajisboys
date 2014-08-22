'use strict';

/**
 * @ngdoc overview
 * @name ebusninessCardApp
 * @description
 * # ebusninessCardApp
 *
 * Main module of the application.
 */
angular
  .module('hacksterApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })      
      .when('/theme', {
        templateUrl: 'views/theme.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });