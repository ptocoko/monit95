nsurApp.factory('ResultService', function ($http) {
    var fac = {};
    fac.GetForArea = function (areaCode, testDateString) {
        return $http.get('/api/TResult/GetForArea?areaCode=' + areaCode);
    }
    return fac;
});