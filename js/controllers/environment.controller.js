(function () {
    'use strict';

    angular
        .module('App')
        .controller('EnvironmentController', EnvironmentController);

    EnvironmentController.$inject = ['$scope', '$window', 'EnvironmentDetails', 'AutomationData', 'ScheduledData', 'NgTableParams'];

    function EnvironmentController($scope, $window, EnvironmentDetails, AutomationData, ScheduledData, NgTableParams) {

        //activitySearch
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

        $scope.sortOption = 'Name, descending';
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

        $scope.pager = {
            option: [5, 10, 15, 50, 'All'],
            count: 10
        };
        //get Dashboard
        EnvironmentDetails.query(function (data) {
            $scope.environmentDetails = data[0];

            $scope.tableParams = new NgTableParams({
                page: 1, // show first page
                count: 10 // count per page
            }, {
                filterDelay: 0,
                data: $scope.environmentDetails.servers
            });
        });

        //get scheduledData
        ScheduledData.query(function (data) {
            $scope.scheduledData = data[0];
        });

        //showAutomationPopup
        $scope.showAutomationPopup = function (instanceId) {
            console.log("Environment Controller");
            var appNames =[];
            for(var i =0 ;i<instanceId.length;i++){
                for(var j = 0 ;j< $scope.automationData.schedules.length; j++) {
                    if($scope.automationData.schedules[j].inst_id === instanceId[i]){
                        appNames.push($scope.automationData.schedules[j].inst_name);
                    }
                }
            }
            var uniqueAppNames = [];
            $.each(appNames, function(i, el){
                if($.inArray(el, uniqueAppNames) === -1) uniqueAppNames.push(el);
            });
            console.log("-------------->"+uniqueAppNames)
            $scope.$parent.name = uniqueAppNames.toString();
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



        //checkAllToggle
        $scope.checkAllToggle = function (toggle) {
            toggle.checkAll = !toggle.checkAll;
            angular.forEach($scope.environmentDetails.servers, function (elem) {
                elem.checked = toggle.checkAll;
            });
        };

        //checkRow
        $scope.checkRow = function (server) {
            server.checked = !server.checked;

            var unCheckCount = 0;
            angular.forEach($scope.environmentDetails.servers, function (elem) {
                if (!elem.checked) {
                    unCheckCount++;
                }
            });

            $scope.environmentDetails.checkAll = unCheckCount <= 0;
        };
    }

})();