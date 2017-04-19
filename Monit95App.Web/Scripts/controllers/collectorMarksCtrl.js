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

	$scope.Marks = [];

	$scope.getMarksById = function (id) {
		var result = '';
		$scope.Marks.forEach(function (item, i, arr) {
			if (item.ParticipId === id) {
				result = item.Marks;
			}
			return result;
		})
	};

	$scope.changeMarks = function (particip) {
		var classNumber = particip.ClassName.charAt(0);
		var openModal = $uibModal.open({
			templateUrl: '/Templates/modalTemplatesMarksRU/templateForClass' + classNumber + '.html',
			controller: function ($scope, $uibModal) {
				$scope.participFullName = particip.Surname + ' ' + particip.Name + ' ' + particip.SecondName;


			}
		});
	}
});