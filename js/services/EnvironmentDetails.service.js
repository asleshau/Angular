(function () {
    'use strict';

    angular.module('App').factory('EnvironmentDetails', function ($resource) {
        return $resource('data/environmentDetails.json');
    });

})();