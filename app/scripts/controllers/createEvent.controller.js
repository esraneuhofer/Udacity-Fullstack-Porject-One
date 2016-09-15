
angular.module('udaciMealsApp')
  .controller('CreateEventCtrl', function ($scope,$http) {
    $scope.eventForm = {};
    $scope.addUser = function(userForm){
      $http({
        method:'POST',
        url:'/api/addNewEvent',
        data:userForm
      }).
      success(function(data){
        $state.reload();


      }).error(function(){
        alert('Something went wrong...please contact support')

      });

    }

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

    $scope.checkIfTouched = function (input,nameOf) {
      if(input === true){
        $scope.isTouched = false;
      }
      else{
        $scope.isTouched = true;

      }
    }
    $scope.checkIfToucheds = function(input){
      console.log(input)
    }


    //*Datepicker*//

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

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

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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

    //$scope.options = {
    //  hstep: [1, 2, 3],
    //  mstep: [1, 5, 10, 15, 25, 30]
    //};

    //$scope.toggleMode = function() {
    //  $scope.ismeridian = ! $scope.ismeridian;
    //};

    //$scope.update = function() {
    //  var d = new Date();
    //  d.setHours( 14 );
    //  d.setMinutes( 0 );
    //  $scope.mytime = d;
    //};
    //
    //
    //$scope.clear = function() {
    //  $scope.mytime = null;
    //};

  });
