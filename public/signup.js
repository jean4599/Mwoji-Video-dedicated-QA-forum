
$( document ).ready(function() { 

	var signupBtn = document.getElementById('signup');

	signupBtn.onclick = function() {
		var email = document.getElementById('inputEmail').value;
		var password = document.getElementById('inputPassword').value;
		
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
			window.location.href = 'welcome.html';
		}).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			alert(errorMessage);
  			// ...
		});


	}

});

