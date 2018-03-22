(function () {
    'use strict';

    angular.module('App').factory('AutomationData', function ($resource) {
        return $resource('data/json.json');
    });
})();