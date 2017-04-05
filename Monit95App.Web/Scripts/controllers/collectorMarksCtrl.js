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
	
	$scope.marks = [];

	$scope.pushMarks = function (schoolId) {


		$scope.marks.push({
			SchoolId: schoolId,
			Surname: $scope.Surname,
			Name: $scope.Name,
			SecondName: $scope.SecondName,
			ClassId: $scope.class,
			Marks: makeStringFromMarks()
		});

		resetScopes();
	};

	var makeStringFromMarks = function () {
		var endOfMarksString = "|1;1;1;1;1;1;1;1;1;1";

		return  $scope.firstMark + ";" +
				$scope.secondMark + ";" +
				$scope.thirdMark + ";" +
				$scope.fourthMark + ";" +
				$scope.fifthMark + ";" +
				$scope.sixthMark + ";" +
				$scope.seventhMark + ";" +
				$scope.eighthMark + ";" +
				$scope.ninthMark + ";" +
				$scope.tenthMark + endOfMarksString;
	};

	$scope.makeArrayFromStringMarks = function (marksString) {
		var arr = marksString.split("|");
		return arr[0].split(";");
	};

	var resetScopes = function () {
		$scope.Surname = "";
		$scope.Name = "";
		$scope.SecondName = "";

		$scope.firstMark = "";
		$scope.secondMark = "";
		$scope.thirdMark = "";
		$scope.fourthMark = "";
		$scope.fifthMark = "";
		$scope.sixthMark = "";
		$scope.seventhMark = "";
		$scope.eighthMark = "";
		$scope.ninthMark = "";
		$scope.tenthMark = "";
	};

	$scope.sendMarks = function () {
		if ($scope.marks.length < 1) {
			$scope.errorMessage = 'Push items before';
		}
		else {
			var data = [];

			$scope.marks.forEach(function (item, i, arr) {
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