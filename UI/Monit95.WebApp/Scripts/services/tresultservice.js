nsurApp.factory('TResultService', function ($http) {
    var fac = {};
    fac.GetOpenProjectTestDTOs = function (projectCode, areaCode) {
        return $http.get('/api/ExerMark/GetOpenProjectTestDTOs?projectCode=' + projectCode + '&areaCode=' + areaCode);
    }
    return fac;
});