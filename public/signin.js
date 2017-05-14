
$( document ).ready(function() { 

	var signinBtn = document.getElementById('signin');
	var user = firebase.auth().currentUser;
	if (user != null) {
		window.location.href = 'video.html';
	}
	signinBtn.onclick = function() {
		var email = document.getElementById('inputEmail').value;
		var password = document.getElementById('inputPassword').value;

		firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
			window.location.href = 'video.html';
		}).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			alert(errorMessage);
  			// ...
		});
		
	}


});

