
$( document ).ready(function() { 

	var signinBtn = document.getElementById('signin');
	
	signinBtn.onclick = function() {
		//alert('signin')
		var email = document.getElementById('inputEmail').value;
		var password = document.getElementById('inputPassword').value;

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			if (errorCode == 'auth/invalid-email') {
  				alert("Enter a valid email");
  			}
  			// ...
		});
		
	}
	
	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
    		// User is signed in.
    		var email = user.email;
    		email = email.toString();
			window.location.href = 'choosevideo.html?id=' + email;

  		} else {
    		// No user is signed in.
  		}
	});


});

