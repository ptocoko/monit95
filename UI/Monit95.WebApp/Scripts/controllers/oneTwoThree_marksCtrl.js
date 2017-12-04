oneTwoThreeApp.controller('oneTwoThree_marksCtrl', function ($scope, $http, $uibModal, $rootScope, OneTwoThree_ParticipService) {

	$scope.$on('$viewContentLoaded', function () {
		$scope.getParticips($rootScope.username);
		$scope.getMarks($rootScope.username);
		getMaxRates();
	}); 

	$scope.particips = [];
	$scope.Marks = {};
	var marksObjectArr = [];

	function getMaxRates() {
		OneTwoThree_ParticipService.getMaxRates().then(function (res) {
			$scope.maxRates = res.data;
		})
	}

	function updateCountOfEmptyMarks() {
		$scope.countOfEmptyMarks = $scope.particips.length - marksObjectArr.length;
	}

	function getLightArrayFromObjectArray(objectArr) {
		objectArr.forEach(function (item, i, arr) {
			$scope.Marks[item.ProjectParticipId.toString()] = item.Marks;
		});
	}

	$scope.getParticips = function (schoolId) {
		OneTwoThree_ParticipService.getParticips(schoolId).then(function (response) {
			$scope.particips = response.data;
			updateCountOfEmptyMarks();
		}, function () {
			alert('Ошибка доступа к базе данных\nПожалуйста, повторите попытку позже');
		});
	};


	$scope.getMarks = function (schoolId) {
		OneTwoThree_ParticipService.getMarks(schoolId).then(function (response) {
			marksObjectArr = response.data;
			getLightArrayFromObjectArray(marksObjectArr);
			updateCountOfEmptyMarks();
		}, function () {
			alert('Ошибка доступа к базе данных\nПожалуйста, повторите попытку позже');
		})
	}

	$scope.getMarksObjectByParticipId = function (id) {
		var result = '';
		marksObjectArr.forEach(function (item, i, arr) {
			if (item.ProjectParticipId == id) {
				result = item;
			}
		})
		return result;
	};

	//$scope.addWhiteSpacesBetweenMarks = function (marksWithoutSpaces) {
	//	var tempArr = marksWithoutSpaces.split(';');
	//	var marksWithSpaces = '';

	//	tempArr.forEach(function (item, i, arr) {
	//		marksWithSpaces += item.trim() + '; ';
	//	});

	//	return marksWithSpaces.slice(0, marksWithSpaces.length - 2);
	//}

	$scope.changeMarks = function (particip, marksObject, maxRates) {
		var classNumber = particip.ClassName.charAt(0);
			var openModal = $uibModal.open({
				templateUrl: '/Templates/modalTemplatesMarksRU/templateForClass1.html',
				size: 'marksSize',
				controller: function ($scope, $uibModal, OneTwoThree_ParticipService) {
					$scope.participFullName = particip.Surname + ' ' + particip.Name + ' ' + particip.SecondName;
					$scope.statusText = '';
					$scope.addMarksDisabled = false;
					$scope.isErrorText = false;
					var testId;
					var allInputs; //содержит все input-ы (поля для оценок + кнопка отправить)
					var marksInputs; //содержит только input-ы для оценок

					if (classNumber === '1') {
						$scope.exercises = maxRates[0].MaxRates;
						testId = maxRates[0].TestId;
					}

					if (classNumber === '2') {
						$scope.exercises = maxRates[1].MaxRates;
						testId = maxRates[1].TestId;
					}

					if (classNumber === '3') {
						$scope.exercises = maxRates[2].MaxRates;
						testId = maxRates[2].TestId;
					}
					//Todo: 
					$scope.marksArray = [];

					if (marksObject !== '') {
						$scope.marksArray = deserializeMarks(marksObject.Marks);
						if ($scope.marksArray[0] == 'X')
							$scope.isAbsent = true;
					}
					else {
						$scope.exercises.forEach(function (item, i, arr) {
							$scope.marksArray[i] = '';
						})
					}
					
					$(function () {
						allInputs = $('form').find(':input');
						marksInputs = $('table').find(':input');
						marksInputs.focus(function () {
							var i = marksInputs.index(this);
							this.value = '';
							$scope.marksArray[i] = '';
						});
						$('#0').focus();
					});

					function serializeMarks(marksArr) {
						var result = '';
						marksArr.forEach(function (item, i, arr) {
							result += item + '; ';
						})
						
						return result.slice(0, result.length-2);
					}

					function deserializeMarks(marksStr) {
						var array = marksStr.split(';');
						array.forEach(function (item, i, arr) {
							array[i] = item.trim();
						});
						return array;
					}

					$scope.setAbsentMarks = function () {
						if ($scope.isAbsent) {
							$scope.marksArray.forEach(function (item, i, arr) {
								$scope.marksArray[i] = 'X';
							});
						}
						else {
							$scope.marksArray.forEach(function (item, i, arr) {
								$scope.marksArray[i] = '';
							});
							$('#0').focus().select();
						}
					}
					
					$scope.checkAndNext = function (i) {
						if ($scope.marksArray[i] <= $scope.exercises[i] && $scope.marksArray[i] >= 0 && $scope.marksArray[i].length < 2) {
							allInputs.eq(i + 1).focus().select();
						}
						else if ($scope.marksArray[i] == undefined){

						}
						else {
							$scope.marksArray[i] = $scope.exercises[i];
							allInputs.eq(i + 1).focus().select();
						}
						
					}
					
					$scope.save = function () {
						$scope.statusText = 'Результаты обновляются...';
						$scope.isErrorText = false;
						if (marksObject !== '') {
							marksObject.Marks = serializeMarks($scope.marksArray);
							$scope.addMarksDisabled = true;

							OneTwoThree_ParticipService.updateMarks(marksObject).then(function (response) {
								openModal.close([marksObject, true]);
							}, function (message) {
								$scope.statusText = 'Ошибка! Проверьте подключение к интернету';
								$scope.isErrorText = true;
								$scope.addMarksDisabled = false;
							});
						}
						else {
							$scope.statusText = 'Результаты добавляются...';
							$scope.isErrorText = false;
							var newMarksObject = {
								TestId: testId,
								ProjectParticipId: particip.Id,
								Marks: serializeMarks($scope.marksArray)
							};
							$scope.addMarksDisabled = true;

							OneTwoThree_ParticipService.postMarks(newMarksObject).then(function (response) {
								openModal.close([response.data, false]);
							}, function (message) {
								$scope.statusText = 'Ошибка! Проверьте подключение к интернету';
								$scope.isErrorText = true;
								$scope.addMarksDisabled = false;
							});

							
						}
					}

					$scope.cancel = function () {
						openModal.dismiss('cancel');
					}
				}
			});
		
			openModal.result.then(function (res) {
				if (res[1]) {
					getLightArrayFromObjectArray(marksObjectArr);
				}
				else {
					marksObjectArr.push(res[0]);
					getLightArrayFromObjectArray(marksObjectArr);
					updateCountOfEmptyMarks();
				}
				
			});
	}
});