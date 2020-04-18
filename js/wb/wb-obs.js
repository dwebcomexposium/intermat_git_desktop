;
(function($, window, document, undefined) {
	if ($('body.c-obs').length > 0) {
		var $win = $(window);
		var $doc = $(document);
		var $sidebar = $('.widget-sidebar');
		var activeClass = 'active';
		var scrollTop = $sidebar.offset().top - $('.site-banner').outerHeight();
		var sidebarTop = $('.breadcrumb-nav').offset().top + $('.breadcrumb-nav').outerHeight() + 32;
		initAccordions();
		/**
		 * Accordions functionality
		 * @return {[type]} [description]
		 */
		function initAccordions() {
			var $accordions = $('.js-accordion');
			var $accordionsMobile = $('.js-accordion-mobile');
			var mobileLandscape = window.matchMedia("(max-width: 767px)");
			if ($accordions.length === 0) {
				return;
			}
			
			$accordions.each(function() {
				var $accordion = $(this);
				var $head = $accordion.find(' > .js-accordion-head');
				var $body = $accordion.find(' > .js-accordion-body');
				$head.click(function(e) {
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
			if ($win.scrollTop() > scrollTop && !$sidebar.hasClass('sticky')) {
				$sidebar.addClass('sticky');
				$sidebar.css('top', sidebarTop)
			} else if ($win.scrollTop() < scrollTop && $sidebar.hasClass('sticky')) {
				$sidebar.removeClass('sticky');
				$sidebar.css('top', 0)
			}
		});
	}
})(jQuery, window, document);
