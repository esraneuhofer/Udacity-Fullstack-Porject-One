
angular.module('udaciMealsApp')
  .controller('CreateEventCtrl', function ($scope,$http,$parse) {
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

  });

//<div class="form-group">
//  <label for="eventType" class="control-label">Type*</label>
//  <input type="text"
//name="eventType"
//ng-blur="checkIfTouched(eventForms.eventName.$pristine,eventForm.eventType, 'typeTouched')"
//ng-keydown="checkIfTouched(eventForms.eventName.$pristine,eventForm.eventType,'typeTouched')"
//ng-model="eventForm.eventType"
//class="form-control"
//required
//placeholder="What Type of Event is it?"
//id="eventType">
//  <span ng-show="typeTouched" style="color: red;" class="help-inline">This field is required</span>
//
//</div>
//$scope.checkIfTouched = function (input,ngModel,nameOfInput) {
//  var newScope = nameOfInput;
//  var model = $parse(newScope );
//  if(input == null){
//    input="";
//  }
//  if(ngModel == null){
//    ngModel="";
//  }
//  if(ngModel.length>0){
//    return  model.assign($scope, false);
//
//  }
//  else{
//    if(input === true){
//      return  model.assign($scope, true);
//    }
//    else{
//      return model.assign($scope, false);
//    }
//  }
//
//
//}
