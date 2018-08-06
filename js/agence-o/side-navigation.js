/**!
 Side navigation

 @contributors: Guillaume Bouillon (Agence'O)
 @date-created: 2016-08-26
 @last-update: 2016-08-26
 */

;(function ($) {

    // add <b> tag on all links of side-navigation
    $(".side-navigation .txt-btn").firstWord({
        limit: 1,
        tagName: "b"
    });

})(jQuery);
