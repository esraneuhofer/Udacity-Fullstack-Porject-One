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
      //if($scope.eventForm.eventStartDate.$pristine){
      //
      //}
      //else{

        if(Date.parse(today)>Date.parse(startDate) ||!$scope.eventForm.eventStartDate.$valid ){
          //$scope.minDate  =false;
          $scope.lockEndDate = true;
        }
        else{
          //$scope.minDate  = true;
          $scope.lockEndDate = false;

        }
        if(Date.parse(startDate) < Date.parse(endDate)){
          $scope.startDateSmaller = true;
          $scope.dateValid= true;
        }
        if(Date.parse(startDate) === Date.parse(endDate)){
          $scope.startDateSmaller = false;
          $scope.dateValid= false;
        }
        if(Date.parse(startDate) > Date.parse(endDate)){
          $scope.startDateSmaller = false;
          $scope.dateValid= false;
        }
      //}

      //if(startDate > endDate){
      //  console.log("greater");
      //  $scope.startDateSmaller = false;
      // $scope.dateValid= false;
      //}
      //else{
      //  $scope.startDateSmaller = true;
      //  $scope.dateValid = true;
      //}
      //var start = new Date(startDate);
      //var end = new Date(endDate);
      //
      //var hoursStart = start.getHours();
      //var minutesStart = start.getMinutes();
      //var hoursEnd = end.getHours();
      //var minutesEnd = end.getMinutes();
      //
      //var startTime = "" + hoursStart + minutesStart;
      //var endTime = "" + hoursEnd + minutesEnd;
      //
      //var startTimeNumber = parseFloat(startTime);
      //var endTimeNumber = parseFloat(endTime);
      //
      //if(start.setHours(0,0,0,0) === end.setHours(0,0,0,0)){
      //
      //  if(startTimeNumber >= endTimeNumber){
      //    $scope.startDateSmaller = false;
      //    $scope.dateValid = false;
      //  }
      //  else{
      //    $scope.startDateSmaller = true;
      //    $scope.dateValid = true;
      //  }
      //}
    }
    $scope.minDateMessage = function(startDate){
      var todayStart = new Date();

      if(Date.parse(todayStart)>Date.parse(startDate)){
        $scope.minDate  = false;
      }
      else{
        $scope.minDate  = true;
      }
    //if(!$scope.eventForm.eventStartDate.$valid){
    //  $scope.startDateInvalid = false
    //
    //}
    //else{
    //  $scope.startDateInvalid = true;
    //
    //}
    }
    $scope.minDate = new Date();
    $scope.isValid = function(){

      if($scope.eventForm.$valid && $scope.dateValid === true){
        $scope.lockButton = false
      }
      else{
        $scope.lockButton = true

      }
    }

  });

