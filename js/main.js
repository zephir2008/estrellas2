/*****************************/
/* Scroll handler */
+function(jQuery){
    var scrollStopEventEmitter = function(element, jQuery) {
        this.scrollTimeOut = false;
        this.element       = element;
        jQuery(element).on('scroll', $.proxy(this.onScroll, this));
    }

    scrollStopEventEmitter.prototype.onScroll = function() {
        if (this.scrollTimeOut != false) {
          clearTimeout(this.scrollTimeOut);
        }
        var context = this;
        this.scrollTimeOut = setTimeout(function(){ context.onScrollStop()}, 250);
    }

    scrollStopEventEmitter.prototype.onScrollStop = function() {
        this.element.trigger('scrollStop');
    }

    jQuery.fn.scrollStopEventEmitter = function(jQuery) {
        return new scrollStopEventEmitter(this, jQuery);
    };
}($);


function showTop(){
	$('.to-top').fadeIn('slow');
}

function hideTop(){
	$('.to-top').fadeOut('slow');
}

$(document).ready(function(){
	//$('.to-top').show();

	$(window).scrollStopEventEmitter($);

	$(window).on('scrollStop',function(){
		if ($(document).scrollTop() == 0) {
			hideTop();
			//$('.to-top').css('visibility','hidden');
		} else {
			showTop();
			//$('.to-top').css('visibility','visible');
		}
	});

	$('.js-scrollTo').on('click', function() {
		var page = $(this).attr('href');
		var speed = 750;
		var high = parseInt($("#HEAD").css('height'));
		$('html, body').animate(
			{
				scrollTop: $(page).offset().top - high
			},
			speed, 'swing'
	 	);

	  	return false;
	});
});
