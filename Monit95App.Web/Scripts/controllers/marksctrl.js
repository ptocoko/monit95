nsurApp.controller('marksCtrl', function ($scope, TResultService) {
    $scope.tresultsData = null;
    console.log('marksCtrl');

    $scope.GetOpenTResultsForArea = function (areaCode) {
        console.log('GetOpenTResultsForArea');
        TResultService.GetOpenTResultsForArea(areaCode).then(function (d) {
            console.log(d);
            $scope.tresultsData = d.data; // success            

        }, function () {
            alert('Ошибка загрузки результатов!'); // failed
        });
    }
});