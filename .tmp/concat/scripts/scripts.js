'use strict';

/**
 * @ngdoc overview
 * @name workspaceApp
 * @description
 * # workspaceApp
 *
 * Main module of the application.
 */
angular
  .module('workspaceApp', [
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'ngRoute'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

angular.module('workspaceApp')
    .controller('MainCtrl', ["$scope", "$http", function ($scope, $http) {
        $scope.queries = function(tag){
            var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent';
            var request = {
                client_id: 'f2cbd0eb30e44f3a97ac27a001bcd2f8',
                callback: 'JSON_CALLBACK' 
            };

            $http({
                method: 'JSONP',
                url: url,
                params: request
            }).
            success(function(result) {
                $scope.pictures = result.data;
                $scope.statuses.searching = false;
                $scope.statuses.done = true;
            }).
            error(function() {
                $scope.statuses.searching = false;
                $scope.statuses.done = false;
                $scope.statuses.error = true;
            });
        };
        $scope.master = {};
        $scope.statuses = {error: false, searching: false, done: false};
        $scope.tag = '';
        $scope.search = function(tag) {
            $scope.statuses.done = false;
            $scope.statuses.error = false;
            if($scope.instaSearch.$valid) {
                $scope.master= angular.copy(tag);
                $scope.tag='';
                $scope.statuses.searching = true;
                $scope.queries(tag);
            }
        };
        $scope.change = function(status){
            $scope.statuses[status] = !$scope.statuses[status];
        };
    }]);