var UserID;
$(document).ready(function(){
	$('#posts').on('click','.answer-btn', function(){
		let post = $(this).parents('.post');
		let postId = post.attr('id');
		// change css
		post.find('.answers-container').toggleClass('hide');
		//check whether it's show or hide
		if(post.find('.answers-container').hasClass('hide')){ //if it is hided
			$(this).html('Answer / See more <span class="glyphicon glyphicon-chevron-down">');
		}
		else{ //if it is shown
			//erase answers
			post.find('.answers').children('.answer').remove()
			// get answers from firebase
			firebase.database().ref(REF_question+'/'+postId+'/answers/').once('value').then(function(snapshot){
				var ele;
				var answer;
				snapshot.forEach(function(answerSnap){
					answer = answerSnap.val();
					var count = 0;
					firebase.database().ref('likes/' + answerSnap.key + '/').once('value').then(function(snapshot){
						snapshot.forEach(function(answerSnap){
							count = count + 1;
							console.log(count);
						})

						var LikeButton = '<div class="like_button"><button>Like</button><span class="count">' +count +'</span></div>'
						ele ='<li class="list-group-item answer" id="'+answerSnap.key+'">'+answer.answer+LikeButton+'</li>'
					
						post.find('.answers').append(ele)
					})

				})
			})
			$(this).html('Close <span class="glyphicon glyphicon-chevron-up">');
		}
	})

	$('#posts').on('click','.submit-answer', function(e){
		let post = $(this).parents('.post');
		let postId = post.attr('id');
		let value = $(post).find('input').val()
		saveAnswer(value, postId)
	})
	$('#posts').on('keydown','.answers-container input', function(e){
		let post = $(this).parents('.post');
		let postId = post.attr('id');

		if(e.key==="Enter"){
			let value = $(this).val()
			saveAnswer(value, postId)
		}
	})

	Logout();

	function Logout() {
		var LogoutBtn = document.getElementById('logout');
	
		LogoutBtn.onclick = function() {
			firebase.auth().signOut().then(function() {
  				// Sign-out successful.
  				window.location.href = "index.html";
			}).catch(function(error) {
  			// An error happened.
			});
		}
	
	}
	$('#posts').on('click','.like_button button', function(){
		var $count = $(this).parent().find('.count');			
		let answer = $(this).parents('.answer');
  		let answerId = answer.attr('id');
  		console.log(answerId);
  		console.log(UserID);
		firebase.database().ref('likes/' + answerId + '/' + UserID + '/').once('value').then(function(snapshot){
				console.log(snapshot);
				if (snapshot.val() == null) {
					var newAnswerKey = firebase.database().ref('likes/' + answerId + '/' + UserID + '/').push("1").then(function(){
						$count.html($count.html() * 1 + 1);
					})
				}
				else {
					console.log("Exist");
				}
		})
	});

	function saveAnswer(answer, postId){
		if(answer=='')return 
		var newAnswerKey = firebase.database().ref(REF_question+'/'+postId+'/answers/').push().key;
		var updates = {};
		updates[newAnswerKey] = {answer:answer};
		firebase.database().ref(REF_question+'/'+postId+'/answers/').update(updates).then(function(){
			var post = document.getElementById(postId);
			var LikeButton = '<div class="like_button"><button>Like</button><span class="count">0</span></div>'
			ele ='<li class="list-group-item answer" id ="' + newAnswerKey + '">' +answer+LikeButton+'</li>'
			$(post).find('.answers').append(ele)
			$(post).find('input').val('')
		})
	}
})