/**!
 Modal inscription newsletter

 @contributors: Guillaume Bouillon (Agence'O)
 @date-created: 2016-08-26
 @last-update: 2016-08-26
 */

;(function ($) {

    /**
     * Newsletter Popin
     */

    var $newsletterForm = $('.newsletter-form');
    var $newsletterFormBtn = $('.linkid106288');

    var $nfCloseBtn = $('<div />').text('Close').addClass('btn-close').click(function (e) {
        e.preventDefault();
        $newsletterForm.hide().removeClass('is-open');
    });
    $newsletterForm.find('.nf-main-content').prepend($nfCloseBtn);
    $newsletterForm.click(function (e) {
        if ($(e.target).hasClass('is-open')) {
            $nfCloseBtn.click();
        }
    });
    $newsletterFormBtn.click(function (e) {
        e.preventDefault();
        $newsletterForm.show().addClass('is-open');
        $newsletterForm.find('.nf-form-input input').focus();
    });


})(jQuery);