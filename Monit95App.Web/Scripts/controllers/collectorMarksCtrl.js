angular.module('collectorMarksApp').controller('CollectorMarksCtrl', function ($scope, $http, $uibModal, CollectorMarksService) {
	var _schoolId = '';
	$scope.getParticips = function (schoolId) {
		CollectorMarksService.getParticips(schoolId).then(function (response) {
			_schoolId = schoolId;
			$scope.particips = response.data;
		}, function () {
			alert('Ошибка доступа к базе данных\nПожалуйста, повторите попытку позже');
		});
	};

	$scope.Marks = {};

	$scope.getMarksById = function (id) {
		return $scope.Marks[id];
	};

	$scope.changeMarks = function (particip) {
		var openModal = $uibModal.open({
			templateUrl: '/Templates/modalTemplatesMarksRU/templateForClass' + particip.ClassName.slice
		})
	}
});