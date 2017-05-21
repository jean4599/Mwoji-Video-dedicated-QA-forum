
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
    		var cname = "username";
        var cvalue = email;
        
        window.location.href = 'choosevideo.html?id=' + email;

  		} else {
    		// No user is signed in.
  		}
	});


});

