$(document).ready(function(){
	$('#posts').on('click','.answer-btn', function(){
		$(this).parents('.post').find('.answer').toggleClass('hide');
		if($(this).parents('.post').find('.answer').hasClass('hide')){
			console.log('hide')
			$(this).html('Answer / See more <span class="glyphicon glyphicon-chevron-down">');
		}
			else $(this).html('Close <span class="glyphicon glyphicon-chevron-up">');
	})
})