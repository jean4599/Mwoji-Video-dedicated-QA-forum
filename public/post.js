$( document ).ready(function() {
	var posts=[];

	initPost();

	$('#post-btn').on('click',function(){
		$('#ask').toggleClass('hide');
		$('#overview').toggleClass('hide');
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
			time: timestamp,
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
		firebase.database().ref('/posts/').push(post)
	}

	function initPost(){
		firebase.database().ref('/posts/').on('value', function(snapshot){
			var result = snapshot.val();
			if(result){
				clearAllPost();
				posts = Object.keys(result).map(key =>{
					result[key].key = key;
					renderPost(result[key])
					return result.key;
				})
			}
		})
	}
	function clearAllPost(){
		$('#posts').children().remove();
	}
	function renderPost(post){
		var newPost = "<div class='panel panel-default'>"+
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
})