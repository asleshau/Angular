(function () {
    'use strict';

    angular
        .module('App')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http', '$scope', '$state', '$window', 'Dashboard', 'Utilities'];

    function DashboardController($http, $scope, $state, $window, Dashboard, Utilities) {
        var that = $scope;

        that.$state = $state;

        Dashboard.getHeaderInfo()
            .then(function(data) {
                $scope.header = data;
            })
            .catch(function(error) {
                console.log(error);
            });

        Dashboard.getDashboard()
            .then(function(data) {
                $scope.apps = data[0].apps;
                $scope.servers = data[0].servers;
                $scope.activities = data[0].activities;
            })
            .catch(function(error) {
                console.log(error);
            });

        that.relativeTime = function(datetime) {
            return Utilities.relativeTime(datetime);
        }; 
        
        //activitySearch
        $scope.activitySearch = "";
        $scope.popup = '';
        var w = angular.element($window);

        that.showSideBarFilter = false;
        //sidebar filter
        $scope.sidebarFilter = {
            "activityType": "",
            "actionTypes": {
                "diskSize": true,
                "patch": true,
                "downSize": true,
                "upgrade": true
            }
        };

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

        //showAutomationPopup
        $scope.showAutomationPopup = function (appName) {
            console.log("dashboard Controller")
            $scope.$parent.Name = appName;
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

        //toggleModule
        $scope.toggleModule = function (module, parent, grandParent) {
            module.checked = !module.checked;

            angular.forEach(module.subModule, function (item) {
                item.checked = module.checked;
                if (item.subModule) {
                    angular.forEach(item.subModule, function (item) {
                        item.checked = module.checked;
                    });
                }
            });
            if (parent) {
                var uncheckedLength = 0;
                parent.checked = true;
                angular.forEach(parent.subModule, function (item) {
                    if (!item.checked) {
                        parent.checked = false;
                    }
                });

            }
            if (grandParent) {
                var uncheckedLength = 0;
                grandParent.checked = true;
                angular.forEach(grandParent.subModule, function (item) {
                    if (!item.checked) {
                        grandParent.checked = false;
                    }
                });
            }
        };

        //isShowModule
        $scope.isShowModule = function (name) {
            var visible = true;

            angular.forEach($scope.dashboardModules, function (item) {
                if (item.name === name && !item.checked) {
                    visible = false;
                }
                angular.forEach(item.subModule, function (item) {
                    if (item.name === name && !item.checked) {
                        visible = false;
                    }
                    angular.forEach(item.subModule, function (item) {
                        if (item.name === name && !item.checked) {
                            visible = false;
                        }
                    });
                });
            });

            return visible;
        };
    }

})();