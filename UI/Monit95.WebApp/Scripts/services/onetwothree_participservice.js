oneTwoThreeApp.factory('OneTwoThree_ParticipService', function ($http) {
	var service = {};

	service.getClasses = function () {
		return $http.get('/api/Class/Get');
	};

	service.getParticips = function (schoolId) {
		return $http.get('/api/ProjectParticipV2/GetBySchoolId/' + schoolId);
	}

	service.getMarks = function (schoolId) {
		return $http({
			method: 'GET',
			url: '/api/ExerciseMarks/GetMarksBySchoolId/' + schoolId
		});
	}

	service.getMaxRates = function () {
		return $http({
			method: 'GET',
			url: '/api/ExerciseMarks/GetMaxRates'
		});
	}

	service.postMarks = function (marks) {
		return $http({
			method: 'POST',
			url: '/api/ExerciseMarks/Post',
			data: marks
		});
	};

	service.updateMarks = function (marks) {
		return $http({
			method: 'PUT',
			url: '/api/ExerciseMarks/Update',
			data: marks
		});
	}

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

	service.updateParticip = function (particip) {
		return $http({
			method: 'PUT',
			url: '/api/ProjectParticipV2/Update',
			data: particip
		});
	}

	service.getReport = function (schoolId, participId) {
		return $http({
			method: 'GET',
			url: '/api/OneTwoThreeReport/GetReport?schoolId=' + schoolId + '&participId=' + participId
		});
	}

	return service;
});