/**!
 AGENCE'O - Flickr
 Return Flickr images
 @version: 0.1.0
 @contributors: Guillaume Bouillon (Agence'O)
 @date-created: 2016-06-30
 @date-updated: 2016-06-30
 */

;(function ($) {

    "use strict";
    $.fn.aoFlickr = function (options) {

        var _plugin = this;
        var _pluginName = 'Agence\'O - Flickr';
        var settings = $.extend({
            api_url: 'https://api.flickr.com/services/rest/',
            method: 'flickr.photosets.getPhotos',
            api_key: '0dd448e2741d28dd182d4d7237ca2a19',
            user_id: '48479870@N07',
            photoset_id: '72157670440018885',
            linked: true,
            per_page: '10',
            size: 'q', //https://www.flickr.com/services/api/misc.urls.html#yui_3_11_0_1_1467308012176_331
            privacy_filter: 1, //https://www.flickr.com/services/api/flickr.photosets.getPhotos.htm#privacy_filter
            extras: '', //https://www.flickr.com/services/api/flickr.photosets.getPhotos.htm#extras
            format: 'json',
            nojsoncallback: 1,
            // --- custom
            wrapper: '<div class="ao-flickr-wrapper" />',
            wrapper_item: '',
            onFinish: function () {}
        }, options);

        var $wrapper = $(settings.wrapper);

        _plugin.init = function () {
            _plugin.getList();
            $(this).append($wrapper);

        };

        _plugin.getList = function () {
            var request_uri = settings.api_url,
                request_data = {
                    method: settings.method,
                    api_key: settings.api_key,
                    user_id: settings.user_id,
                    photoset_id: settings.photoset_id,
                    per_page: settings.per_page,
                    format: settings.format,
                    nojsoncallback: settings.nojsoncallback,
                    size: settings.size,
                    extras: settings.extras,
                    privacy_filter: settings.privacy_filter
                };

            $.getJSON(request_uri, request_data, _plugin.processList);
        };

        _plugin.processItem = function (item) {
            var $item;

            var $image = $('<img />');
            var image_size = (settings.size) ? '_' + settings.size : '';
            var image_url = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + image_size + '.jpg';
            $image.attr({
                src: image_url,
                alt: item.title
            });

            $item = $image;

            if (settings.linked) {
                var $link = $('<a />');
                var link_url = 'https://www.flickr.com/photos/' + settings.user_id + '/' + item.id + '';
                $link.attr({
                    href: link_url,
                    title: item.title,
                    target: '_blank'
                });

                $item = $link.append($item);
            }

            if (settings.wrapper_item) {
                var $wrapper_item = $(settings.wrapper_item);

                $item = $wrapper_item.append($item);
            }

            return $item;
        };

        _plugin.processList = function (list) {
            if (list.stat != 'ok') {
                console.log('%c %s %c ' + response.message + ' ', 'background: #222; color: #bada55', _pluginName, 'color: red');
                return;
            }

            var photos_list;

            if (list.photos) {
                photos_list = list.photos.photo;
            } else if (list.photoset) {
                photos_list = list.photoset.photo;
            } else {
                console.log('%c %s %c ' + 'Plugin does not support this method' + ' ', 'background: #222; color: #bada55', _pluginName, 'color: red');
            }

            $.each(photos_list, function (i, item) {
                $wrapper.append(_plugin.processItem(item));
            });

            settings.onFinish.call(_plugin);
        };

        return this.each(function () {
            _plugin.init();
        });
    };


})(jQuery);
