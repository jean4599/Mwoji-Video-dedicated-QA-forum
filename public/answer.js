$(document).ready(function(){
	$('#posts').on('click','.answer-btn', function(){
		let post = $(this).parents('.post');
		let postId = post.attr('id');
		// change css
		post.find('.answers').toggleClass('hide');
		//check whether it's show or hide
		if(post.find('.answers').hasClass('hide')){ //if it is hided
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
					ele ='<li class="list-group-item answer">'+answer.answer+'</li>'
					console.log(answer)
					post.find('.answers').prepend(ele)
				})
			})
			$(this).html('Close <span class="glyphicon glyphicon-chevron-up">');
		}
	})

	$('#posts').on('keydown','.answers input', function(e){
		let post = $(this).parents('.post');
		let postId = post.attr('id');

		if(e.key==="Enter"){
			let value = $(this).val()
			saveAnswer(value, postId)
		}
	})
	function saveAnswer(answer, postId){
		firebase.database().ref(REF_question+'/'+postId+'/answers/').push({
			answer: answer
		})
	}
})