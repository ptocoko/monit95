nsurApp.factory('SchoolService', function ($http) {
    var fac = {};
    fac.GetSchools = function (areaCode) {
        return $http.get('/api/School/GetSchools?areaCode=' + areaCode);
    }
    return fac;
});