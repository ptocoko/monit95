// Defining angularjs module
var nsurApp = angular.module('nsurApp', ['ngRoute', 'ui.bootstrap']);

nsurApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/participlist', {
            templateUrl: 'Templates/participlist.html',
            controller: 'participCtrl'
        })
        .when('/plan', {
            templateUrl: '/Templates/plan.html',
            controller: 'planCtrl'
        })
        .when('/marks', {
            templateUrl: '/Templates/marks.html',
            controller: 'marksCtrl'
        })
        .when('/marks_edit', {
            templateUrl: '/Templates/marks_edit.html/:participTestDTO?',
            controller: 'marks_editCtrl'
        });

    $locationProvider.hashPrefix('');
});


