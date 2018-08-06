/**!
 Article - swap elements
 Move article illustation under intro/title

 @contributors: Guillaume Bouillon (Agence'O)
 @date-created: 2016-08-24
 @last-update: 2016-08-24
 */

;(function ($) {

    var $content = $('.article-content'),
        $image = $('.at-illust'),
        $container = $('<div />').addClass('article-illust');

    $container.append($image).insertBefore($content);

})(jQuery);