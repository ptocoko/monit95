angular.module('collectorMarksApp').factory('CollectorMarksService', function ($http) {
	var service = {};

	service.getClasses = function () {
		return $http.get('/CollectorMarks/GetClasses')
	};

	service.postMarks = function (students) {
		return $http({
			method: 'POST',
			url: '/CollectorMarks/PostData',
			data: students
		});
	};

	service.postParticip = function (particip) {
		return $http({
			method: 'POST',
			url: '/CollectorMarks/PostData',
			data: particip
		});
	}

	return service;
});