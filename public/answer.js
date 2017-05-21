$(document).ready(function(){
	$('#posts').on('click','.answer-btn', function(){
		firebase.database().ref(REF_question+'/answers/').once('value').then(function(snapshot){
			snapshot.forEach(function(answer){
				$('<li class="list-group-item"></li>').text(answer.answer)
			})
		})
		$(this).parents('.post').find('.answer').toggleClass('hide');
		if($(this).parents('.post').find('.answer').hasClass('hide')){
			console.log('hide')
			$(this).html('Answer / See more <span class="glyphicon glyphicon-chevron-down">');
		}
			else $(this).html('Close <span class="glyphicon glyphicon-chevron-up">');
	})
})