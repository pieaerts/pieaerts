function iOSversion(useragent) {
  if (/iP(hone|od|ad|od Touch)/.test(useragent)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
  return false;
}
$(window).on('orientationchange', function(e) {
	//window.location.reload();
});

function lightbox_next(el) {
	el.hide();
	if(el.next().hasClass('lightbox')) el.next().show();
	else $('.lightbox').first().show()
}
function lightbox_prev(el) {
	el.hide();
	if(el.prev().hasClass('lightbox')) el.prev().show();
	else $('.lightbox').last().show()
}

$( document ).ready(function() {


	var useragent = navigator.userAgent;
	//check for old stock Android browser
	//to remove position fixed and background attachment fixed
	if(	(useragent.indexOf("Mozilla/5.0") > -1) &&
		(useragent.indexOf("Android") > -1) &&
		(useragent.indexOf("Chrome") == -1)
	) {
		$('body').addClass('old_Android');
	}

	//check for Android
	//to remove animation
	if(useragent.indexOf("Android") > -1) $('body').addClass('Android');

	//check for old iOS version 
	//to remove position fixed
	var iOS_version = iOSversion(useragent);
	if(iOS_version[0]<5) $('body').addClass('old_iOS');
	if(iOS_version[0]>6) $('body').addClass('new_iOS');

	//check for iOS 
	//to remove background attachment fixed and animation
	var iOS = /(iPad|iPhone|iPod)/g.test(useragent);
	if(iOS) $('body').addClass('iOS');

	//detect browser with Touch Events running on touch-capable device
	if ('ontouchstart' in window) {
	     $('body').addClass('touch');
	}

	if(!$('body').hasClass('old_Android') && !$('body').hasClass('old_iOS')) {
		//if modern browser
	}

	if($('body').hasClass('Android') || $('body').hasClass('iOS')) {
		//no animation
	}
	else {
		//animation
	}


  $( "img" ).load(function() {
  		$( window ).resize();
	});

	$( ".contentdiv img" ).each(function() {
		var img = $(this);
		$(this).parent().replaceWith(img);
	});


  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname && !$(this).hasClass('carousel-control')) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  $('.lightbox').click( function() {
		if($( window ).width() <= 600) {
			$(this).find('.item').click();
		}
	});
	$('.navbar-toggle.top').click( function(event) {
		var el = $(this);
		if($( 'body' ).width() >= 1185) {
				event.preventDefault();
				event.stopPropagation();
				if($('.navbar-nav > li:first-child').css('opacity')=='0' || $(window).scrollTop() != 0 ) {
					if(el.attr('src')=='/img/openmenu_white.svg' || el.attr('data-cms-original-src')=='/img/openmenu_white.svg') el.attr('src','/img/close_white.svg');
					else if(el.attr('src')=='/img/openmenu.svg' || el.attr('data-cms-original-src')=='/img/openmenu.svg') el.attr('src','/img/close.svg');
					//show nav
					sessionStorage.menuopen = 'true';
					$('.navbar-nav > li').stop( true, true ).delay(300).animate({
						opacity: 1
					}, 200, function() {
						// Animation complete.
					});
				} else {
					if(el.attr('src')=='/img/close_white.svg' || el.attr('data-cms-original-src')=='/img/close_white.svg') el.attr('src','/img/openmenu_white.svg');
					else if(el.attr('src')=='/img/close.svg' || el.attr('data-cms-original-src')=='/img/close.svg') el.attr('src','/img/openmenu.svg');
					//hide nav
					sessionStorage.menuopen = 'false';
					$('.navbar-nav > li:visible').not(':nth-child(4)').stop( true, true ).delay(300).animate({
						opacity: 0
					}, 200, function() {
						// Animation complete.
					});
				}
				$('html, body').animate({
						scrollTop: 0
				}, 300);
			}
	});
	$( window ).resize();

});


$( window ).resize(function() {
	$('body').css('height','auto');
	$('footer').css('position','static');
	/*
	if($('body').height() <= $('html').height()) {
		$('body').css('height','100%');
		$('footer').css('position','absolute');
	}
	*/
	if($(window).width()>600) {
		$('#myCarousel > div.carousel-inner > div').each(function() {
			$(this).attr('style',$(this).attr('desktop-style'));
		});
	} else {
		$('#myCarousel > div.carousel-inner > div').each(function() {
			$(this).attr('style',$(this).attr('mobile-style'));
		});
	}
	if(sessionStorage.menuopen == 'true') {
		  $('.navbar-nav > li').css('opacity','1');
	}
});