(function () {
    'use strict';

    angular.module('App').factory('ScheduledData', function ($resource) {
        return $resource('data/scheduledData.json');
    });
})();