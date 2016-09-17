'use strict';
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
        $state.reload();

      }).error(function(){

      });

    }


    $scope.progressSpecial=0;
    $scope.progressLength=0;
    $scope.progressSpecial = 0;
    $scope.progressUpper = 0;
    $scope.progressTotal = 0;


    $scope.unlockRegButton = true;
    $scope.passwordLength = false;
    $scope.passwordNumber = false;
    $scope.passwordSpecialCase = false;
    $scope.passwordUppercase = false;

    var specialCases = ["!", "§", "$", "%", "&", "/", "(", ")", "=", "?", "^"];

    $scope.checkValidation = function () {

      if($scope.registerForm.$valid && $scope.passwordComplete===true){
        $scope.unlockRegButton = false
      }
      else{
        $scope.unlockRegButton = true;
      }
    }

    $scope.showPasswordCriteria=true;
    $scope.progress = function(progress) {
      $scope.passwordStrength ="";
      var value = progress;
      var type;
      if(value === 0){
        type = 'default';
        $scope.passwordStrength ="...";
      }
      if (value >0 && value <= 25) {
        type = 'danger';
        $scope.passwordStrength ="To weak";
      } else if (value >0 && value <= 50) {
        $scope.passwordStrength ="Getting better";
        type = 'warning';
      } else if (value >0 && value <= 75) {
        $scope.passwordStrength ="Almost... ";
        type = 'info';
      } else if(value >0) {
        $scope.passwordStrength ="Very Strong";
        type = 'success';
      }



      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.checkPassword = function (password) {
      $scope.showPasswordCriteria=false;

        if(password == null){
          password="";
        }
        //* Check for Special Cases*//
        $scope.keepGoing = true;
        for (var i =0;i<=password.length ;i++) {
          angular.forEach(specialCases, function (eachCase, index) {
            if ($scope.keepGoing) {
              if (eachCase === password.charAt(i)) {

                $scope.passwordSpecialCase = true;
                $scope.keepGoing = false;
              }
              else {
                $scope.passwordSpecialCase = false;

              }
            }
          })
        }

        //* Check if number*/
        for (var i =0;i<=password.length ;i++){

          if(!isNaN(parseFloat(password.charAt(i))) && isFinite(password.charAt(i))){
            $scope.passwordNumber = true
            break;
          }
          else{
            $scope.passwordNumber = false

          }
        }

        //* Check length*//
        if (password.length <=12 ){
          $scope.passwordLength = false;
        }
        if(password.length >12 ){
          $scope.passwordLength = true;
        }

        //*Check if Upper Case*//
        for (var i =0;i<=password.length ;i++) {
          if (password.charAt(i) == password.charAt(i).toLowerCase()) {
            $scope.passwordUppercase = false;
          }
          else {
            $scope.passwordUppercase = true;
            break;
          }

        }

        //*Check if all requierments are fullfilled*//
        if(  $scope.passwordLength ===true && $scope.passwordNumber === true && $scope.passwordSpecialCase === true && $scope.passwordUppercase === true){
          $scope.passwordComplete=true;
        }
        else{
            $scope.passwordComplete=false;
          }

        //* Value for Progressbar*//
        if($scope.passwordLength ===true ){
          $scope.progressLength = 25
        }
        else{
          $scope.progressLength = 0;
        }
        if($scope.passwordNumber === true ){
          $scope.progressNumber = 25

        }
        else{
          $scope.progressNumber = 0

        }
        if($scope.passwordSpecialCase === true ){
          $scope.progressSpecial = 25

        }
        else{
          $scope.progressSpecial = 0

        }
        if($scope.passwordUppercase === true){
           $scope.progressUpper = 25;
        }
        else{
          $scope.progressUpper = 0;

        }

        $scope.progressTotal = $scope.progressLength+$scope.progressNumber+$scope.progressSpecial+$scope.progressUpper;

        $scope.checkValidation();
        $scope.progress($scope.progressTotal);
    }





  });
