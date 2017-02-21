nsurApp.controller('tabCtrl', function ($scope) {
    $scope.tabNumber = 0;
    $scope.selectTab = function(number)
    {
        console.log('selectTab');
        $scope.tabNumber = number;
    }
});