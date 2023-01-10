/**
 * Agence'O - popup
 * @author Guillaume Bouillon (Agence'O)
 * @created 08/02/2017
 */

//;(function ($) {
//
//  var $popup = $('.popup'),
//    $popup_container = $popup.find('.popup__container'),
//    $btn_close = $popup.find('.popup__close');
//
//  if ($.cookie("popup") === '1') {
//    $popup.hide();
//  } else {
//    $popup.removeClass('visually-hidden');
//    $popup.show();
//  }
//
//  $btn_close.on('click', function (e) {
//    e.preventDefault();
//    $popup.animate({'opacity': 0}, 300, function () {
//      $popup.remove();
//      $.cookie("popup", 1, {expires: 1});
//    });
//  });
//
//  $popup.on('click', function (e) {
//    e.preventDefault();
//    $btn_close.click();
//  });
//
//  $popup_container.on('click', function (e) {
//    e.stopPropagation();
//  });
//
//})(jQuery);
