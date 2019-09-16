;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var $sidebar = $('.widget-sidebar');
	var activeClass = 'active';
	
	initAccordions();
	
	/**
	 * Accordions functionality
	 * @return {[type]} [description]
	 */
	function initAccordions() {
	    var $accordions = $('.js-accordion');
	    var $accordionsMobile = $('.js-accordion-mobile');

	    var mobileLandscape = window.matchMedia( "(max-width: 767px)" );

	    if( $accordions.length === 0 ) {
	        return;
	    }

	    $accordions.each(function(){
	        var $accordion = $(this);
	        var $head = $accordion.find(' > .js-accordion-head');
	        var $body = $accordion.find(' > .js-accordion-body');

	        $head.click(function(e){
	            e.preventDefault();

	            $accordion.toggleClass('is-collapsed', $body.is(':visible')).siblings().addClass('is-collapsed').find('> .js-accordion-body').slideUp();
	            $body.slideToggle();
	        });
	    });
	}

	//Tabs

	$('.tabs__nav a').on('click', function(event) {
		event.preventDefault();
		
		var $tabLink = $(this);
		var $targetTab = $($tabLink.attr('href'));

		$tabLink
			.parent()
			.add($targetTab)
			.addClass(activeClass)
				.siblings()
				.removeClass(activeClass);
	});

	var lastScrollTop = 0;

	$win.on('load scroll', function() {
		
		if ( !$sidebar.length ) {
			return;
		}

		var scrollTop = $sidebar.offset().top - $('.site-banner').outerHeight();
		var sidebarTop = $('.breadcrumb-nav').offset().top + $('.breadcrumb-nav').outerHeight() + 32;

		if ( $win.scrollTop() > scrollTop && !$sidebar.hasClass('sticky') ) {
			$sidebar.addClass('sticky');
			$sidebar.css('top', sidebarTop)
		} else if ( $win.scrollTop() < scrollTop && $sidebar.hasClass('sticky') ) {
				$sidebar.removeClass('sticky');
				$sidebar.css('top', 0)
		}
	});
})(jQuery, window, document);

