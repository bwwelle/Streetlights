$(document).ready(function () {
	$("#btnSubmitLogin").on("click", function (e) {
		LoginAjaxCall();
	});

	function LoginAjaxCall() {
		$.ajax({
			type : "POST",
			data : {
				"username" : $('#username').val(),
				"password" : $('#password').val()
			},
			url : "/login",
			success : function (data) {
				var test22 = "12";
			}
		});
	}
});
