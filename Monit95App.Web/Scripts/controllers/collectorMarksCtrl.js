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

	$scope.Marks = [{
		ProjectParticipId: '1',
		Marks: '1;1;0;1;1;1;1;1;1;0;0|1;1;1;1;1;1;1;1;1;1;1'
	}];

	$scope.getMarksObjectById = function (id) {
		var result = '';
		$scope.Marks.forEach(function (item, i, arr) {
			if (item.ProjectParticipId == id) {
				result = item;
			}
		})
		return result;
	};

	$scope.changeMarks = function (particip, marksObject) {
		var classNumber = particip.ClassName.charAt(0);
		var openModal;
		if (classNumber === '1') {
			openModal = $uibModal.open({
				templateUrl: '/Templates/modalTemplatesMarksRU/templateForClass1.html',
				size: 'marksSize',
				controller: function ($scope, $uibModal) {
					$scope.participFullName = particip.Surname + ' ' + particip.Name + ' ' + particip.SecondName;
					$scope.exerciseNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9.1', '9.2', '10'];
					$scope.marks = [];

					if (marksObject != '') {
						$scope.marks = deserializeMarks(marksObject.Marks);
					}

					function serializeMarks(marksArr) {

					}

					function deserializeMarks(marksString) {
						var marks = marksString.split('|')[0];
						return marks.split(';');
					}
				}
			});
		}
		else if (classNumber === '2') {

		}
		else if (classNumber === '3') {

		}
		else {
			alert('Something went wrong!\nclassNumber = ' + classNumber);
		}
	}
});