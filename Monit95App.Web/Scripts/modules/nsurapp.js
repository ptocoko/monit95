﻿// Defining angularjs module
var nsurApp = angular.module('nsurApp', ['ngRoute']);

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
     
    $locationProvider.hashPrefix('');
});


