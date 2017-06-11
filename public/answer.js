var UserID;
var postId;
$(document).ready(function(){
	$('#posts').on('click','.answer-btn', function(){
		let post = $(this).parents('.post');
		postId = post.attr('id');
		// change css
		post.find('.answers-container').toggleClass('hide');
		//check whether it's show or hide
		if(post.find('.answers-container').hasClass('hide')){ //if it is hided
			$(this).html('Answer / See more <span class="glyphicon glyphicon-chevron-down">');
		}
		else{ //if it is shown
			// //erase answers
			// post.find('.answers').children('.answer').remove()
			// // get answers from firebase
			// var order = 0
			// firebase.database().ref(REF_question+'/'+postId+'/answers/').orderByChild('likeCount').once('value').then(function(snapshot){
			// 	var ele;
			// 	var answer;
			// 	snapshot.forEach(function(answerSnap){
			// 		answer = answerSnap.val();
			// 		var count = 0;
			// 		console.log(answer.answer);
			// 		firebase.database().ref('likes/' + answerSnap.key + '/').once('value').then(function(snapshot){
			// 			snapshot.forEach(function(answerSnap){
			// 				count = count + 1;
			// 				console.log(count);
			// 			})
			// 			var LikeButton = '<div class="rating-container"><i class="like-btn material-icons">thumb_up</i><span class="count">'+
			// 			count+'</span></div>'
			// 			if (order === 0){
			// 				post.find('.top-answer').html(answerSnap.val().answer)
			// 			}
			// 			order++;
			// 			ele ='<li class="list-group-item answer" id="'+answerSnap.key+'">'+answerSnap.val().answer+LikeButton+'</li>'
					
			// 			post.find('.answers').append(ele)
			// 		})

						
			// 	})
			// })
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
	$('#posts').on('click','.like-btn', function(){
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
						firebase.database().ref(REF_question+'/'+postId+'/answers/'+answerId+'/likeCount').once("value",function(snapshot){
								var newVal = snapshot.val();
								
								newVal--;
								firebase.database().ref(REF_question+'/'+postId+'/answers/'+answerId+'/').update({likeCount : newVal}); 
								console.log("New rating:" + newVal);

						});

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
		updates[newAnswerKey] = {answer:answer, likeCount:0};
		firebase.database().ref(REF_question+'/'+postId+'/answers/').update(updates).then(function(){
			var post = document.getElementById(postId);
			var LikeButton = '<div class="rating-container"><i class="like-btn material-icons">thumb_up</i><span class="count">0</span></div>'
			ele ='<li class="list-group-item answer" id ="' + newAnswerKey + '">' +answer+LikeButton+'</li>'
			$(post).find('.answers').append(ele)
			$(post).find('input').val('')
		})
	}
})