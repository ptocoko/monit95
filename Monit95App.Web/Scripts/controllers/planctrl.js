nsurApp.controller('planCtrl', function ($scope) {    
    $scope.uploadFile = function (f) {
        console.log(f.files[0].name);
        var formData = new FormData();
        formData.append("uploadedFile", f.files[0]);

        var obXhr = new XMLHttpRequest();
        obXhr.open("POST", "/api/MarksCollector/UploadFile");
        obXhr.send(formData);
    }
});