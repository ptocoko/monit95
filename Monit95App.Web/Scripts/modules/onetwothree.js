// Defining angularjs module
var oneTwoThreeApp = angular.module('oneTwoThreeApp', ['ngRoute']);

oneTwoThreeApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/Templates/main.html'
        });        
    
    $locationProvider.hashPrefix('');
});


