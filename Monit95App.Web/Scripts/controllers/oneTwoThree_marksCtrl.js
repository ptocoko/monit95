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
		ProjectParticipId: '1',
		Marks: '1;1;0;1;1;1;1;1;1;0;0|1;1;1;1;1;1;1;1;1;1;1'
	}];

	$scope.getMarksByParticipId = function (id) {
		var result = '';
		$scope.Marks.forEach(function (item, i, arr) {
			if (item.ProjectParticipId == id) {
				result = item.Marks;
			}
		})
		return result;
	};

	$scope.changeMarks = function (particip, marksString) {
		var classNumber = particip.ClassName.charAt(0);
			openModal = $uibModal.open({
				templateUrl: '/Templates/modalTemplatesMarksRU/templateForClass1.html',
				size: 'marksSize',
				controller: function ($scope, $uibModal) {
					$scope.participFullName = particip.Surname + ' ' + particip.Name + ' ' + particip.SecondName;

					if(classNumber === '1')
						$scope.exerciseNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9.1', '9.2', '10'];

					$scope.marksArray = [];

					if (marksString != '') {
						$scope.marksArray = deserializeMarks(marksString);
					}

					function serializeMarks(marksArr) {
						var result = '';
						var maxMarks = '|1;1;1;1;1;1;1;1;1;1;1';
						marksArr.forEach(function (item, i, arr) {
							result += item + ';';
						})
						
						return result.slice(0, result.length-1) + maxMarks;
					}

					function deserializeMarks(marksStr) {
						var marks = marksStr.split('|')[0];
						return marks.split(';');
					}

					$scope.setAbsentMarks = function () {
						if (isAbsent) {
							$scope.marksArray.forEach(function (item, i, arr) {
								item = 'x';
							});
						}
						else {
							$scope.marksArray.forEach(function (item, i, arr) {
								item = '';
							});
						}
					}

					$scope.showMarks = function () {//temp
						console.log(serializeMarks($scope.marksArray));
					}

					$scope.save = function () {
						openModal.close(serializeMarks($scope.marksArray));
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