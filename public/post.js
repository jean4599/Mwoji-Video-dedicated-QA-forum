var UserID;
var fileName;
var REF_question;
var question_num = 0;
var cx1, cx2, cy1, cy2;
$( document ).ready(function() {
	
	var videoName;
	var posts=[];
	var videoTimeStamp;
	//Kamil starts
	UserID = $.query.get('id');
	fileName = $.query.get('fileName');
	$(".userName").text(UserID.split("@")[0]);
	$(".personal").each(function(){
		var link = $(this).attr("href");
		$(this).attr("href",link+"id="+UserID);
	});
	$(".sourceVideo").attr("src","./assets/" + fileName + ".mp4");
	$(".video").load();
	console.log("./assets/" + fileName + ".mp4");
	firebase.database().ref('videos/videoList/').once("value",function(snapshot){
		snapshot.forEach(function(videoSnap){
			if(videoSnap.val().fileName == fileName){
				videoName = videoSnap.key;
				REF_question = 'videos/videoList/'+videoName+'/questions';
			}
		});
		initPost();
			
	});

    $('#myVideo').click(function() {
        this.paused ? this.play() : this.pause();
    });

	$('#post-btn').on('click',function(){
		$('#ask').toggleClass('hide');
		$('#overview').toggleClass('hide');
		cx1 = 0; cx2 = 0; cy1 = 0; cy2 = 0;
		$('#drawhere').css('display', 'inline');
	})

	$('#video-canvas').mouseover(function(e) {
		$(".hova").removeClass("hova");     
    	$(e.target).addClass("hova");
    	$("#drawhere").css('opacity', 0.2);
  		return false;
	}).mouseout(function(e) {
    	$(this).removeClass("hova");
    	$("#drawhere").css('opacity', 1);
	});

	$('#cancel-post-btn').on('click', function(){
		$('#ask').toggleClass('hide');
		$('#overview').toggleClass('hide');
		$('#drawhere').css('display', 'none');
	})
	$('#posts').on('click','.time-btn',function(){
		var time = $(this).parents('.post').attr('time');
		console.log(time)
		video.currentTime = time
	})
	$('#submit-post-btn').on('click', function(){

		//get video timestamp at the time that post is clicked
		videoTimeStamp = document.getElementById("myVideo").currentTime;
		
		const question = document.getElementById('question').value;
		const discription = document.getElementById('discription').value;
		const timestamp = getTimeStamp()
		const circlePosition = { 
			x1: cx1,
			y1: cy1,
			x2: cx2,
			y2: cy2
		}
		const post = {
			question: question,
			discription: discription,
			postTime: timestamp,
			videoTime: videoTimeStamp,
			circlePosition: circlePosition,
			UserID: UserID
		}
		console.log('New Post:')
		console.log(post)

		savePost(post);

		$('#ask').toggleClass('hide');
		$('#overview').toggleClass('hide');
		document.getElementById('question').value='';
		document.getElementById('discription').value='';
		$('#drawhere').css('display', 'none');
	})
	$("#seeall").on('click',function(){
		console.log("ON");
		$(".panel-default").show();
		$("#post-template").hide();
	})
	$("#seemine").on('click',function(){
		console.log("MY");
		$(".panel-default").each(function(){
			console.log(this);
			if($(this).attr("UserID") == UserID)
				$(this).show();	
			else
				$(this).hide();
		});

	})
	$("#list-view").on('click', function(){
		console.log('show list')
		$(".left").removeClass('col-md-12').addClass('col-md-4');
	})
	$("#grid-view").on('click', function(){
		console.log('show grid')
		$(".left").removeClass('col-md-4').addClass('col-md-12');
	})


	var video = document.getElementById("myVideo");
	var x;
	var currentVideoTime;
	var cor = $('#posts').offset().top;
	video.onplay = function(){
		//console.log('v')
		x=window.setInterval(function() {
			currentVideoTime = video.currentTime;
			for(var i=0; i<posts.length-1; i++){
				if( currentVideoTime+1 > posts[i].videoTime &&
					posts[i].videoTime > currentVideoTime-1){
					//console.log(posts[i])
					$('#'+posts[i].id).addClass("highlight")
					// $('#posts').animate({
	    //                 scrollTop: $('#'+posts[i].id).offset().top-cor
	    //             }, 1000);		
				}
				else {
					$('#'+posts[i].id).removeClass("highlight")
				}
			}
		},100);
	}
	video.onpause = function(){
		window.clearInterval(x);
	}
	video.onended = function(){
		clearInterval(x);
	}
	function savePost(post){
		console.log('Firebase save: ')
		console.log(post)
		firebase.database().ref(REF_question).push(post)
	}

	function initPost(){
		firebase.database().ref(REF_question).orderByChild('videoTime').on('value', function(snapshot){
			var result = snapshot.val();
			if(snapshot.numChildren() != question_num){
				question_num = snapshot.numChildren();

				clearAllPost();
				//clearAllScreenshot();
				snapshot.forEach(function(postSnap){
					let post = postSnap.val();
					post.id = postSnap.key;
					posts.push(post)
					renderPost(post)
				})
				// posts = Object.keys(result).map(key =>{
				// 	result[key].key = key;
				// 	renderPost(result[key])
				// 	return result[key];
				// })
				//console.log(posts)
				getVideoScreenShot(posts, posts.length-1)
			}
		})
	}
	function clearAllScreenshot() {
		$('#testposition').children().remove();
	}
	function clearAllPost(){
		posts=[]
		$('#posts').children().remove();
	}
	function renderPost(post){
		var all_answer = toArray(post.answers);

		all_answer.sort(function(a, b) {
		    return a['likeCount'] - b['likeCount'];
		});

		var newPost = $('#post-template').clone();
		newPost.find('.question').html(post.question);
		newPost.find('.time-label').html(secToHHMMSS(post.videoTime))
		newPost.attr('id', post.id);
		newPost.find('.description').html(post.discription);
		newPost.attr('time', post.videoTime)
		newPost.attr('UserID', post.UserID)		
		
		$('#posts').append(newPost);

		if(all_answer.length>0){
			//Best answer
			console.log(all_answer[0].answer)
			$('#'+post.id).find('.top-answer').html(all_answer[0].answer)
			//All answers
			for(var ans in all_answer){
				renderAnswer(all_answer[ans], post.id);
			}
		}
	}
	function renderAnswer(answer, postId){
		var like = '<div class="rating-container"><i class="like-btn material-icons">thumb_up</i><span class="count">'+(-answer.likeCount)+'</span></div>';
		var ele ='<li class="list-group-item answer" id="'+answer.key+'">'+answer.answer+like+'</li>'
		
		$('#'+postId).find('.answers').append(ele)
	}
	function secToHHMMSS(sec){
		var hours   = Math.floor(sec / 3600);
	    var minutes = Math.floor((sec - (hours * 3600)) / 60);
	    var seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    return hours+':'+minutes+':'+seconds;
	}
	function getTimeStamp(){
		var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        return datetime;
	}
	function getVideoScreenShot(posts, i, canvas_id="myCanvas", width=200, height=150){
		if (i < 0) {
			return;
		}
		console.log('video screenshot')
		var video = document.getElementById("hiddenVideo");
		var cnvs;
		var curtime = video.currentTime;

		video.currentTime = posts[i].videoTime;
		video.onseeked = function() {
		var cnvs = document.createElement("canvas");
		var context = cnvs.getContext("2d");
		context.drawImage(video, 0, 0, 300, 150);
		cnvs.id = canvas_id
		cnvs.style.width = width;
		cnvs.style.height = height;

		// Draw circle
		drawEllipse(context, posts[i].circlePosition.x1, posts[i].circlePosition.y1, posts[i].circlePosition.x2, posts[i].circlePosition.y2);

		// Append "cnvs" into the html (where you want)
		var post = document.getElementById(posts[i].id);
		$(post).find('.screenshot').append(cnvs);

		video.currentTime = curtime;
		video.onseeked = null;
		getVideoScreenShot(posts, i-1)
		}
	}
	function toArray(obj) {
	  if (!obj) return []

	  var arr = Object.keys(obj).map(function (key, index) { 
	    var result  = clone(obj[key]);
	    if(typeof(result)==='object'){
	      result.key = key
	    }
	    return result; 
	  });
	  return arr
	}
	function clone(obj) {
	    if (null === obj || "object" !== typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}
})
