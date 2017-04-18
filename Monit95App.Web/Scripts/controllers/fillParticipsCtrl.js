angular.module('collectorMarksApp').controller('FillParticipsController', function ($scope, $uibModal, $document, CollectorMarksService) {
	var _schoolId = '';

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

	$scope.showParticipModalDialog = function (schoolId, classes) {
		var openModal = $uibModal.open({
			appendTo: angular.element($document[0].querySelector('.container')),
			templateUrl: '/Templates/ParticipModalTemplate.html',
			size: 'mySize',
			controller: function ($scope, $uibModal) {
				$scope.classes = classes;

				$scope.save = function () {

					openModal.close({
						ProjectCode: '201677',
						SchoolId: schoolId,
						Surname: $scope.surname,
						Name: $scope.name,
						SecondName: $scope.secondName,
						ClassName: $scope.className
					});
				}

				$scope.cancel = function () {
					openModal.dismiss('cancel');
				}
			}
		});

		openModal.result.then(function (particip) {
			CollectorMarksService.postParticip(particip).then(function () {
				getParticips(_schoolId);
			}, function (message) {
				alert('alert: Ошибка доступа к базе данных\n' + message);
			});
			
		});
	};

	$scope.deleteParticip = function (particip) {
		if (confirm('Вы действительно хотите удалить данную запись?')){
			CollectorMarksService.deleteParticip(particip.Id).then(function () {
				$scope.particips.splice($scope.particips.indexOf(particip), 1);
			},
				function (message) {
					alert('Ошибка при удалении участника\n' + message);
				});
		}
		
	}
});