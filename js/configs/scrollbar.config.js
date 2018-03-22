(function () {
    'use strict';

    angular
        .module('App')
        .config(config);

    config.$inject = ['ScrollBarsProvider'];

    function config(ScrollBarsProvider) {

        // the following settings are defined for all scrollbars unless the
        // scrollbar has local scope configuration
        ScrollBarsProvider.defaults = {
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: false // enable scrolling buttons by default
            },
            theme: 'minimal',
            autoHideScrollbar: false,
            axis: 'y'
        };
    }

})();