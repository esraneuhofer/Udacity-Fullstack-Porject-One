'use strict';

angular.module('udaciMealsApp')
  .controller('CreateEventCtrl', function ($scope,$http,$parse) {

    $scope.eventModel = {};

    //Add Event
    $scope.addEvent = function(model){
      $http({
        method:'POST',
        url:'/api/addNewEvent',
        data:model
      }).
      success(function(data){
        $state.reload();


      }).error(function(){
        alert('Something went wrong...please contact support')

      });

    }

    //Check if starting Date greater then ending Date
    $scope.startDateSmaller = true;
    $scope.lockButton = true;
    $scope.dateValid= false;
    $scope.minDate  = true;
    $scope.lockEndDate = true;
    $scope.startDateInvalid = true;

    $scope.validateDate = function(startDate,endDate){
      var today = new Date();

      //console.log($scope.startDateSmaller+"1")
        if(Date.parse(today)>Date.parse(startDate) ||!$scope.eventForm.eventStartDate.$valid ){
          //$scope.minDate  =false;
          $scope.lockEndDate = true;
        }
        else{
          //$scope.minDate  = true;
          $scope.lockEndDate = false;

        }
      console.log("start"+Date.parse(startDate))
      console.log("end"+Date.parse(endDate))
      console.log("compare"+Date.parse(startDate)<Date.parse(endDate))
        if(Date.parse(startDate) < Date.parse(endDate)){

          $scope.startDateSmaller = true;
          $scope.dateValid= true;
          $scope.inValidMinDate = true;
          console.log($scope.startDateSmaller+"2")


        }
        if(Date.parse(startDate) === Date.parse(endDate)){
          $scope.startDateSmaller = false;
          $scope.inValidMinDate = false;
          console.log($scope.startDateSmaller+"3")



          $scope.dateValid= false;
        }
        if(Date.parse(startDate) > Date.parse(endDate)){
          $scope.startDateSmaller = false;
          $scope.dateValid= false;
          $scope.inValidMinDate = false;
          console.log($scope.startDateSmaller+"4")





        }
      //console.log($scope.startDateSmaller+"5")

    }
    $scope.minDateMessage = function(startDate){
      var todayStart = new Date();
      console.log(Date.parse(todayStart)>Date.parse(startDate));
      if(Date.parse(todayStart)>Date.parse(startDate)){
        $scope.minDate  = false;
      }
      else{
        $scope.minDate  = true;
      }
    }
    $scope.minDateSet = new Date();
    //$scope.minDateEnd = "";
    $scope.setminDateEnd  = function (startDate) {
      var newDateObj = new Date(startDate.getTime() + 1*60000);
      $scope.minDateEnd = newDateObj;
    }

    $scope.isValid = function(){

      if($scope.eventForm.$valid && $scope.dateValid === true){
        $scope.lockButton = false
      }
      else{
        $scope.lockButton = true

      }
    }

  });

