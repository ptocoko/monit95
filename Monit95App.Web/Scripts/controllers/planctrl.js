nsurApp.controller('planCtrl', function ($scope, $rootScope) {   
    $scope.username = null;
    $scope.i = function (username) {
        console.log(username);
    };

    $scope.uploadFile = function (f) {                
        var formData = new FormData();     
        formData.append("uploadedFile", f.files[0]);
        formData.append("username");                

        var obXhr = new XMLHttpRequest();
        obXhr.open("POST", "/api/MarksFile/UploadFile");
        obXhr.send(formData);
    }
});