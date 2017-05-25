var fileName;
var ref;
var maxViewed ="psy";
var UserID;
$(document).ready(function(){
	$(".sidebox-image").click(function(){
		alert("it worksss!");
	})
	$(document).on('mouseenter', '.sidebox-image', function() {
   		$('html,css').css('cursor','pointer');
	});
	$(document).on('mouseleave', '.sidebox-image', function() {
		$('html,css').css('cursor','default');
	});
	$(".submitButton").click(function(){
		alert("Contructing...");
	});
	document.getElementById('logout').onclick = function() {
		firebase.auth().signOut().then(function() {
				// Sign-out successful.
				window.location.href = "index.html";
		}).catch(function(error) {
			// An error happened.
		});
	}
	function init(){
		
	}
	init();
	UserID = $.query.get('id');
	$(".userName").text(UserID.split("@")[0]);
	$(".personal").each(function(){
		var link = $(this).attr("href");
		$(this).attr("href",link+"id="+UserID);
	});
});