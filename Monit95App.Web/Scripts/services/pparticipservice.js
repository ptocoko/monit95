nsurApp.factory('ParticipService', function ($http) {
    var fac = {};
    fac.GetParticips = function (projectCode, areaCode) {
        return $http.get('/api/ProjectParticip/GetParticips?areaCode=' + areaCode);
    }
    return fac;
});