'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('CreateAccountCtrl', function ($scope) {
    $scope.registerForm={};
    $scope.inputType = 'password';
    $scope.hideShowPassword = function(){
      if ($scope.inputType == 'password')
        $scope.inputType = 'text';
      else
        $scope.inputType = 'password';
    };
    $scope.addUser = function(userForm){
      $http({
        method:'POST',
        url:'/api/createAccount',
        data:userForm
      }).
      success(function(data){

      }).error(function(){

      });

    }


  });
