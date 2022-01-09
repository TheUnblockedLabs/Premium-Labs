$(document).ready(function () {
	$("#show-password").click(function () {
		$("#password").attr("type", function (index, attr) {
			return attr == "password" ? "text" : "password";
		});
	});
	$(".login-form").submit(function (e) {
		e.preventDefault();
	});
	$("#login").click(async function () {
		if ($("#username").val() == "" || $("#password").val() == "") {
			alert("Please enter your username and password");
		} else {
			let data = await fetch(
				"https://raw.githubusercontent.com/TheUnblockedLabs/important/main/templates/validUsers.json"
			).then((res) => res.json());

			let success = false;
			for (const user in data.validUsers) {
				if (Object.hasOwnProperty.call(data.validUsers, user)) {
					const element = data.validUsers[user];
					console.log(element.user);
					if (
						element.user == $("#username").val() &&
						element.pass == $("#password").val()
					) {
						let html = await fetch(
							"https://raw.githubusercontent.com/TheUnblockedLabs/important/main/templates/main.html"
						).then((res) => res.text());
						window.userData = {
							user: $("#username").val(),
							pass: $("#password").val(),
						};
						$("body").html(html);
						document.title = "Premium Labs - Home";
						success = true;
						break;
					}
				}
			}
			if (!success) {
				alert("Invalid username or password");
			}
		}
	});
});
