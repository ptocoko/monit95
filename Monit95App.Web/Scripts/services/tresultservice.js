nsurApp.factory('TResultService', function ($http) {
    var fac = {};
    fac.GetOpenTResultsForArea = function (areaCode) {
        return $http.get('/api/TResult/GetOpenTResultsForArea?areaCode=' + areaCode);
    }
    return fac;
});