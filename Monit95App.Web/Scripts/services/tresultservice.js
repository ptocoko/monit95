nsurApp.factory('TResultService', function ($http) {
    var fac = {};
    fac.GetOpenTResultsForArea = function (projectCode, areaCode) {
        return $http.get('/api/ExerMark/GetOpenProjectTest?projectCode=' + projectCode + '&areaCode=' + areaCode);
    }
    return fac;
});