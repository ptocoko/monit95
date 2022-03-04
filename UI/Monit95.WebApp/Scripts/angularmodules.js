var ParticipApp = angular.module('ParticipApp', ['smart-table']);
ParticipApp.factory('participService', function ($http) {
    var factory = {};
    factory.GetAllParticips = function () {
        return $http.get('/Home/GetAllParticips');
    }
    return factory;
});