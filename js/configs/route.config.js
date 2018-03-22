(function () {
    'use strict';

    angular
        .module('App')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    /*route provider*/
    function config($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /state1, 'controllers'
        $urlRouterProvider.otherwise("/dashboard");

        /*states*/
        $stateProvider
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "partials/Dashboard.html",
                controller: "DashboardController"
            })
            .state("applications", {
                url: "/applications",
                templateUrl: "partials/Applications.html",
                controller: "ApplicationController"
            })
            .state("applicationDetails", {
                url: "/applicationDetails",
                templateUrl: "partials/ApplicationDetails.html",
                controller: "ApplicationDetailsController"
            })
            .state("environment", {
                url: "/environment",
                templateUrl: "partials/Environment.html",
                controller: "EnvironmentController"
            });
    }

})();