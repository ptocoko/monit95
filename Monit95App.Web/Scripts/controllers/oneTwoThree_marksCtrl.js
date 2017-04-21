oneTwoThreeApp.controller('oneTwoThree_marksCtrl', function ($scope, $http, $uibModal, $rootScope, OneTwoThree_ParticipService) {

	$scope.$on('$viewContentLoaded', function () {
		$scope.getParticips($rootScope.username);
		$scope.getMarks($rootScope.username);
	}); 

	$scope.getParticips = function (schoolId) {
		OneTwoThree_ParticipService.getParticips(schoolId).then(function (response) {
			$scope.particips = response.data;
		}, function () {
			alert('Ошибка доступа к базе данных\nПожалуйста, повторите попытку позже');
		});
	};

	$scope.getMarks = function (schoolId) {
		OneTwoThree_ParticipService.getMarks(schoolId).then(function (response) {
			$scope.Marks = response.data;
		}, function () {
			alert('Ошибка доступа к базе данных\nПожалуйста, повторите попытку позже');
		})
	}

	$scope.getMarksObjectByParticipId = function (id) {
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
			var openModal = $uibModal.open({
				templateUrl: '/Templates/modalTemplatesMarksRU/templateForClass1.html',
				size: 'marksSize',
				controller: function ($scope, $uibModal) {
					$scope.participFullName = particip.Surname + ' ' + particip.Name + ' ' + particip.SecondName;
					var testId;
					if (classNumber === '1') {
						$scope.exercises = [
							{
								Name: '1',
								MaxRate: 2
							},
							{
								Name: '2',
								MaxRate: 2
							},
							{
								Name: '3',
								MaxRate: 2
							},
							{
								Name: '4',
								MaxRate: 1
							},
							{
								Name: '5',
								MaxRate: 1
							},
							{
								Name: '6',
								MaxRate: 1
							},
							{
								Name: '7',
								MaxRate: 2
							},
							{
								Name: '8',
								MaxRate: 1
							},
							{
								Name: '9.1',
								MaxRate: 2
							},
							{
								Name: '9.2',
								MaxRate: 2
							},
							{
								Name: '10',
								MaxRate: 2
							},
							{
								Name: '11',
								MaxRate: 2
							},
							{
								Name: '12',
								MaxRate: 2
							},
							{
								Name: '13',
								MaxRate: 2
							}
						];
						testId = 'C0AAE792-9EE5-4A9F-B8CD-03AEF37032E1';
					}

					if (classNumber === '2') {
						$scope.exercises = [
							{
								Name: '1',
								MaxRate: 1
							},
							{
								Name: '2',
								MaxRate: 2
							},
							{
								Name: '3',
								MaxRate: 2
							},
							{
								Name: '4',
								MaxRate: 2
							},
							{
								Name: '5',
								MaxRate: 1
							},
							{
								Name: '6',
								MaxRate: 1
							},
							{
								Name: '7',
								MaxRate: 2
							},
							{
								Name: '8',
								MaxRate: 2
							},
							{
								Name: '9.1',
								MaxRate: 2
							},
							{
								Name: '9.2',
								MaxRate: 2
							},
							{
								Name: '10',
								MaxRate: 2
							},
							{
								Name: '11',
								MaxRate: 2
							},
							{
								Name: '12',
								MaxRate: 2
							},
							{
								Name: '13',
								MaxRate: 2
							},
							{
								Name: '14',
								MaxRate: 3
							},
							{
								Name: '15',
								MaxRate: 3
							},
							{
								Name: '16',
								MaxRate: 3
							},
							{
								Name: '17',
								MaxRate: 2
							}
						];
						testId = 'CCE3AB81-F9CC-4139-AF54-2A6E3E287D86';
					}

					if (classNumber === '3') {
						$scope.exercises = [
							{
								Name: '1',
								MaxRate: 1
							},
							{
								Name: '2',
								MaxRate: 2
							},
							{
								Name: '3',
								MaxRate: 2
							},
							{
								Name: '4',
								MaxRate: 2
							},
							{
								Name: '5',
								MaxRate: 1
							},
							{
								Name: '6',
								MaxRate: 1
							},
							{
								Name: '7',
								MaxRate: 1
							},
							{
								Name: '8',
								MaxRate: 1
							},
							{
								Name: '9',
								MaxRate: 1
							},
							{
								Name: '10',
								MaxRate: 1
							},
							{
								Name: '11',
								MaxRate: 2
							},
							{
								Name: '12',
								MaxRate: 1
							},
							{
								Name: '13',
								MaxRate: 2
							},
							{
								Name: '14',
								MaxRate: 1
							},
							{
								Name: '15',
								MaxRate: 2
							},
							{
								Name: '16',
								MaxRate: 3
							},
							{
								Name: '17',
								MaxRate: 3
							},
							{
								Name: '18',
								MaxRate: 3
							},
							{
								Name: '19',
								MaxRate: 2
							},
							{
								Name: '20',
								MaxRate: 2
							}
						];
						testId = 'BB55D9EE-4177-4FB9-B825-7BE22455B626';
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
						}
					}

					$scope.checkAndNext = function (i) {
						if ($scope.marksArray[i] <= $scope.exercises[i].MaxRate && $scope.marksArray[i] >= 0) {
							var inputs = $('form').find(':input');
							inputs.eq(i + 1).focus().select();
						}
						else if ($scope.marksArray[i] == undefined){

						}
						else {
							$scope.marksArray[i] = $scope.exercises[i].MaxRate;
							var inputs = $('form').find(':input');
							inputs.eq(i + 1).focus().select();
						}
						
					}

					$scope.showMarks = function () {//temp
						console.log(serializeMarks($scope.marksArray));
					}

					$scope.save = function () {
						if (marksObject !== '') {
							marksObject.Marks = serializeMarks($scope.marksArray);

							openModal.close([marksObject, true]);
						}
						else {
							openModal.close([{
								TestId: testId,
								ProjectParticipId: particip.Id,
								Marks: serializeMarks($scope.marksArray)
							}, false]);
						}
					}

					$scope.cancel = function () {
						openModal.dismiss('cancel');
					}
				}
			});
		
			openModal.result.then(function (res) {
				if (res[1]) {
					console.log('updating')
					OneTwoThree_ParticipService.updateMarks(res[0]).then(function (response) {

					})
				}
				else {
					console.log('adding')
					OneTwoThree_ParticipService.postMarks(res[0]).then(function (response) {
						$scope.Marks.push(response.data);
					});
				}
				
			});
	}
});