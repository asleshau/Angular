(function () {
    'use strict';

    angular
        .module('App')
        .controller('ApplicationDetailsController', ApplicationDetailsController)
    ApplicationDetailsController.$inject = ['$scope', '$window', 'ApplicationDetails', 'AutomationData', 'ScheduledData'];

    function ApplicationDetailsController($scope, $window, ApplicationDetails, AutomationData, ScheduledData) {

        //activitySearch
        $scope.activitySearch = "";
        $scope.popup = '';
        var w = angular.element($window);

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

        $scope.view = 'grid';

        //get Dashboard
        ApplicationDetails.query(function (data) {
            $scope.applicationDetails = data[0];
        });

        //get scheduledData
        ScheduledData.query(function (data) {
            $scope.scheduledData = data[0];
        });

        //showAutomationPopup
        $scope.showAutomationPopup = function () {
            $scope.popup = 'automationPopup.html';
            $scope.$parent.isAddNewSchedule = false;
            $scope.$parent.selectedTime.showInfo = false;
        };


        //hidePopup
        $scope.hidePopup = function () {
            $scope.popup = '';
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

        w.bind('resize', function () {
                $scope.$apply();
        });
    }

})();