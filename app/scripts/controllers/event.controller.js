
angular.module('udaciMealsApp')
  .controller('EventCtrl', function ($scope,$http) {

      $http({
        method:'GET',
        url:'/api/getAllEvents',
      }).success(function (allEvents) {

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


      }).error(function(e){
        console.log(e);
      });



  });
