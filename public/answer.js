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
					ele ='<li class="list-group-item answer" style="word-wrap: break-word">'+answer.answer+'</li>'
					post.find('.answers').append(ele)
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

	function saveAnswer(answer, postId){
		if(answer=='')return 
		firebase.database().ref(REF_question+'/'+postId+'/answers/').push({
			answer: answer
		}).then(function(){
			var post = document.getElementById(postId)
			ele ='<li class="list-group-item answer">'+answer+'</li>'
			$(post).find('.answers').append(ele)
			$(post).find('input').val('')
		})
	}
})