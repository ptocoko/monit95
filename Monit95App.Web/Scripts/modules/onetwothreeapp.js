// Defining angularjs module
var oneTwoThreeApp = angular.module('oneTwoThreeApp', ['ngRoute', 'ui.bootstrap']);

oneTwoThreeApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/Templates/onetwothree_main.html'
        })
        .when('/partiplist', {
            templateUrl: '/Templates/onetwothree_particip.html',
            controller: 'oneTwoThree_participCtrl'
        });   
    
    $locationProvider.hashPrefix('');
});

oneTwoThreeApp.controller('oneTwoThreeCtrl', function ($scope, $rootScope) {
    $scope.init = function (username) {
        $rootScope.username = username;
    };
});


