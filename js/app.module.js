(function() {
    'use strict';

    angular.module('App', [
        'ui.router',
        'ngSanitize',
        'ui.bootstrap',
        'ngAnimate',
        'offClick',
        'ngTable',
        'ngScrollbars',
        'ngResource'
    ]);

    angular.module('App')
        .run(
        ['$rootScope', '$state', '$stateParams', '$interval', '$http', 'oauth',
            function ($rootScope, $state, $stateParams, $interval, $http, oauth) {

                // It's very handy to add references to $state and $stateParams to the $rootScope
                // so that you can access them from any scope within your applications.For example,
                // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
                // to active whenever 'contacts.list' or one of its decendents is active.
                var scope = $rootScope;
                scope.$state = $state;
                scope.$stateParams = $stateParams;

                scope.server = '';

                scope.getItems = function () {
                    var postdata = '';

                    oauth.getOauth(postdata)
                        .then(function (data) {
                            $http.defaults.headers.common.Authorization = 'Bearer '+data.access_token;
                        })
                        .catch(function (error) {
                          //  console.log(error);
                        })
                        .finally(function () {
                         //   console.log("finally done!");
                         // For Logout
                         // $interval.cancel(scope.stop);
                        });
                };

                scope.getItems();

                scope.stop = $interval(scope.getItems, 3600000);

            }
        ]
    );



})();