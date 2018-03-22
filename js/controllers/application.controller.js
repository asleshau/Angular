(function () {
    'use strict';

    angular
        .module('App')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['$scope', '$window', 'Applications', 'AutomationData', 'ScheduledData'];

    function ApplicationController($scope, $window, Applications, AutomationData, ScheduledData) {

        $scope.popup = '';
        $scope.sortOptions = {
            "option": [
                "Name, Ascending",
                "Name, descending",
                "Status, Ascending",
                "Status, Descending",
                "Schedule, Latest",
                "Schedule, First",
                "DIsk Size, Ascending",
                "DIsk Size, Descending",
                "Users, Ascending",
                "Users, Descending"
            ],
            sortOption: 'Name, descending'
        };
        $scope.periodOptions = {
            "options": [
                "Today",
                "This Week",
                "Current Month",
                "This Year",
                "Year to Date",
                "Lorem Ipsum"
            ],
            selectedOption: 'Current Month'
        };


        var w = angular.element($window);

        $scope.view = 'grid';

        //automation filter
        $scope.automationFilter = {
            "activityType": "all",
            "levels": {
                "all": true,
                "application": true,
                "environment": true,
                "server": true
            },
            "actionTypes": {
                "diskSize": true,
                "patch": true,
                "downSize": true,
                "upgrade": true
            }
        };

        $scope.EnvironmentPopover = {

            open: function open(app) {
                if ($scope.popover) {
                    $scope.popover.isOpen = false;
                    $scope.popover.isServerOpen = false;
                    $scope.popover.isActivityOpen = false;
                }
                $scope.popover = app;
                $scope.popover.isOpen = true;
            },

            close: function close() {
                $scope.popover.isOpen = false;
            }
        };
        $scope.ServerPopover = {

            open: function open(app) {
                if ($scope.popover) {
                    $scope.popover.isOpen = false;
                    $scope.popover.isServerOpen = false;
                    $scope.popover.isActivityOpen = false;
                }
                $scope.popover = app;
                $scope.popover.isServerOpen = true;
            },

            close: function close() {
                $scope.popover.isServerOpen = false;
            }
        };
        $scope.ActivityPopover = {

            open: function open(app) {
                if ($scope.popover) {
                    $scope.popover.isOpen = false;
                    $scope.popover.isServerOpen = false;
                    $scope.popover.isActivityOpen = false;
                }
                $scope.popover = app;
                $scope.popover.isActivityOpen = true;
            },

            close: function close() {
                $scope.popover.isActivityOpen = false;
            }
        };

        //load application data
        Applications.query(function (data) {
            $scope.applicationData = data[0];
        });

        //get scheduledData
        ScheduledData.query(function (data) {
            $scope.scheduledData = data[0];
        });

        //showAutomationPopup
        $scope.showAutomationPopup = function (instanceId) {
            console.log("Application Controller")

            $scope.$parent.name=appNames;
            $scope.popup = 'automationPopup.html';
            $scope.$parent.isAddNewSchedule = false;
            $scope.$parent.selectedTime.showInfo = false;
        };

        //hidePopup
        $scope.hidePopup = function () {
            $scope.popup = '';
        };


        w.bind('resize', function () {
            $scope.$apply();
        });
    }

})();