angular.module('collectorMarksApp').controller('CollectorMarksCtrl', function ($scope, $http, CollectorMarksService) {
	
	$scope.classes = [
		{
			Id: "0100", Name: "1"
		},
		{
			Id: "0101", Name: "1A"
		},
		{
			Id: "0102", Name: "1Б"
		},
		{
			Id: "0103", Name: "1В"
		},
		{
			Id: "0104", Name: "1Г"
		},
		{
			Id: "0105", Name: "1Д"
		},
		{
			Id: "0106", Name: "1Е"
		},
		{
			Id: "0200", Name: "2"
		},
		{
			Id: "0201", Name: "2А"
		},
		{
			Id: "0202", Name: "2Б"
		},
		{
			Id: "0203", Name: "2В"
		},
		{
			Id: "0204", Name: "2Г"
		},
	];

	$scope.exercises = [
		{
			Name: '1',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '2',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '3',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '4',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '5',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '6',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '7',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '8',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '9',
			MaxRate: 1,
			CurrentMark: ''
		},
		{
			Name: '10',
			MaxRate: 1,
			CurrentMark: ''
		}
	];

	$scope.Students = [];

	$scope.pushMarks = function (schoolId) {
		var marks = $scope.exercises;

		$scope.Students.push({
			SchoolId: schoolId,
			Surname: $scope.Surname,
			Name: $scope.Name,
			SecondName: $scope.SecondName,
			ClassId: $scope.class,
			Exercises: marks
		});

		resetScopes();
	};

	

	var resetScopes = function () {
		$scope.Surname = "";
		$scope.Name = "";
		$scope.SecondName = "";

		$scope.exercises.forEach(function (item, i, arr) {
			if (i < 8) {
				arr[i].CurrentMark = '';
			}
		});
	};

	$scope.sendMarks = function () {
		if ($scope.Students.length < 1) {
			$scope.errorMessage = 'Push items before';
		}
		else {
			var data = [];

			$scope.Students.forEach(function (item, i, arr) {
				data.push($.param(arr[i]));
			});

			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			}

			$http.post('/CollectorMarks/PostData', data, config).then(function (response) {

			});
		}
	};
});