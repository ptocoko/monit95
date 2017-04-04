// Defining angularjs Controller and injecting ParticipsService
nsurApp.controller('participCtrl', function ($scope, $filter, $rootScope, $http, $location, ParticipService, SchoolService) {
    $rootScope.pparticipCount = null;
    $scope.username = null;
    $scope.participsData = null;
    $scope.schoolsData = null;

    $scope.categories = [
      { id: 0, name: 'Без категории' },
      { id: 1, name: 'Первая категория' },
      { id: 2, name: 'Высшая категория' }
    ];
    $scope.subjects = [
      { code: 1, name: 'Русский язык' },
      { code: 2, name: 'Математика' },   
      { code: 7, name: 'История' }
    ]    
        
    $scope.i = function (projectCode, areaCode) {
        $scope.username = areaCode;          
        ParticipService.GetParticips(projectCode, areaCode).then(function (d) {
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
   
    $scope.Particip = {
        ParticipCode: '',
        Surname: '',
        Name: '',
        SecondName: '',
        NSubjectCode: '',        
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
        $scope.Particip.NSubjectCode = '',        
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

                $scope.clear();                
            }, function errorCallback(response) {

                alert("Error : " + response.data.ExceptionMessage);
            });
        } else {
            alert("!Заполните обязательные поля")
        }
    }    

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
    $scope.delete = function (item) {        
        var primaryKey = item.ProjectCode + ';' + item.ParticipCode;
        $http({
            method: 'GET',
            url: '/api/PParticip/GetDParticip?primaryKey=' + primaryKey,
        }).then(function successCallback(response) {
            $scope.participsData.splice($scope.participsData.indexOf(item), 1);            
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };
});

//Calculate Total of Price After Initialization
    //$scope.pparticipcount = function () {
    //    var pparticipcount = 0;
    //    angular.forEach($scope.participsData, function (item) {
    //        pparticipcount += item.Price;
    //    })
    //    return pparticipcount;
    //}