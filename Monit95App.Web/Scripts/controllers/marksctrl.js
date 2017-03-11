nsurApp.controller('marksCtrl', function ($scope, TResultService) {
    $scope.openProjectTestDTOs = null;
    $scope.blocks = null;

    $scope.createBlock = function (element, index, array) {              
        var d = new Date(element.TestDate);        
        console.log(element.TestNumberCode + '-' + element.TestName.toUpperCase() + ', ' + element.TestDate.substring(0, 10));

    };

    $scope.GetOpenProjectTestDTOs = function (projectCode, areaCode) {
        TResultService.GetOpenProjectTestDTOs(projectCode, areaCode).then(function (d) {
            $scope.openProjectTestDTOs = d.data; //success  
            $scope.openProjectTestDTOs.forEach($scope.createBlock);
        }, function () {
            alert('Ошибка загрузки результатов!'); //failed
        });
    }

    $scope.change = function (index) {
      //  $location.path("/marks_edit" + )
        var participTest = openProjectTestDTOs[index];
    };

    $scope.marks_toString = function (exerMarkDTOs) {
        var result = '';
        var firstMark = exerMarkDTOs[0].ExerCurrentMark;
        if (firstMark != -1) {
            result = firstMark + '; ';
        }
        exerMarkDTOs.forEach(function (item, i, arr) {
            if (i != 0 && arr[i].ExerCurrentMark != -1) //нулевой не нужен, т.к. он уже есть
            {
                result += arr[i].ExerCurrentMark + '; ';
            }
        });

        return result;
    }
});