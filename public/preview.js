
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
		                    <div class=\"sb-vdo-title\"><a href="preview.html?fileName='+ current.fileName +'"><h3>'+current.title+'<\/h3><\/a><\/div>\
		                    <div class=\"sb-vdo-desc\">' + current.description+ '</div>\
		                    <div class=\"sb-vdo-detail\"><span>|</span>' +current.questionCount +' questions <span>|</span> '+current.watched+'</div>\
		                </div>\
		                <div class="clear"></div>\
		            </div>');

					});
				});
			});
		
		//$(".mainVideoTitle").text("")
	}
	initPopular();
	url = location.search;
	fn = $.query.get('fileName');
	console.log(fn);
	$(".vdo-log .logo").find("img").attr("src","images/"+fn+".jpg");
	ref = firebase.database().ref("/videos/videoList");
	ref.once("value",function(snapshot){
		snapshot.forEach(function(videoSnap){
			if(videoSnap.val().fileName == fn){
				var current= videoSnap.val();
				console.log("FOUND");
				$(".content .heading6 h1").text(current.title);		
				$(".vb-desc").text(current.description);
				$("#views").text(current.watched+" Views");
				$("#questions").text(current.questionCount+" Questions");
				$("#unanswered").text(0 + " UNanswered");
			}
		});
	});
});