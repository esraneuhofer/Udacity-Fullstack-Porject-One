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
    $scope.lockButton = true
    $scope.dateValid= false;
    $scope.validateDate = function(startDate,endDate){
      if(startDate > endDate){
        $scope.startDateSmaller = false;
       $scope.dateValid= false;
      }
      else{
        $scope.startDateSmaller = true;
        $scope.dateValid = true;
      }
      var start = new Date(startDate);
      var end = new Date(endDate);

      var hoursStart = start.getHours();
      var minutesStart = start.getMinutes();
      var hoursEnd = end.getHours();
      var minutesEnd = end.getMinutes();

      var startTime = "" + hoursStart + minutesStart;
      var endTime = "" + hoursEnd + minutesEnd;

      var startTimeNumber = parseFloat(startTime);
      var endTimeNumber = parseFloat(endTime);

      if(start.setHours(0,0,0,0) === end.setHours(0,0,0,0)){

        if(startTimeNumber >= endTimeNumber){
          $scope.startDateSmaller = false;
          $scope.dateValid = false;
        }
        else{
          $scope.startDateSmaller = true;
          $scope.dateValid = true;
        }
      }
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

