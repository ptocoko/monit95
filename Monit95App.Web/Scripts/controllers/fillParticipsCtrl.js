angular.module('collectorMarksApp').controller('FillParticipsController', function ($scope, $uibModal, $document, CollectorMarksService) {
	var _schoolId = '';
	var isUpdatingParticip = false;

	var getClassesFromDB = function () {
		CollectorMarksService.getClasses().then(function (response) {
			$scope.classes = response.data;
		},
		function () {
			alert('Ошибка доступа к базе данных классы');
		});
	};

	var getParticips = function (schoolId) {
		CollectorMarksService.getParticips(schoolId).then(function (res) {
			_schoolId = schoolId;
			$scope.particips = res.data;
		},
		function () {
			alert('Ошибка доступа к базе данных участники');
		});
	}

	$scope.init = function (schoolId){
		getParticips(schoolId);
		getClassesFromDB();
	}

	$scope.showParticipModalDialog = function (schoolId, classes, particip) {
		var openModal = $uibModal.open({
			appendTo: angular.element($document[0].querySelector('.container')),
			templateUrl: '/Templates/ParticipModalTemplate.html',
			size: 'mySize',
			controller: function ($scope, $uibModal) {
				$scope.classes = classes;

				if (particip != undefined) {
					$scope.surname = particip.Surname;
					$scope.name = particip.Name;
					$scope.secondName = particip.SecondName;
					$scope.className = particip.ClassName;
				}

				$scope.save = function () {
					var newParticip = {};

					if (particip != undefined) {
						newParticip = {
							Id: particip.Id,
							ProjectCode: '201677',
							SchoolId: schoolId,
							Surname: $scope.surname,
							Name: $scope.name,
							SecondName: $scope.secondName,
							ClassName: $scope.className
						};
					}
					else {
						newParticip = {
							ProjectCode: '201677',
							SchoolId: schoolId,
							Surname: $scope.surname,
							Name: $scope.name,
							SecondName: $scope.secondName,
							ClassName: $scope.className
						};
					}

					openModal.close(newParticip);
				}

				$scope.cancel = function () {
					openModal.dismiss('cancel');
				}
			}
		});

		openModal.result.then(function (particip) {
			if (isUpdatingParticip) {
				CollectorMarksService.updateParticip(particip).then(function () {
					getParticips(_schoolId);
				}, function (message) {
					alert('Something went wrong!\n' + message);
				});
				isUpdatingParticip = false;
			}
			else {
				CollectorMarksService.postParticip(particip).then(function () {
					getParticips(_schoolId);
				}, function (message) {
					alert('alert: Ошибка доступа к базе данных\n' + message);
				});
			}
		}, function () {
			isUpdatingParticip = false;
		});
	};

	$scope.deleteParticip = function (particip) {
		if (confirm('Вы действительно хотите удалить данную запись?')){
			CollectorMarksService.deleteParticip(particip.Id).then(function () {
				$scope.particips.splice($scope.particips.indexOf(particip), 1);
			},
				function (message) {
					alert('Ошибка при удалении участника\nПопробуйте обновить страницу');
				});
		}
		
	}

	$scope.updateParticip = function (particip) {
		isUpdatingParticip = true;
		$scope.showParticipModalDialog(_schoolId, $scope.classes, particip);
	}
});