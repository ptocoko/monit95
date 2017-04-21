oneTwoThreeApp.controller('oneTwoThree_participCtrl', function ($scope, $uibModal, $document, OneTwoThree_ParticipService, $rootScope) {
	var _schoolId = '';
    var isUpdatingParticip = false;    

    $scope.$on('$viewContentLoaded', function () {
        $scope.init($rootScope.username)        
    });   

	var getClassesFromDB = function () {
		OneTwoThree_ParticipService.getClasses().then(function (response) {
			$scope.classes = response.data;
		},
		function () {
			alert('Ошибка доступа к базе данных классы');
		});
	};

    $scope.init = function (username) { 
        _schoolId = username;
        getParticips(_schoolId);
        getClassesFromDB();
    }

	var getParticips = function (schoolId) {
        OneTwoThree_ParticipService.getParticips(schoolId).then(function (res) {
			//_schoolId = schoolId;
			$scope.particips = res.data;
		},
		function () {
			alert('Ошибка доступа к базе данных участники');
		});
	}    

    $scope.showParticipModalDialog = function (classes, particip) {
        console.log(_schoolId);
		var openModal = $uibModal.open({
			appendTo: angular.element($document[0].querySelector('.container')),
			templateUrl: '/Templates/AddOrUpdateForm.html',
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
							SchoolId: _schoolId,
							Surname: $scope.surname,
							Name: $scope.name,
							SecondName: $scope.secondName,
							ClassName: $scope.className
						};
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
				OneTwoThree_ParticipService.updateParticip(particip).then(function () {
					getParticips(_schoolId);
				}, function (message) {
					alert('Something went wrong!\n' + message);
				});
				isUpdatingParticip = false;
			}
			else {
				OneTwoThree_ParticipService.postParticip(particip).then(function (response) {					
                    $scope.particips.push(response.data)
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
			OneTwoThree_ParticipService.deleteParticip(particip.Id).then(function () {
				$scope.particips.splice($scope.particips.indexOf(particip), 1);
			},
				function (message) {
					alert('Ошибка при удалении участника\nПопробуйте обновить страницу');
				});
		}
		
	}

	$scope.updateParticip = function (particip) {
		isUpdatingParticip = true;
		$scope.showParticipModalDialog($scope.classes, particip);
	}
});