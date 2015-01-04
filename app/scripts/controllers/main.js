'use strict';

angular.module('workspaceApp') // <- Inject ['ngAnimate'] here instead of doint it in app.js'
    .controller('MainCtrl', function ($scope, $http) {
        $scope.queries = function(tag){
            var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent";
            var request = {
                client_id: "f2cbd0eb30e44f3a97ac27a001bcd2f8",
                callback: "JSON_CALLBACK" 
            };

            $http({
                method: 'JSONP',
                url: url,
                params: request
            }).
            success(function(result) {
                $scope.pictures = result;
                $scope.statuses.searching = false;
                $scope.statuses.done = true;
                $scope.statuses.show = true;
            }).
            error(function() {
                $scope.statuses.searching = false;
                $scope.statuses.done = false;
                $scope.statuses.error = true;
            });
        };
        
        $scope.statuses = {error: false, searching: false, done: false, show: false};
        $scope.tag = "";
        $scope.search = function(tag) {
            $scope.statuses.done = false;
            $scope.statuses.error = false;
            if($scope.instaSearch.$valid) {
                $scope.statuses.show = false;
                $scope.master= angular.copy(tag);
                $scope.tag="";
                $scope.statuses.searching = true;
                $scope.queries(tag);
            }
        };
        $scope.change = function(status){
            $scope.statuses[status] = !$scope.statuses[status];
        };
    });