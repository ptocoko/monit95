nsurApp.controller('planCtrl', function ($scope) {    
    $scope.uploadFile = function (f) {
        console.log(f.files[0].name);
        var formData = new FormData();     
        formData.append("uploadedFile", f.files[0]);
        formData.append("username", "202");        
        formData.append("targetPath", "d:\ttt");

        var obXhr = new XMLHttpRequest();
        obXhr.open("POST", "/api/MarksFile/UploadFile");
        obXhr.send(formData);
    }
});