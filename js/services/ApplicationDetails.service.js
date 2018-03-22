(function () {
    'use strict';

    angular.module('App').factory('ApplicationDetails', function($resource) {
        return $resource('data/applicationDetails.json');
    });
})();