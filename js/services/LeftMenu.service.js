(function () {
    'use strict';

    angular.module('App').factory('LeftMenu', function ($resource) {
        return $resource('data/LeftMenu.json');
    });
})();