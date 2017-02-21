// Defining angularjs Controller and injecting ParticipsService
nsurApp.controller('participCtrl', function ($scope, $rootScope, $http, $location, ParticipService, SchoolService) {
    $scope.areaCode = null;
    $rootScope.pparticipCount = null;
    $scope.username = null;

    $scope.categories = [
      { id: 0, name: 'Без категории' },
      { id: 1, name: 'Первая категория' },
      { id: 2, name: 'Высшая категория' }
    ];
    $scope.subjects = [
      { code: 1, name: 'Русский язык' },
      { code: 2, name: 'Математика' }
    ]
    $scope.selectedCategId = $scope.categories[0];

    $scope.participsData = null;
    $scope.schoolsData = null;
    $scope.username = null;
    // Fetching records from the factory created at the bottom of the script file

    $scope.i = function (areaCode) {
        $scope.username = areaCode;
        console.log(areaCode)        
        ParticipService.GetParticips(areaCode).then(function (d) {
            $scope.participsData = d.data; // Success
            $rootScope.pparticipCount = d.data.length;

        }, function () {
            alert('Error Occured !!!'); // Failed
        });
        SchoolService.GetSchools(areaCode).then(function (d) {
            $scope.schoolsData = d.data; // Success
            $scope.selectedSchoolId = $scope.schoolsData[0];
        }, function () {
            alert('Error Occured !!!'); // Failed
        });
    }

    //Calculate Total of Price After Initialization
    //$scope.pparticipcount = function () {
    //    var pparticipcount = 0;
    //    angular.forEach($scope.participsData, function (item) {
    //        pparticipcount += item.Price;
    //    })
    //    return pparticipcount;
    //}

    $scope.Particip = {
        ParticipCode: '',
        Surname: '',
        Name: '',
        SecondName: '',
        SubjectCode: '',
        SchoolId: '',
        CategId: '',
        Experience: '',
        Phone: '',
        Email: ''
    };
    // Reset particip details
    $scope.clear = function () {
        $scope.Particip.Surname = '',
        $scope.Particip.Name = '',
        $scope.Particip.SecondName = '',
        $scope.Particip.SubjectCode = '',
        $scope.Particip.SchoolId = '',
        $scope.Particip.CategId = '',
        $scope.Particip.Experience = '',
        $scope.Particip.Phone = '',
        $scope.Particip.Email = ''
    }

    $scope.save = function (Particip, participForm) {
        if (participForm.$valid) {
            $http({
                method: 'POST',
                url: '/api/PParticip/PostParticip',
                data: Particip
            }).then(function successCallback(response) {
                $scope.participsData.push(response.data); //TODO: тут необходим рефакторинг
                $scope.i($scope.username);

                $scope.clear();                
            }, function errorCallback(response) {

                alert("Error : " + response.data.ExceptionMessage);
            });
        } else {
            alert("!Заполните обязательные поля")
        }
    }

    //Add New Item
    //$scope.save = function () {
    //    if ($scope.Particip.Surname != "" &&
    //        $scope.Particip.Name != "" &&
    //        $scope.Particip.SecondName != "" &&
    //        $scope.Particip.SchoolId != '' &&
    //        $scope.Particip.SubjectCode != '' &&
    //        $scope.Particip.CategId != "" &&
    //        $scope.Particip.Experience != "" &&
    //        $scope.Particip.Phone != "" &&
    //        $scope.Particip.Email != ""
    //        ) {

    //        $http({
    //            method: 'POST',
    //            url: '/api/PParticip/PostParticip',
    //            data: $scope.Particip
    //        }).then(function successCallback(response) {
    //            // this callback will be called asynchronously
    //            // when the response is available
    //            $scope.participsData.push(response.data); //TODO: тут необходим рефакторинг
    //            $scope.i($scope.username);

    //            $scope.clear();
    //            //alert("Участник удачно добавлен!");
    //        }, function errorCallback(response) {
    //            // called asynchronously if an error occurs
    //            // or server returns response with an error status.
    //            alert("Error : " + response.data.ExceptionMessage);
    //        });
    //    }
    //    else {
    //        alert('Пожалуйста заполните все поля 222');
    //    }
    //};

    // Edit product details
    $scope.edit = function (data) {
        $scope.Product = {
            Surname: data.Surname,
            Name: data.Name,
            SecondName: data.SecondName,
            CategName: data.CategName,
            Experience: data.Experience,
            Phone: data.Phone,
            Email: data.Email
        };
    }

    // Cancel product details
    $scope.cancel = function () {
        $scope.clear();
    }

    // Update
    $scope.update = function () {
        if ($scope.Particip.Surname != "" &&
            $scope.Particip.Name != "" &&
            $scope.Particip.SecondName != "" &&
            $scope.Particip.CategName != "" &&
            $scope.Particip.Experience != "" &&
            $scope.Particip.Phone != "" &&
            $scope.Particip.Email != "") {
            $http({
                method: 'PUT',
                url: 'api/PParticip/PutParticip/' + $scope.Product.Id,
                data: $scope.Product
            }).then(function successCallback(response) {
                $scope.participsData = response.data;
                $scope.clear();
                alert("Product Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Delete
    $scope.delete = function (index) {
        var primaryKey = $scope.participsData[index].ProjectCode + ';' + $scope.participsData[index].ParticipCode;
        $http({
            method: 'GET',
            url: '/api/PParticip/GetDParticip?primaryKey=' + primaryKey,
        }).then(function successCallback(response) {
            $scope.participsData.splice(index, 1);
            //alert("Участник успешно удален !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };
});