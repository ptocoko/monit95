angular.module('collectorMarksApp').factory('CollectorMarksService', function ($http) {
	var service = {};

	service.getClasses = function () {
		return $http.get('/api/Class/Get');
	};

	service.getParticips = function (schoolId) {
		return $http.get('/api/ProjectParticipV2/GetBySchoolId/' + schoolId);
	}

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
			url: '/api/ProjectParticipV2/Post',
			data: particip
		});
	}

	service.deleteParticip = function (id) {
		return $http({
			method: 'DELETE',
			url: '/api/ProjectParticipV2/Delete/' + id
		});
	}

	return service;
});