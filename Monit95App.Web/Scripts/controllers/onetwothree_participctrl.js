oneTwoThreeApp.controller('oneTwoThree_participCtrl', function ($scope, $uibModal, $document, OneTwoThree_ParticipService, $rootScope) {
	var _schoolId = '';
    var isUpdatingParticip = false;    
	
	$scope.showingDelBtn = {};
	$scope.showingAddBtn = false;

    $scope.$on('$viewContentLoaded', function () {
        $scope.init($rootScope.username)        
    });   
	
    $scope.init = function (username) { 
        _schoolId = username;
        getParticips(_schoolId);
    }

	var getParticips = function (schoolId) {
        OneTwoThree_ParticipService.getParticips(schoolId).then(function (res) {
			$scope.particips = res.data;

			OneTwoThree_ParticipService.getClasses().then(function (response) {
				$scope.classes = response.data;
				$scope.showingAddBtn = true;
			},
			function () {
				alert('Ошибка доступа к базе данных.\nПроверьте подключение к интернету и повторите попытку');
			});
		},
		function () {
			alert('Ошибка доступа к базе данных.\nПроверьте подключение к интернету и повторите попытку');
		});
	}   

    $scope.showParticipModalDialog = function (classes, particips, particip) {
		var openModal = $uibModal.open({
			appendTo: angular.element($document[0].querySelector('.container')),
			templateUrl: '/Templates/AddOrUpdateForm.html',
			size: 'mySize',
			controller: function ($scope, $uibModal, OneTwoThree_ParticipService) {
				$scope.saveBtnActive = false;
				$scope.statusText = '';
				$scope.isErrorText = false;
				$scope.classes = classes;

				if (particip != undefined) {
					$scope.surname = particip.Surname;
					$scope.name = particip.Name;
					$scope.secondName = particip.SecondName;
					$scope.className = particip.ClassName;
				}

				$scope.save = function () {
					$scope.saveBtnActive = true;
					var newParticip = {};

					function checkFIO(participToCheck) {
						var checkingFIO = participToCheck.Surname.trim().toUpperCase() + participToCheck.Name.trim().toUpperCase() + participToCheck.SecondName.trim().toUpperCase();

						var isExist = false;
						particips.forEach(function (item, i, arr) {
							var participFIO = item.Surname.trim().toUpperCase() + item.Name.trim().toUpperCase() + item.SecondName.trim().toUpperCase();

							if (participFIO === checkingFIO && item.ClassName.trim() === participToCheck.ClassName.trim()) {
								isExist = true;
							}
						});
						return isExist;
					}

					if (particip != undefined) {
						newParticip = {
							Id: particip.Id,
							ProjectCode: '201677',
							SchoolId: _schoolId,
							Surname: $scope.surname,
							Name: $scope.name,
							SecondName: $scope.secondName,
							ClassName: $scope.className
						};
						if (!checkFIO(newParticip)) {
							$scope.statusText = 'Данные обновляются...';
							OneTwoThree_ParticipService.updateParticip(newParticip).then(function () {
								openModal.close();
								$scope.saveBtnActive = false;
							}, function (message) {
								$scope.statusText = 'Ошибка при обновлении данных. Проверьте подключение к интернету и повторите попытку';
								$scope.isErrorText = true;
								$scope.saveBtnActive = false;
							});
						}
						else {
							$scope.statusText = 'Ошибка! Такое ФИО уже существует в базе данных';
							$scope.isErrorText = true;
							$scope.saveBtnActive = false;
						}
					}
					else {
						newParticip = {
							ProjectCode: '201677',
							SchoolId: _schoolId,
							Surname: $scope.surname,
							Name: $scope.name,
							SecondName: $scope.secondName,
							ClassName: $scope.className
						};
						if (!checkFIO(newParticip)) {
							$scope.statusText = 'Данные добавляются...';
							OneTwoThree_ParticipService.postParticip(newParticip).then(function (response) {
								openModal.close(response.data);
							}, function (message) {
								$scope.statusText = 'Ошибка при добавлении данных. Проверьте подключение к интернету и повторите попытку';
								$scope.isErrorText = true;
								$scope.saveBtnActive = false;
							});
						}
						else {
							$scope.statusText = 'Ошибка! Такое ФИО уже существует в базе данных';
							$scope.isErrorText = true;
							$scope.saveBtnActive = false;
						}
					}
				}

				$scope.cancel = function () {
					openModal.dismiss('cancel');
				}
			}
		});

		openModal.result.then(function (particip) {
			if (particip != undefined) {
				$scope.particips.push(particip);
			}
			else {
				getParticips(_schoolId);
			}
		}, function () {
			//isUpdatingParticip = false;
		});
	};

	$scope.deleteParticip = function (particip) {
		$scope.showingDelBtn[particip.Id] = false;
		if (confirm('Вы действительно хотите удалить данного участника?')){
			OneTwoThree_ParticipService.deleteParticip(particip.Id).then(function () {
				$scope.showingDelBtn[particip.Id] = true;
				$scope.particips.splice($scope.particips.indexOf(particip), 1);
			},
			function (message) {
				alert('Ошибка при удалении участника\nПроверьте подключение к интернету и обновите страницу');
				$scope.showingDelBtn[particip.Id] = true;
			});
		}
		else {
			$scope.showingDelBtn[particip.Id] = true;
		}
	}

	$scope.updateParticip = function (particip) {
		isUpdatingParticip = true;
		$scope.showParticipModalDialog($scope.classes, $scope.particips, particip);
	};

	$scope.showReport = function (particip) {
		var openReportModal = $uibModal.open({
			size: 'reportSize',
			templateUrl: '/Templates/onetwothree_report_form.html',
			controller: function ($scope, $uibModal, OneTwoThree_ParticipService) {
				$scope.fullName = particip.Surname + ' ' + particip.Name + ' ' + particip.SecondName;

				OneTwoThree_ParticipService.getReport(particip.SchoolId, particip.Id).then(function (res) {
					$scope.report = res.data;
				}, function () {
					openReportModal.close();
					alert('Something went wrong');
				});

				$scope.getColorFromGradeStr = function (gradeStr) {
					if (gradeStr === 'Уровень ниже базового')
						return 'low-grade';
					else if (gradeStr === 'Уровень базовой подготовки')
						return 'medium-grade';
					else if (gradeStr === 'Уровень прочной базовой подготовки')
						return 'high-grade';
					else if (gradeStr === 'Повышенный уровень')
						return 'higher-grade';
				};

				$scope.close = function () {
					openReportModal.close();
				}
			}
		})
	}
});