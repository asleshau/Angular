(function () {
    'use strict';

    angular
        .module('App')
        .config(config);

    config.$inject = ['$compileProvider'];

    /*set Sanitization compile values*/
    function config($compileProvider) {

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|tel):/);
    }

})();