;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {
		var $body = $('body');

		var classes = {
			Hover       : 'hover',
			Active      : 'active',
			ShowNavMain : 'show-nav-main',
			FixedHeader : 'show-fixed-header',
			PageLoad    : 'page-load'
		};

		var is = {
			Mobile  : false,
			Desktop : false,
			Tablet  : false
		};

		var get = {
			Scroll   : 0,
			WinWidth : 0
		};

			/*
				# - Ready
			*/

		addDeviceResolution();
		addBaseClickEvents();

			/*
				# - Load
			*/

		$win.on('load', function(){
			$('body').addClass('loaded');

			adjustSliderHeight();
			newsletterLabel();
		});

			/*
				# - Scroll
			*/

		$win.on('scroll', function(){
			get.Scroll = $win.scrollTop();

			$body.toggleClass(classes.FixedHeader, (get.Scroll > 200));

			adjustSliderHeight();
		});

			/*
				- # - Resize Orientationchange
			*/

		$win.on('resize orientationchange', function(){
			addDeviceResolution();
			adjustSliderHeight();
		});

		/*
			# - Functions -	
		*/

		function adjustSliderHeight() {
			setTimeout(function(){
				$('.list-articles .caroufredsel_wrapper').height($('.list-articles .slider-content').outerHeight());
			},50);
		}

		// Prepare sliders
		function prepareSlider($slider) {
			var $sliderClone = $slider.clone();

			$slider.after($sliderClone);
			$slider.remove();

			$sliderClone
				.attr('style', '')
				.find('.slider-content')
					.attr('style', '');
		}

		// Start Slider
		function startSlider($slider, options) {
			var $slidesContainer = $slider.find('.slider-content').length ? $slider.find('.slider-content') : $slider.find('.slider__slides');

			$slidesContainer.carouFredSel(options);
		}

		if ($('.list-articles .slider').length) {
			prepareSlider($('.list-articles .slider'));

			$win.on('load', function(){
				startSlider($('.list-articles .slider'), {
					width: '100%',
					items: 1,
					duration: 100000,
					responsive: true,
					scroll: { 
						fx: 'fade',
						duration: 800,
						onBefore: function() {
							$(this)
									.find('.la-item')
										.removeClass('active');
						},
						onAfter: function() {
							$(this)
									.find('.la-item:first-child')
										.addClass('active');
						}
					},
					swipe: {
						onTouch: true,
						onMouse: true
					},
					auto: {
						play: true,
						timeoutDuration: 7000
					},
					pagination: {
						container: '.list-articles .slider-pagin'
					},
					onCreate: function() {
						$(this)
								.find('.la-item:first-child')
									.addClass('active');

						$('.list-articles .la-item-img').each(function(){
							$(this).wrap('<div class="slider-image">')
						});
					},
					infinite: true
				});
			});
		}

		if ($('.front .block.block-page.partner .box-dark .inside .tn-panel .slider').length) {
			$('.front .block.block-page.partner .box-dark .inside .tn-panel .slider').each(function(){
				var $slider = $(this);

				prepareSlider($slider);

				$win.on('load', function(){
					startSlider($('.front .block.block-page.partner .box-dark .inside .tn-panel .slider'), {
						width: '100%',
						items: {
							visible: 7,
							start: -1
						},
						responsive: true,
						scroll: { 
							items: 5,
							duration: 800
						},
						swipe: {
							onTouch: true,
							onMouse: true
						},
						auto: {
							play: true,
							timeoutDuration: 3000
						},
						infinite: true
					});
				});
			});
		}

		function closeNavMain() {
			$body.removeClass(classes.ShowNavMain);
			$('.expanded.mn-item-lvl-1').removeClass('expanded');
		}

		function newsletterLabel() {
	        $('.nf-main-content .nf-form-txt').each(function(){
	            var $this = $(this);
	            var $container = $this.closest('.nf-main-content');

	            $this.on('blur', function(){
	                if ($this.val() == 0) {
	                    $container.removeClass('hide-label');
	                } else {
	                    $this.addClass('hide-label');
	                }
	            }).on('input', function(){
	                $container.addClass('hide-label');
	            });
	        });

	        // Checkbox
	        $('.nf-form-item .optin-container .nf-form-input').click(function(){
	            var $this = $(this);
	            var $parent = $this.parent();
	            var $input = $this.find('input');

	            $input.trigger('click');

	            if (!$input.is(':checked')) {
	                $parent.removeClass('checked');
	            } else {
	                $parent.addClass('checked');
	            }
	        });

	        $body.on('DOMSubtreeModified', '.nf-result', function() {
	            if (!$('.nf-result').find('p').length) {
	                $('.newsletter-form form input[type="checkbox"]').prop('checked', false).closest('.optin-container.checked').removeClass('checked');
	            }
	        });
	    }

		function addBaseClickEvents() {
			$body.on('click touchstart', function(event){
				var $target = $(event.target);

				if(!$target.parents('.main-navigation').length){
					closeNavMain();
				}
			});

			$('.btn-menu').click(function(event){
				event.preventDefault();

				$body.toggleClass(classes.ShowNavMain);
			});	

			$('[href="#newsletter"]').click(function(e){
			    var $target = $('.section-newsletter');

			    e.preventDefault();

				if ($target.length) {
				    $('html, body').animate({
				        scrollTop: $target.offset().top - 90
				    }, 600);

				    return false;
				}
			});
		}

		function addDeviceResolution() {
			get.WinWidth = $win.width();

			is.Desktop = (get.WinWidth > 1024); 
			is.Mobile  = (get.WinWidth <= 767);
			is.Tablet  = (get.WinWidth <= 1024 && get.WinWidth >= 768);
		}
	});

})(jQuery, window, document);

