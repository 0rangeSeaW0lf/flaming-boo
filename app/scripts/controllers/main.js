'use strict';

angular.module('workspaceApp')
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
                $scope.pictures = result.data;
                $scope.searching = false;
                $scope.done = true;
                console.log($scope.pictures);
            }).
            error(function() {
                console.log('error');
            });
        };
        
        $scope.searching = false;
        $scope.done = false;
        $scope.tag = "";
        $scope.search = function(tag) {
            console.log(tag);
            if($scope.instaSearch.$valid) {
               $scope.master= angular.copy(tag);
               $scope.tag="";
               $scope.searching = true;
               $scope.queries(tag);
            }
         };
    });