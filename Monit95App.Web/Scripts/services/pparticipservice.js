nsurApp.factory('ParticipService', function ($http) {
    var fac = {};
    fac.GetParticips = function (areaCode) {
        return $http.get('/api/PParticip/GetParticips?areaCode=' + areaCode);
    }
    return fac;
});