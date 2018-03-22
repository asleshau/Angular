(function () {
    'use strict';

    angular.module('App').factory('Applications', function ($resource) {
        return $resource('data/applications.json');
    });
})();