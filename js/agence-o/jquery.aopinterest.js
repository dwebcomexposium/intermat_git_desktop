/**!
 AGENCE'O - Pinterest
 Return pinterest images
 @version: 0.1.0
 @contributors: Guillaume Bouillon (Agence'O)
 @date-created: 2016-09-01
 @date-updated: 2016-09-01
 */

;(function ($) {

    "use strict";
    $.fn.aoPinterest = function (options) {

        //https://api.pinterest.com/v1/me/pins/?access_token=AUOtulR7Q-z9wepSOiNudnKa65xNFHAsU9uoxM9DXjoJrMBGewAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage%2Cmedia%2Cmetadata%2Coriginal_link%2Ccounts

        var _plugin = this;
        var _pluginName = 'Agence\'O - Pinterest';
        var settings = $.extend({
            api_url: 'https://api.pinterest.com/v1/me/boards/',
            access_token: 'AUOtulR7Q-z9wepSOiNudnKa65xNFHAsU9uoxM9DXjoJrMBGewAAAAA',
            fields: 'id,link,note,url,image,media,metadata,original_link,counts',
            limit: '10',
            // --- custom
            linked: true,
            wrapper: '<div class="ao-pinterest-wrapper" />',
            wrapper_item: '',
            onFinish: function () {
            }
        }, options);

        var $wrapper = $(settings.wrapper);

        _plugin.init = function () {
            _plugin.getList();
            $(this).append($wrapper);

        };

        _plugin.getList = function () {
            var request_uri = settings.api_url,
                request_data = {
                    access_token: settings.access_token,
                    user_id: settings.user_id,
                    fields: settings.fields,
                    limit: settings.limit
                };

            $.getJSON(request_uri, request_data, _plugin.processList);
        };

        _plugin.processItem = function (item) {
            var $item;

            var $image = $('<img />');
            // var image_size = (settings.size) ? '_' + settings.size : '';
            // var image_url = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + image_size + '.jpg';
            // $image.attr({
            //     src: image_url,
            //     alt: item.title
            // });

            $item = $image;

            if (settings.linked) {
                var $link = $('<a />');
                // var link_url = 'https://www.flickr.com/photos/' + settings.user_id + '/' + item.id + '';
                // $link.attr({
                //     href: link_url,
                //     title: item.title,
                //     target: '_blank'
                // });

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
