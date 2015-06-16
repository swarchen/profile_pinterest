$(document).ready(function(){
	//like button +/- functions
	var count = 0;
	var offset = 250;
    var duration = 300;
    var isLoadingData = false;
	$(document).on('click', '.btn', function(){
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
	layout();
	

	//scroll to ajax more content
  	$(window).scroll(function()
	{
	    if($(window).scrollTop() == $(document).height() - $(window).height() && count !== "finish" && !isLoadingData)
	    {
	    	isLoadingData = true;
	        $('div#loadmoreajaxloader').show();
	        $.ajax({
		        url: '/getmore',
		        dataType: 'JSON',
		        type: 'POST',
		        data: { count : count },
		        success: function(profiles){
		        	if(profiles.length !== 0){
		        		profiles.forEach(function(profile){
			        		var $items = $('<div class="grid-item"><div class="thumbnail"><a href="'+ profile.pic +'" data-lightbox="'+ profile.title +'" data-title="'+ profile.title +'" ><img src="'+ profile.pic +'"></a><div class="caption"><h3>'+ profile.title +'</h3><p>'+ profile.paragraph +'</p><p><a id="like"class="btn btn-danger" role="button" data-id="'+ profile._id +'"><i class="fa fa-heart-o"></i><span class="count">'+ profile.likes +'</span>Likes</a></p></div></div></div>');
			        		$('.grid').append( $items )
			        		.masonry( 'appended', $items );
			        	});
			        	$('div#loadmoreajaxloader').hide();
			        	count += 1;
			        	//let waterfall page be activate
						layout();
						//prevent double loaded data
						isLoadingData = false;
		        	}else{
		        		count = "finish";
		        		$('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
		        	}
		        	
		        }
		        
		    });
	    }

	    if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
	});

	
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
    $('.grid').masonry('layout');
})

function layout(){
	//let waterfall page be activate
	imagesLoaded( $('.grid'),function (){
		$('.grid').masonry({
	    	itemSelector: '.grid-item',
	    	gutter: 10,
	    	isFitWidth: true
	  	});
	})
};


