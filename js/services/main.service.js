/**
 * Created by 502578412 on 3/3/2016.
 */
angular.module('App')
    .factory('oauth', function ($http, $q, $rootScope) {
    var baseUrl = 'data/';

    getOauth = function (postdata) {
        var deferred = $q.defer();
        $http.post(baseUrl+'oauth.json', postdata)
            .then(function successCallback(response) {
                deferred.resolve(response.data);
            }, function errorCallback(response) {
                deferred.reject(response.status);
            });
        // deferred.reject('error message here!');
        // can do progress checking here as well
        return deferred.promise;
    }
    return {getOauth: getOauth};
});
