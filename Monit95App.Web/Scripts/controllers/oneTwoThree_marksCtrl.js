oneTwoThreeApp.controller('oneTwoThree_marksCtrl', function ($scope, $http, $uibModal, $rootScope, OneTwoThree_ParticipService) {

	$scope.$on('$viewContentLoaded', function () {
		$scope.getParticips($rootScope.username)
	}); 

	$scope.getParticips = function (schoolId) {
		OneTwoThree_ParticipService.getParticips(schoolId).then(function (response) {
			$scope.particips = response.data;
		}, function () {
			alert('Ошибка доступа к базе данных\nПожалуйста, повторите попытку позже');
		});
	};

	$scope.Marks = [{//temporary
		ProjectParticipId: 1248,
		Marks: '1;1;0;1;1;1;1;1;1;0;0'
	}];

	$scope.getMarksObjectByParticipId = function (id) {
		var result = '';
		$scope.Marks.forEach(function (item, i, arr) {
			if (item.ProjectParticipId === id) {
				result = item;
			}
		})
		return result;
	};

	$scope.changeMarks = function (particip, marksObject) {
		var classNumber = particip.ClassName.charAt(0);
			openModal = $uibModal.open({
				templateUrl: '/Templates/modalTemplatesMarksRU/templateForClass1.html',
				size: 'marksSize',
				controller: function ($scope, $uibModal) {
					$scope.participFullName = particip.Surname + ' ' + particip.Name + ' ' + particip.SecondName;
					var testId;
					if (classNumber === '1') {
						$scope.exerciseNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9.1', '9.2', '10'];
						testId = '';
					}

					$scope.marksArray = [];

					if (marksObject !== '') {
						$scope.marksArray = deserializeMarks(marksObject.Marks);
					}

					function serializeMarks(marksArr) {
						var result = '';
						marksArr.forEach(function (item, i, arr) {
							result += item + ';';
						})
						
						return result.slice(0, result.length-1);
					}

					function deserializeMarks(marksStr) {
						return marksStr.split(';');
					}

					$scope.setAbsentMarks = function () {
						if ($scope.isAbsent) {
							$scope.marksArray.forEach(function (item, i, arr) {
								$scope.marksArray[i] = 'x';
							});
						}
						else {
							$scope.marksArray.forEach(function (item, i, arr) {
								$scope.marksArray[i] = '';
							});
						}
					}

					$scope.showMarks = function () {//temp
						console.log(serializeMarks($scope.marksArray));
					}

					$scope.save = function () {
						if (marksObject !== '') {
							marksObject.Marks = serializeMarks($scope.marksArray);
							openModal.close(marksObject);
						}
						else {
							openModal.close({
								TestId: testId,
								ParticipId: particip.Id,
								Marks: serializeMarks($scope.marksArray)
							});
						}
					}

					$scope.cancel = function () {
						openModal.dismiss('cancel');
					}
				}
			});
		
		openModal.result.then(function (res) {
			//to realize
		})
	}
});