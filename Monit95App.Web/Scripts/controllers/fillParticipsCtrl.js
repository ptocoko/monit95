angular.module('collectorMarksApp').controller('FillParticipsController', function ($scope, $uibModal, $document, CollectorMarksService) {
	var getClasses = function () {
		//CollectorMarksService.getClasses().then(function (response) {
		//	$scope.classes = response.data;
		//},
		//function () {
		//	alert('Ошибка доступа к базе данных');
		//});

		$scope.classes =  [
			{
				Id: '0100',
				Name: '1'
			},
			{
				Id: '0101',
				Name: '1 A'
			},
			{
				Id: '0102',
				Name: '1 Б'
			},
			{
				Id: '0103',
				Name: '1 В'
			},
			{
				Id: '0104',
				Name: '1 Г'
			},
			{
				Id: '0200',
				Name: '2'
			},
			{
				Id: '0201',
				Name: '2 А'
			},
			{
				Id: '0202',
				Name: '2 Б'
			},
			{
				Id: '0203',
				Name: '2 В'
			},
			{
				Id: '0204',
				Name: '2 Г'
			},
			{
				Id: '0300',
				Name: '3'
			},
			{
				Id: '0301',
				Name: '3 А'
			},
			{
				Id: '0302',
				Name: '3 Б'
			},
			{
				Id: '0303',
				Name: '3 В'
			},
			{
				Id: '0304',
				Name: '3 Г'
			},
		]; 
	};
	getClasses();

	$scope.particips = [];

	$scope.showParticipModalDialog = function (schoolId, classes) {
		var openModal = $uibModal.open({
			appendTo: angular.element($document[0].querySelector('.container')),
			templateUrl: '/Templates/ParticipModalTemplate.html',
			size: 'mySize',
			controller: function ($scope, $uibModal) {
				$scope.classes = classes;

				$scope.save = function () {

					openModal.close({
						SchoolId: schoolId,
						Surname: $scope.surname,
						Name: $scope.name,
						SecondName: $scope.secondName,
						ClassId: $scope.classId
					});
				}

				$scope.cancel = function () {
					openModal.dismiss('cancel');
				}
			}
		});

		openModal.result.then(function (particip) {
			CollectorMarksService.postParticip(particip).then(function () {

			}, function () {
				alert('Ошибка доступа к базе данных');
			});
			$scope.particips.push(particip);//TODO: вызвать после удачного запроса
		});
	};

	$scope.getClassNameFromId = function (Id) {
		var name='';
		$scope.classes.forEach(function (item, i, arr) {
			if (item.Id === Id) {
				name = item.Name;
			}
		});
		return name;
	};

});