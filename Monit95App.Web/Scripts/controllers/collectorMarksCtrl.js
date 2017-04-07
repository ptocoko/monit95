angular.module('collectorMarksApp').controller('CollectorMarksCtrl', function ($scope, $http, CollectorMarksService) {
	
	
	var getClasses = function () {
		CollectorMarksService.getClasses().then(function (response) {
			$scope.classes = response.data;
		},
		function () {
			alert('Ошибка доступа к базе данных');
		});
	};
	getClasses();

	var getInstanceOfExercises = function () {
		return [
			{
				Name: '1',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '2',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '3',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '4',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '5',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '6',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '7',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '8',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '9.1',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '9.2',
				MaxRate: '1',
				CurrentMark: ''
			},
			{
				Name: '10',
				MaxRate: '1',
				CurrentMark: ''
			}
		];
	};

	$scope.exercises = getInstanceOfExercises();

	$scope.Students = [];
	
	$scope.pushMarks = function (schoolId) {
		
		$scope.Students.push({
			SchoolId: schoolId,
			Surname: $scope.Surname,
			Name: $scope.Name,
			SecondName: $scope.SecondName,
			ClassName: $scope.class,
			Exercises: $scope.exercises
		});

		resetScopes();

		angular.element('#setFocusHere').focus();
	};

	

	var resetScopes = function () {
		$scope.Surname = "";
		$scope.Name = "";
		$scope.SecondName = "";

		$scope.exercises = getInstanceOfExercises();
	};

	$scope.sendMarks = function (students) {
		if ($scope.Students.length > 0) {
			if (confirm('Вы уверены в своих действиях?\nДанные нельзя будет редактировать в последующем!')) {

				CollectorMarksService.postMarks(students).then(function success(res) {
					resetScopes();
					$scope.Students = [];
					$scope.class = '';
					alert('Оценки ваших учеников отправлены удачно :)')//ИЗМЕНИТЬ ОБЯЗАТЕЛЬНО!!!

				}, function error(res) {
					alert('К сожалению произошла ошибка. Попробуйте повторить отправку через несколько минут.');
				});
			}
		}
		else {
			alert('Сначала добавьте чё нить');//ИЗМЕНИТЬ ОБЯЗАТЕЛЬНО!!!
		}
	};
});