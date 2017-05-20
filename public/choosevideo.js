
$(document).ready(function(){
	function initPopular(){
		var fileName;
		var ref = firebase.database().ref("/videos/");
		var maxViewed ="psy";
		$.when(ref.on("value",function(snapshot){
				maxViewed = snapshot.val().maxViewed;
				console.log("max: " + maxViewed);
			})).then(function(){
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
		                    <div class=\"vdo-detail\">10 minutes ago <span>|</span>' +current.questionCount +' questions <span>|</span> '+current.watched+'</div>\
		                </div>\
		                <div class="clear"></div>\
		            </div>');

					});
				});
			});
		
		//$(".mainVideoTitle").text("")
	}
	initPopular();
});