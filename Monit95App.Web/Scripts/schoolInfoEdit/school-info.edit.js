const apiUrl = '/api/SchoolInfoEdit/Update';

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
	$("#" + editVal + "Div").parent().removeClass('has-error');
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

function sendRequest(nameOfVal, val) {
	$.ajax({
		url: apiUrl + nameOfVal + '?' + nameOfVal + '=' + val,
		method: 'PUT',
		success: function () {
			location.reload();
			//$("#" + nameOfVal +"Div").text(val);
			//hideEditing(nameOfVal);
		},
		error: function (request, status, error) {
			var errorMessage = request.responseJSON.Message ? request.responseJSON.Message : request.responseText;
			alert('Ошибка сервера! Пожалуйста, обратитесь к администратору\n\n' + error + ' - ' + errorMessage);
		}
	})
}

$().ready(() => {
	$("#editName").click(() => showEditing('Name'));
	$("#editPhone").click(() => showEditing('Phone'));
	$("#editEmail").click(() => showEditing('Email'));

	$("#cancelName").click(() => hideEditing('Name'));
	$("#cancelPhone").click(() => hideEditing('Phone'));
	$("#cancelEmail").click(() => hideEditing('Email'));

	$("#saveName").click(() => {
		var name = $("#NameInput").val().trim();
		sendRequest('Name', name);
	});
	$("#savePhone").click(() => {
		var phone = $("#PhoneInput").val().trim();
		if (isNumber(phone)) {
			$('#PhoneInput').parent().removeClass('has-error')
			sendRequest('Phone', phone);
		}
		else {
			$('#PhoneInput').parent().addClass('has-error')
			alert("Неверный формат номера телефона!");
		}
	});
	$("#saveEmail").click(() => {
		var email = $("#EmailInput").val().trim();
		if (isEmail(email)) {
			$('#EmailInput').parent().removeClass('has-error')
			sendRequest('Email', email);
		}
		else {
			$('#EmailInput').parent().addClass('has-error')
			alert("Неверный формат адреса Email!");
		}
	});
})