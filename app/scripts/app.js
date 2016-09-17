'use strict';

/**
 * @ngdoc overview
 * @name udaciMealsApp
 * @description
 * # udaciMealsApp
 *
 * Main module of the application.
 */
angular
  .module('udaciMealsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngTouch',
    'ngMessages',
    'ngMaterial'
  ])
  .config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('/',{
      url:'/',
      templateUrl:'views/main.html',
      controller:'MainCtrl',
    }).state('events', {
      url: '/events',
      templateUrl: 'views/events.html',
      controller: 'EventCtrl',
    }).state('createEvent', {
      url: '/createEvent',
      templateUrl: 'views/createEvent.html',
      controller: 'CreateEventCtrl',
    }).state('createAccount', {
      url: '/createAccount',
      templateUrl: 'views/createAccount.html',
      controller: 'CreateAccountCtrl',
    });

  });
