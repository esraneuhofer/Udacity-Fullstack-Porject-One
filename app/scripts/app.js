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
    'jcs-autoValidate',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'ngTouch',
    'ngMessages'
  ])
.run(function(defaultErrorMessageResolver){
  defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){
    errorMessages['wrongPassword']="Please enter a Password with a minimum 8 characters at least 1 Uppercase Alphabet, 1 Number and a special case letter ";

  });
})
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





    //.config(function ($routeProvider) {
    //$routeProvider
    //  .when('/', {
    //    templateUrl: 'views/main.html',
    //    controller: 'MainCtrl',
    //    controllerAs: 'main'
    //  })
    //  .when('/createAccount', {
    //    templateUrl: 'views/createAccount.html',
    //    controller: 'createAccountCtrl',
    //    controllerAs: 'createAccount'
    //  })
    //  .otherwise({
    //    redirectTo: '/'
    //  });

  });
