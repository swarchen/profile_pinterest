$(document).ready(function(){
	

	$('.btn').click(function(){
		var url = './' + $(this).data('id') + '/' + $(this).attr('id');
		if ($(this).attr('id') === 'like'){
			$(this).attr('id', 'dislike');
			$(this).find('i').removeClass('fa-heart-o').addClass('fa-heart');
			$(this).find('span').text(Number($(this).find('span').text()) + 1);
		}
		else{
			$(this).attr('id', 'like');
			$(this).find('i').removeClass('fa-heart').addClass('fa-heart-o');
			$(this).find('span').text(Number($(this).find('span').text()) - 1)
		}
		console.log(url);
		$.ajax({
			method: 'POST',
			url: url
		}).done(function(res) {
			if (!res) console.log('error');
		});

	});



})