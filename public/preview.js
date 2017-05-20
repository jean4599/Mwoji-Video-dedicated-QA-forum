
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
							/*
							console.log(current.title);
							$(".mainVideoTitle").text(current.title);
							$(".mainVideoWatchCount").text("watched:" + current.watched);
							$(".mainVideoQuestionCount").text("# of questions:" + current.questions);
							$(".video-player").find("img").attr("src","images/" + current.fileName+ ".jpg");*/
						}
						$(".sb-video-log").first().before('<div class="sb-vdo-list"">\
							<div class="sb-vdo-thumb">\
							<a href="" ><span><img src="images/'+current.fileName+'.jpg" width=80 height=64></img>'+current.length+'</span></a>\
		                	</div>\
		                	<div class=\"sb-vdo-info\">\
		                    <div class=\"sb-vdo-title\"><a href=\"preview.html\"><h3>'+current.title+'<\/h3><\/a><\/div>\
		                    <div class=\"sb-vdo-desc\">' + current.description+ '</div>\
		                    <div class=\"sb-vdo-detail\"><span>|</span>' +current.questions +' questions <span>|</span> '+current.watched+'</div>\
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