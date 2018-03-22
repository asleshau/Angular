(function () {
    'use strict';

    angular.module('App').factory('Dashboard', function($http, $q, $rootScope) {
        var baseUrl = 'data/';

        var getHeaderInfo = function () {
            var deferred = $q.defer();
            $http.get(baseUrl + 'headerInfo.json')
                .then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.resolve(response.status);
                });

            return deferred.promise;
        };

        var getDashboard = function () {
            var deferred = $q.defer();
            $http.get(baseUrl + 'dashboard.json')
                .then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.resolve(response.status);
                });

            return deferred.promise;
        };
        return {getHeaderInfo: getHeaderInfo, getDashboard: getDashboard};
    });

})();