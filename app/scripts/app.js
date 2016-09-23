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
  .directive('autofocus', function($timeout) {
    return {
      link: function(scope, element, attrs) {
        $timeout(function() {
          element.focus();
        });
      }
    }
  })
  .config(function($stateProvider){
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
    }).state('createAccount.info', {
      url: '/createAccount-info',
      templateUrl: 'views/createAccountInfo.html',
    }).state('createAccount.personal', {
      url: '/createAccount-personal',
      templateUrl: 'views/createAccountPersonal.html',
    });


  });
