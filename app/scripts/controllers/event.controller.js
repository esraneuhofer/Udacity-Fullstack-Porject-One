'use strict';

angular.module('udaciMealsApp')
  .controller('EventCtrl', function ($scope,$http) {

    $scope.selectedEvent = null;
    $scope.selectEvent = function (event){
      $scope.selectedEvent =  event;
    };
    $scope.countguest = function(array){
      return array.length
    }

    $scope.testevents = [{
      "eventName":"EventPast One",
      "eventType": "Birthday",
      "eventHost": "Private",
      "eventStartDate":"2016-02-21T20:00:00.000Z",
      "eventEndDate":"2016-02-23T21:00:00.000Z",
      "locality": "New York",
      "streetAdress": "Christopher Street",
      "streetNumber":24,
      "nameLocation":"Hilton Hotel",
      "information": "Bring Cake",
      "guestlist": [
        "Sarah",
        "Melissa",
        "Shanna",
        "Catherine"
      ]
    },
      {
        "eventName":"EventPast Two",
        "eventType": "Conference Talk ",
        "eventHost": "Firm",
        "eventStartDate":"2016-03-21T16:00:00.000Z",
        "eventEndDate":"2016-03-25T18:00:00.000Z",
        "locality": "Las Vegas",
        "streetAdress": "Las Vegas Blvd",
        "streetNumber":"3799 S",
        "nameLocation":"MGM Grand Hotel",
        "information": "Free Drinks",
        "guestlist": [
          "Mr.One",
          "Mr.Two",
          "Mr.Three"
        ]
      },
      {
        "eventName":"Event Future",
        "eventType": "Wedding",
        "eventHost": "People",
        "eventStartDate":"2016-12-21T12:00:00.000Z",
        "eventEndDate":"2016-12-23T22:00:00.000Z",
        "locality": "Hawaii",
        "streetAdress": "Hawaii Street",
        "streetNumber":200,
        "nameLocation":"Some cool Location",
        "information": "Dont forget presents",
        "guestlist": [
          "Family One",
          "Family Two",
          "Family Three",
          "Family Four"
        ]
      }]
    $scope.checkEvent = function(allEvents){
      $scope.upcomingEvent = [];
      $scope.closedEvent = [];

      var today = new Date();
      today.setHours(0,0,0,0);

      angular.forEach(allEvents,function(event,index){

        var end  = new Date(event.eventEndDate);
        end.setHours(0,0,0,0);

        var start = new Date(event.eventStartDate);
        start.setHours(0,0,0,0);


        if(event.eventStartDate && event.eventEndDate){
          if (end.getTime() >= today.getTime()) {

            $scope.upcomingEvent.push(event);
          }
          else{
            $scope.closedEvent.push( event);
          }
        }

        if(event.eventStartDate && !event.eventEndDate) {
          if (start.getTime() >= today.getTime()) {
            $scope.upcomingEvent.push(event);
          }
          else{
            $scope.closedEvent.push(event);
          }
        }

      });
    }
    $scope.checkEvent($scope.testevents)

    //$http({
    //  method:'GET',
    //  url:'../eventsJSON.json',
    //}).success(function (allEvents) {
    //  console.log(allEvents);
    //  $scope.upcomingEvent = [];
    //  $scope.closedEvent = [];
    //
    //  var today = new Date();
    //  today.setHours(0,0,0,0);
    //
    //  angular.forEach(allEvents,function(event,index){
    //
    //    var end  = new Date(event.eventEndDate);
    //    end.setHours(0,0,0,0);
    //
    //    var start = new Date(event.eventStartDate);
    //    start.setHours(0,0,0,0);
    //
    //
    //    if(event.eventStartDate && event.eventEndDate){
    //      if (end.getTime() >= today.getTime()) {
    //
    //        $scope.upcomingEvent.push(event);
    //      }
    //      else{
    //        $scope.closedEvent.push( event);
    //      }
    //    }
    //
    //    if(event.eventStartDate && !event.eventEndDate) {
    //      if (start.getTime() >= today.getTime()) {
    //        $scope.upcomingEvent.push(event);
    //      }
    //      else{
    //        $scope.closedEvent.push(event);
    //      }
    //    }
    //
    //  });
    //
    //
    //}).error(function(e){
    //  console.log(e);
    //});

  });
