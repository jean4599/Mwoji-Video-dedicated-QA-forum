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