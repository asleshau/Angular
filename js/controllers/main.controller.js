(function () {
    'use strict';

    angular
        .module('App')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state', '$rootScope', 'LeftMenu', 'AutomationData', '$filter'];

    function MainController($scope, $state, $rootScope, LeftMenu, AutomationData, $filter) {

        $scope.$state = $state;
        $scope.user = {
            "name": "Jack Harper",
            "img": "i/user.jpg"
        };

        $scope.selectedTime = [];
        $scope.isAddNewSchedule = false;


        $scope.automationScheduleSelectDate = [];

        //date
        $scope.calendar = {
            dt: new Date()
        };

        //get left menu
        LeftMenu.query(function (data) {
            $scope.leftMenu = data;
        });

        //get automationData
        AutomationData.query(function (data) {
            $scope.automationData = data[0];
            $scope.setSelectedSchedule();
        });

        //remove item
        $scope.remove = function (array, index) {
            array.splice(index, 1);
        };

        //get Date from String
        $scope.getDate = function (date) {
            return new Date(date);
        };

        //getDayClass
        $scope.getDayClass = function (date, mode) {
            var calDate = date.setHours(0, 0, 0, 0);
            var today = new Date().setHours(0, 0, 0, 0);
            var now = new Date();

            if (!$scope.automationData) {
                return false;
            }
            for (var i = 0; i < $scope.automationData.schedules.length; i++) {
                var schedulesDate = new Date($scope.automationData.schedules[i].ACT_TIME).setHours(0, 0, 0, 0);
                if (schedulesDate === calDate) {

                    if (schedulesDate < today) {
                        return 'before';
                    } else if (schedulesDate === today) {
                        var futureEvents = false;
                        angular.forEach($scope.automationData.schedules[i].ACT_TIME, function (item) {
                            if (new Date(item.time) > now) {
                                futureEvents = true;
                            }
                        });
                        return futureEvents ? 'after' : 'before';
                    } else {
                        return 'after';
                    }
                }
            }
            if (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6)) {
                return 'weekend';
            }
            return '';
        };


        //getPopupTop
        $scope.getPopupTop = function () {
            var height = document.getElementById('automation-schedule').offsetHeight;
            var windowHeight = window.innerHeight;

            if (height < windowHeight - 10) {
                return { 'margin-top': (windowHeight - height) / 2 + 'px' };
            } else {
                return { 'top': '10px' };
            }
        };

        //getDayClass
        $scope.getScheduleDayClass = function (date) {
            var today = new Date().setHours(0, 0, 0, 0);
            var scheduleDay = new Date($scope.automationScheduleSelectDate.date).setHours(0, 0, 0, 0);
            if (scheduleDay < today) {
                return 'before';
            } else if (scheduleDay > today) {
                return 'after';
            } else {
                return 'today';
            }
        };

        //getTimeClass
        $scope.getScheduleTimeClass = function (time) {
            var today = new Date();
            if (new Date(time) < today) {
                return 'before';
            } else {
                return 'after';
            }
        };


        //watch schedule date change
        $scope.$watch('calendar.dt', function () {
            $scope.setSelectedSchedule();
        });

        //---set selectedDate
        $scope.setSelectedSchedule = function () {
            var selectedDate = $scope.calendar.dt.setHours(0, 0, 0, 0);
            if (!$scope.automationData) {
                return false;
            }
            $scope.automationScheduleSelectDate = [];
            for (var i = 0; i < $scope.automationData.schedules.length; i++) {
                var schedulesDate = new Date($scope.automationData.schedules[i].ACT_TIME).setHours(0, 0, 0, 0);
                if (schedulesDate === selectedDate) {
                    console.log("pushing")
                    $scope.automationScheduleSelectDate.push($scope.automationData.schedules[i]);
                }
            }
            $scope.selectedTime.showInfo = false;
            $scope.selectedTime = [];
        };

        //showScheduleInfo
        $scope.showScheduleInfo = function (time) {
            //$scope.selectedTime.showInfo = false;
            $scope.selectedTime = time;
            $scope.selectedTime.showInfo = true;
            if(time.MAIL_NOTIFY) {
                $scope.sendNotifications = true;
            }else{
                $scope.sendNotifications = false;
            }
            $scope.isAddNewSchedule = false;
        };

        //addNewSchedule
        $scope.addNewSchedule = function () {
            //alert("======"+$scope.selectedTime);
            $scope.newScheduled = {
                "name": "Acme App",
                "actionItem": "Select Action Item",
                "actionItems": [
                    "Start",
                    "Stop",
                    "Restart",
                    "Downtime",
                    "Patch",
                    "Disk Size",
                    "Downsize Opt Out",
                    "Upgrade Opt Out"
                ],
                "recurring": false,
                "repeat": "Weekly",
                "repeatList": ["Daily", "Weekly", "Monthly", "Custom"],
                "sequence": "Weekly",
                "sequenceList": ["Daily", "Weekly", "Monthly", "Custom"],
                "time": ["Monday"],
                "timeList": [{ "val": "Sunday", "select": false }, { "val": "Monday", "select": true }, {
                    "val": "Tuesday",
                    "select": false
                }, { "val": "Wednesday", "select": false }, { "val": "Thursday", "select": false }, {
                    "val": "Friday",
                    "select": false
                }, { "val": "saturday", "select": false }],
                "stdt": '',
                "sttm": '',
                "endt": '',
                "entm": '',
                "sqtm": ''
            };
            $scope.selectedTime.showInfo = false;
            $scope.selectedTime = [];
            $scope.isAddNewSchedule = true;
        };

        $scope.editSchedule = function () {
            //alert("======"+$scope.selectedTime);
            $scope.newScheduled = {
                "name": "Acme App",
                "actionItem": "Select Action Item",
                "actionItems": [
                    "Start",
                    "Stop",
                    "Restart",
                    "Downtime",
                    "Patch",
                    "Disk Size",
                    "Downsize Opt Out",
                    "Upgrade Opt Out"
                ],
                "recurring": false,
                "repeat": "Weekly",
                "repeatList": ["Daily", "Weekly", "Monthly", "Custom"],
                "sequence": "Weekly",
                "sequenceList": ["Daily", "Weekly", "Monthly", "Custom"],
                "time": ["Monday"],
                "timeList": [{ "val": "Sunday", "select": false }, { "val": "Monday", "select": true }, {
                    "val": "Tuesday",
                    "select": false
                }, { "val": "Wednesday", "select": false }, { "val": "Thursday", "select": false }, {
                    "val": "Friday",
                    "select": false
                }, { "val": "saturday", "select": false }],
                "stdt": $scope.getDate($scope.automationScheduleSelectDate.date),
                "sttm": new Date($filter('date')($scope.selectedTime,'HH:mm a')),
                "endt": '',
                "entm": '',
                "sqtm": ''
            };
            //console.log("-----"+new Date($filter('date')($scope.selectedTime,'HH:mm a')))
            //console.log("-----"+$scope.selectedTime.getMinutes())
            $scope.selectedTime.showInfo = false;
            $scope.isAddNewSchedule = true;
        };

        //deleteSchedule
        $scope.deleteSchedule = function () {
            $scope.selectedTime.showInfo = false;
            var index = $scope.automationScheduleSelectDate.timeScheduled.indexOf($scope.selectedTime);
            $scope.automationScheduleSelectDate.timeScheduled.splice(index, 1);
            $scope.selectedTime = [];
            $scope.isAddNewSchedule = false;
        };

        //saveSchedule
        $scope.saveSchedule = function () {
            alert($scope.newScheduled.actionItem +"---"+$scope.newScheduled.stdt+"==="+$scope.newScheduled.sttm+"---"+$scope.newScheduled.endt+"==="+$scope.newScheduled.entm);
            var index = $scope.automationScheduleSelectDate.timeScheduled.indexOf($scope.selectedTime);
            $scope.automationScheduleSelectDate.timeScheduled[index].time = $scope.newScheduled.sttm;
            $scope.automationScheduleSelectDate.timeScheduled[index].note="<a href='javascript:'>"+$scope.newScheduled.actionItem+"</a>"
            $scope.isAddNewSchedule = false;
        };

        //setTimes
        $scope.setTimes = function (choice) {
            choice.select = !choice.select;
            $scope.newScheduled.time = [];
            angular.forEach($scope.newScheduled.timeList, function (elm) {
                if (elm.select) {
                    $scope.newScheduled.time.push(elm.val);
                }
            });
        };
    }

})();