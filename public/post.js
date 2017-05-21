var UserID;
var fileName;
$( document ).ready(function() {
	
	const videoName = 'video2';
	const REF_question = 'videos/videoList/'+videoName+'/questions';
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
	console.log("./assets/" + fileName + ".mp4");
	//Kamil ends
	initPost();

	$('#post-btn').on('click',function(){
		$('#ask').toggleClass('hide');
		$('#overview').toggleClass('hide');
		//get video timestamp at the time that post is clicked
		videoTimeStamp = document.getElementById("myVideo").currentTime;
	})
	$('#cancel-post-btn').on('click', function(){
		$('#ask').toggleClass('hide');
		$('#overview').toggleClass('hide');
	})
	$('#submit-post-btn').on('click', function(){
		const question = document.getElementById('question').value;
		const discription = document.getElementById('discription').value;
		const timestamp = getTimeStamp()
		const post = {
			question: question,
			discription: discription,
			postTime: timestamp,
			videoTime: videoTimeStamp,
		}
		console.log('New Post:')
		console.log(post)

		savePost(post);

		$('#ask').toggleClass('hide');
		$('#overview').toggleClass('hide');
		document.getElementById('question').value='';
		document.getElementById('discription').value='';
	})

	function savePost(post){
		console.log('Firebase save: ')
		console.log(post)
		firebase.database().ref(REF_question).push(post)
	}

	function initPost(){
		firebase.database().ref(REF_question).on('value', function(snapshot){
			var result = snapshot.val();
			if(result){
				clearAllPost();
				//clearAllScreenshot();
				posts = Object.keys(result).map(key =>{
					result[key].key = key;
					renderPost(result[key])
					return result[key];
				})
				console.log(posts)
				getVideoScreenShot(posts, posts.length-1)
			}
		})
	}
	function clearAllScreenshot() {
		$('#testposition').children().remove();
	}
	function clearAllPost(){
		$('#posts').children().remove();
	}
	function renderPost(post){

		var newPost = "<div class='panel panel-default' id='"+post.key+"'>"+
		          "<div class='panel-heading'>"+
		            "<h3 class='panel-title'>"+post.question+
		          "</h3></div>"+
		          "<div class='panel-body'>"+
		            post.discription+
		          "</div></div>";
		
		$('#posts').append(newPost);
		
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
		var video = document.getElementById("myVideo");
		var cnvs;
		var curtime = video.currentTime;

		video.currentTime = posts[i].videoTime;
		video.onseeked = function() {
		var cnvs = document.createElement("canvas");
		var context = cnvs.getContext("2d");
		context.drawImage(video, 0, 0, 220, 150);
		cnvs.id = canvas_id
		cnvs.style.width = width;
		cnvs.style.height = height;

		// Append "cnvs" into the html (where you want)
		document.getElementById(posts[i].key).appendChild(cnvs);

		video.currentTime = curtime;
		video.onseeked = null;
		getVideoScreenShot(posts, i-1)
		}
	}
})