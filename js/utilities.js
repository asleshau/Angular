(function () {
    'use strict';

    angular.module('App').factory('Utilities', function() {

        var relativeTime = function(datetime) {
            var convertedTime = moment(datetime).local();
            var difference = moment(convertedTime).diff(moment(), 'minutes');
            var diffMinutes = moment.duration(difference, 'minutes');
            if (difference < -2880) {
                return Math.abs(diffMinutes.days()) + ' days ago';
            } else if (difference < -60 & difference > -2880) {
                return '1 day ago';
            } else if (difference > -1440 && difference < -60) {
                var hours = Math.abs(diffMinutes).hours();
                var minutes = difference - (hours * 60);
                return  hours + 'h' +  minutes + 'm ago';
            } else if (difference === -60) {
                return '1 hour ago';
            } else if (difference < 0 && difference > -60) {
                return Math.abs(difference) + ' minutes ago';
            } else if (difference === 0) {
                return 'right now';
            } else if (difference > 0 && difference < 60) {
                return 'in ' + difference + ' minutes';
            } else if (difference === 60) {
                return 'in 1 hour';
            } else if (difference < 1440 && difference > 60) {
                var hours2 = diffMinutes.hours();
                var minutes2 = difference - (hours2 * 60);
                return 'in ' + hours2 + 'h ' +  minutes2 + 'm';
            } else if ( difference > 1439  && difference < 2880) {
                return 'in 1 day';
            } else if (difference > 2880) {
                return 'in ' + diffMinutes.days() + ' days';
            }
        };

        return {relativeTime: relativeTime};
    });
})();