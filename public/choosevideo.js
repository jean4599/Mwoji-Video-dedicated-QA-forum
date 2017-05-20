var fileName;
var ref;
var maxViewed ="psy";

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
	function init(){
		ref = firebase.database().ref("/videos/");
		
		firebase.database().ref("/videos/").on("value",function(snapshot){
			maxViewed = snapshot.val().maxViewed;
			console.log("max: " + maxViewed);
		});
		ref = firebase.database().ref("/videos/videoList");
		ref.on("value",function(snapshot){
			snapshot.forEach(function(videoSnap){
				var current = videoSnap.val();
				console.log("current:" + current.fileName);
				if(current.fileName == maxViewed){
					console.log(current.title);
					$(".mainVideoTitle").text(current.title);
					$(".mainVideoWatchCount").text("watched:" + current.watched);
					$(".mainVideoQuestionCount").text("# of questions:" + current.questionCount);
					$(".video-player").find("img").attr("src","images/" + current.fileName+ ".jpg");
				}
				$(".videoList .heading").after('<div class=\"vdo-list\"><div class=\"vdo-thumb\">\
					<a href="" ><span><img src="images/'+current.fileName+'.jpg" width=125 height=100></img>'+current.length+'</span></a>\
                	</div>\
                	<div class=\"vdo-info\">\
                    <div class=\"vdo-title\"><a href="preview.html?fileName='+current.fileName+'"><h3>'+current.title+'<\/h3><\/a><\/div>\
                    <div class=\"vdo-desc\">' + current.description+ '</div>\
                    <div class=\"vdo-detail\">10 minutes ago <span>|</span>' +current.questionCount +' questions <span>|</span> '+current.watched+' views</div>\
                </div>\
                <div class="clear"></div>\
            </div>');

			});
		});
			
		
		//$(".mainVideoTitle").text("")
	}
	init();
});