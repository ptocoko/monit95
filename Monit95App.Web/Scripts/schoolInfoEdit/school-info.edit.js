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

function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function isNumber(number) {
	var regex = /^[0-9\s()-]*$/;
	return regex.test(number);
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
		if (isNumber(phone)) {
			sendRequest('Phone', phone);
		}
		else {
			alert("Неверный формат номера телефона!");
		}
	});
	$("#saveEmail").click(() => {
		var email = $("#EmailInput").val().trim();
		if (isEmail(email)) {
			sendRequest('Email', email);
		}
		else {
			alert("Неверный формат адреса Email!");
		}
	});
})