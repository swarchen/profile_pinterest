$(document).ready(function(){
	

	$('.like').click(function(){
		var url = './' + $(this).data('id') + '/like';
		$(this).removeClass("like").addClass('dislike');
		console.log(url + 'like');
		$.ajax({
			method: 'POST',
			url: url
		}).done(function(res) {
			if (!res) console.log('error');
		});

	});

	$('.dislike').click(function(){
		var url = './' + $(this).data('id') + '/dislike';
		$(this).removeClass("dislike").addClass('like');
		console.log(url + 'dislike');
		$.ajax({
			method: 'POST',
			url: url
		}).done(function(res) {
			if (!res) console.log('error');
		});

	});


})