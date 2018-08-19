
function carouselConnect(){
// This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
	var documenhgt= $(document).innerHeight() + 70;
	var documenwdth= $(document).width();
    var connector = function(itemNavigation, carouselStage) {
		if($(window).width()< 768){
			if(documenhgt > documenwdth)
			{
				documenhgt = documenwdth;
			}
			//alert(documenhgt +" "+documenwdth);
			//$('.connected-carousels ul li img').css('height','400px').css('width','420px');			
		   // $('.connected-carousels .stage').css('width','auto');
			//$('.carousel-stage').css('height',documenhgt+ 30);
		}
		else
		{
			//$('.connected-carousels ul li img').css('height','400px').css('width','600px');
		}
		return carouselStage.jcarousel('items').eq(itemNavigation.index());		
    };
	
    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage      = $('.carousel-stage').jcarousel();
        var carouselNavigation = $('.carousel-navigation').jcarousel();

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);

            // This is where we actually connect to items.
            var target = connector(item, carouselStage);

            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.addClass('active');
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage,
					'method': function(){
					
					this.carousel()
					// Following line must be there to keep the initial action (scroll to the previous image in this case)
					// and it uses a callback function where we can put the additional code
					.jcarousel('scroll', this.options('target'), function(){
						// So here is my code, which is now always synchronized with the carousel state
						fullScreenimg();stagehgt();
					});      
           		 }
                });
				
        });
		var jcarousel = $('.carousel-stage');
        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var carousel = $(this),
                    width = carousel.innerWidth();
					
 				/*if (width >= 350 && width <600) {
                    width = width ;
					carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
                }*/

               // carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
            }).jcarousel({
                wrap: 'circular'
            });

			
        // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');//alert('.prev-stage1');
				$(this).find('img').attr('src','images/previnactive.png').removeAttr('title');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');//alert('.prev-stage2');
				$(this).find('img').attr('src','images/prevactive.png');
            })
            .jcarouselControl({
                target: '-=1',
				'method': function(){
					
					this.carousel()
					// Following line must be there to keep the initial action (scroll to the previous image in this case)
					// and it uses a callback function where we can put the additional code
					.jcarousel('scroll', this.options('target'), function(){
						// So here is my code, which is now always synchronized with the carousel state
						fullScreenimg();stagehgt();
					});      
           		 }
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');//alert('.next-stage1');
				$(this).find('img').attr('src','images/nextinactive.png').removeAttr('title');

            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');//alert('.next-stage2');
				$(this).find('img').attr('src','images/nextactive.png');
            })
            .jcarouselControl({
                target: '+=1',
				'method': function(){
					
					this.carousel()
					// Following line must be there to keep the initial action (scroll to the previous image in this case)
					// and it uses a callback function where we can put the additional code
					.jcarousel('scroll', this.options('target'), function(){
						// So here is my code, which is now always synchronized with the carousel state
						fullScreenimg();stagehgt();
					});     
				}
            });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');//alert('.prev-navigation1');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');//alert('.prev-navigation2');
            })
            .jcarouselControl({
                target: '-=1',
				'method': function(){
					
					this.carousel()
					// Following line must be there to keep the initial action (scroll to the previous image in this case)
					// and it uses a callback function where we can put the additional code
					.jcarousel('scroll', this.options('target'), function(){
						// So here is my code, which is now always synchronized with the carousel state
						fullScreenimg();stagehgt();
					});      
           		 }
					
				
            });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');//alert('.next-navigation1');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');//alert('.next-navigation2');
            })
            .jcarouselControl({
                target: '+=1',
				'method': function(){
					
					this.carousel()
					// Following line must be there to keep the initial action (scroll to the previous image in this case)
					// and it uses a callback function where we can put the additional code
					.jcarousel('scroll', this.options('target'), function(){
						// So here is my code, which is now always synchronized with the carousel state
						fullScreenimg();stagehgt();
					});      
           		 }
            });
			
		
    });	
	
	$('.maximizeicon').on('click',function(){
		//alert($(document).height());alert($(window).height());
		$('.connected-carousels .prev-stage, .connected-carousels .next-stage').addClass('fullsn');
		fullScreenimg();
		stagehgt();
		$('.connected-carousels .stage').css('width','100%');
		if($(window).width()< 768){
			if(documenhgt > documenwdth)
			{
				documenhgt = documenwdth;
			}
			//$('.carousel-stage').css('height',documenhgt+ 30);
			//$('.connected-carousels ul li img').css('height',documenhgt+30).css('width',documenwdth);
		}
		else
		{
			$('.carousel-stage').css('height',documenhgt);
			$('.connected-carousels .stage').css('width','100%');
			$('.connected-carousels ul li img').css('height',$('.carousel-stage').height());
		}
		IEgalleryfullScren();
		
	});
	function stagehgt(){
		//
		//console.log("height "+$(document).height());
		//alert($('.connected-carousels .prev-stage').hasClass('fullsn') +" "+$('.connected-carousels .prev-stage').hasClass('fullsn'));
		if($('.connected-carousels .prev-stage').hasClass('fullsn') && $('.connected-carousels .next-stage').hasClass('fullsn'))
		{
			//previdremove();
			
			var indexv = $('.carousel-navigation .active').index();	
			var imgzoomval = 'imgzoom'+indexv; //alert(imgzoomval);
			var j = document.getElementById('stage');
			$('.connected-carousels .stage').css('width','100%');
			$('.carousel-stage').css('height',documenhgt);
			$('.stage .pop-up-close-triggerfull').remove();
			$('.next-stage').after('<a title="Close" class="pop-up-close-triggerfull"><span class="screen-reader-text">Close</span></a>');
/*			$('.connected-carousels .prev-stage, .connected-carousels .next-stage').css('height','100%')
*/			$('.connected-carousels ul li img').css('height',documenhgt).css('width',documenwdth);
			$('.connected-carousels .navigation').hide();
			if($(window).width()< 768){
				if(documenhgt > documenwdth)
				{
					documenhgt = documenwdth;
				}
				//$('.carousel-stage').css('height',documenhgt + 30);
				//$('.connected-carousels ul li img').css('height',documenhgt + 30).css('width',documenwdth);
			}
			if (j.requestFullscreen) {
				j.requestFullscreen();
			} else if (j.webkitRequestFullscreen) {
				j.webkitRequestFullscreen();
			} else if (j.mozRequestFullScreen) {
				j.mozRequestFullScreen();
			} else if (j.msRequestFullscreen) {
				j.msRequestFullscreen();IEgalleryfullScren();
			} else if (j.webkitEnterFullScreen) {
        j.webkitEnterFullScreen();
      }
      else {
				var shell = new ActiveXObject("WScript.Shell");
				shell.SendKeys("{F11}");
/*				$('.connected-carousels .prev-stage, .connected-carousels .next-stage').css('height','410px').css('top','0%');;
*/				$('.connected-carousels .prev-stage, .connected-carousels .next-stage').removeClass('fullsn');
				$('#stage').css('width', '620px');
				$('.carousel-stage').css('height', '400px');
				$('#stage .pop-up-close-triggerfull').remove();
				$('.connected-carousels ul li img').css('height','auto');
			}	
			
		}
	}
	function fullScreenimg(){
		var indexv = $('.carousel-navigation .active').index();
			
		$('.carousel ul li img').removeAttr('id');
		$('.carousel ul li img:eq('+indexv+')').attr('id','imgzoom'+indexv);
		
		
	}


	function detectIE() {
		var ua = window.navigator.userAgent;
	
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return true;
		}
	
		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return true;
		}
	
		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
		   // Edge (IE 12+) => return version number
		   return true;
		}

    // other browser
    	return false;
	}
	function IEgalleryfullScren()
	{
		
			if(detectIE() == true)
			{
				$('.maximizeicon, .pop-up-header, .connected-carousels .navigation, .pop-up-close-trigger').hide();
				$('.stage').append('<a title="Close" class="pop-up-close-triggerfull"><span class="screen-reader-text">Close</span></a>');
/*				$('.connected-carousels .prev-stage, .connected-carousels .next-stage').css('height','100%');
*/				$('.connected-carousels, .pop-up-content').css('padding','0px');
				$('#pop-up').css('top','0px').css('left','0%').css('margin-left','0px').css('max-width',documenwdth).css('width','100%');
			}
		
		
	}
}

