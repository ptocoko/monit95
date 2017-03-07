nsurApp.controller('marksCtrl', function ($scope, TResultService) {
    $scope.tresultsData = null;

    $scope.GetOpenProjectTest = function (projectCode, areaCode) {
        console.log('GetOpenTResultsForArea');
        TResultService.GetOpenTResultsForArea(projectCode, areaCode).then(function (d) {
            console.log(d.data);
            $scope.tresultsData = d.data; //success                
        }, function () {
            alert('Ошибка загрузки результатов!'); //failed
        });
    }

    $scope.GetEx = function (exerMarkDTOs)
    {        
        var tt = exerMarkDTOs[0].ExerCurrentMar + '; ';
        exerMarkDTOs.forEach(function (item, i, arr) {
            if (i != 0)
            {
                tt += arr[i].ExerCurrentMar + '; '
            }            
        });

        return tt;
    }
});