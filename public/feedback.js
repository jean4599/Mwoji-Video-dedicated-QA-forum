
var url;
var ref;
var fn;
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
	
	
});