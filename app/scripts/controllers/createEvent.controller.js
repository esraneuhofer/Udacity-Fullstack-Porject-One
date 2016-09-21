
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
    $scope.checkDate = function (startTime,endTime,startdate,enddate) {

      if(!enddate)return;

      if(new Date(startdate)> new Date(enddate)){

        $scope.startDateSmaller = false;
        $scope.lockButton = true
        $scope.startTimeSmaller = true;

      }
      else {

        $scope.startDateSmaller = true;
        $scope.lockButton = false
      }
      if((new Date(startdate)).setHours(0,0,0,0) === (new Date(enddate)).setHours(0,0,0,0)){

        if(new Date(startTime)< new Date(endTime)){

          $scope.startTimeSmaller = true;
          $scope.lockButton = false;

        }
        else{
          $scope.startTimeSmaller = false;
          $scope.lockButton = true;
        }
      }

    }

    //Check if startDate = endDate -> if start Time is greater then end time
    $scope.startTimeSmaller = true;
    $scope.checkTime = function(startTime,endTime,startdate,enddate){
      if(!endTime || !enddate) return;

      if((new Date(startdate)).setHours(0,0,0,0) === (new Date(enddate)).setHours(0,0,0,0)){

        if(new Date(startTime)< new Date(endTime)){
          $scope.startTimeSmaller = true;
          $scope.lockButton = false;

        }
        else{
          $scope.startTimeSmaller = false;
          $scope.lockButton = true;
        }
      }

    }


    //*Datepicker*//

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['MM-dd-yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    }

    //* Timepicker*//

    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.ismeridian = false;



  });

