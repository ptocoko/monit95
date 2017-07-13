const apiUrl = '/api/SchoolInfoEdit/Update'
var schoolId = '';

function showEditing(editVal) {
	$("#" + editVal + "Div").hide();
	$("#" + editVal +"Input").show();
	$("#save" + editVal).show();
	$("#cancel" + editVal).show();

	$("#editName").hide();
	$("#editPhone").hide();
	$("#editEmail").hide();
}

function hideEditing(editVal) {
	$("#" + editVal + "Div").show();
	$("#" + editVal + "Input").hide();
	$("#save" + editVal).hide();
	$("#cancel" + editVal).hide();

	$("#editName").show();
	$("#editPhone").show();
	$("#editEmail").show();
}

function sendRequest(valToEdit, obj) {
	$.ajax({
		url: apiUrl + valToEdit + '?' + valToEdit+'=' + obj + '&schoolId=' + schoolId.trim(),
		method: 'PUT',
		success: function (data) {
			$("#"+valToEdit+"Div").text(obj);
			hideEditing(valToEdit);
		},
		error: function (error) {
			//TODO: handle error!
		}
	})
}

$().ready(() => {
	schoolId = $("#schoolId").html();

	$("#editName").click(() => showEditing('Name'));
	$("#editPhone").click(() => showEditing('Phone'));
	$("#editEmail").click(() => showEditing('Email'));

	$("#cancelName").click(() => hideEditing('Name'));
	$("#cancelPone").click(() => hideEditing('Phone'));
	$("#cancelEmail").click(() => hideEditing('Email'));

	$("#saveName").click(() => {
		var name = $("#NameInput").val().trim();
		sendRequest('Name', name);
	});
	$("#savePhone").click(() => {
		var phone = $("#PhoneInput").val().trim();
		sendRequest('Phone', phone);
	});
	$("#saveEmail").click(() => {
		var name = $("#EmailInput").val().trim();
		sendRequest('Email', name);
	});
})