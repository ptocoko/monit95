nsurApp.controller('tabCtrl', function ($scope, $rootScope) {
    $scope.tabNumber = 0;
    $rootScope.username = null;
    $scope.init = function (username)
    {
        console.log('$scope.init: ' + username)
        $rootScope.username = username;
    }
    $scope.selectTab = function(number)
    {
        console.log('selectTab');
        $scope.tabNumber = number;
    }
});