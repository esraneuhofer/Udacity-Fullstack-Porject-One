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

      }).error(function(){

      });

    }


    $scope.passwordComplete=false;
    $scope.passwordLength = false;
    $scope.passwordNumber = false;
    $scope.passwordSpecialCase = false;
    $scope.passwordUppercase = false;

    var specialCases = ["!", "§", "$", "%", "&", "/", "(", ")", "=", "?", "^"];

    $scope.checkPassword = function (password) {

      if(password == null){
        password="";
      }

      console.log(password.length)



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


        if(  $scope.passwordLength ===true && $scope.passwordNumber === true && $scope.passwordSpecialCase === true && $scope.passwordUppercase === true){
          console.log("one")
        }
      }



  });
