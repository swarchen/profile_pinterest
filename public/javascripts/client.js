$(document).ready(function(){
	//like button +/- functions
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

	//let waterfall page be activate
	$('.grid').masonry({
    	itemSelector: '.grid-item',
    	columnWidth: 236,
    	gutter: 10,
    	isFitWidth: true
  	});

	//scroll to ajax more content
  	$(window).scroll(function()
	{
	    if($(window).scrollTop() == $(document).height() - $(window).height())
	    {
	        $('div#loadmoreajaxloader').show();
	        $.ajax({
		        url: '/getmore',
		        dataType: 'JSON',
		        type: 'GET',
		        success: function(profiles){
		        	if(profiles){
		        		profiles.forEach(function(profile){
			        		var $items = $('<div class="grid-item"><div class="thumbnail"><a href="'+ profile.pic +'" data-lightbox="'+ profile.title +'" data-title="'+ profile.title +'" ><img src="'+ profile.pic +'"></a><div class="caption"><h3>'+ profile.title +'</h3><p>'+ profile.paragraph +'</p><p><a id="like"class="btn btn-danger" role="button" data-id="'+ profile.id +'"><i class="fa fa-heart-o"></i><span class="count">'+ profile.likes +'</span>Likes</a></p></div></div></div>');
			        		$('.grid').append( $items )
			        		.masonry( 'appended', $items );
			        	});
			        	$('div#loadmoreajaxloader').hide();
		        	}else{
		        		$('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
		        	}
		        	
		        }
		        
		    });
	    }
	});

})


