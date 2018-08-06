/**!
 Agence'O Youtube video wall
 Create a Youtube video wall with Youtube API scripts

 @contributors: Nicolas Bugeja (Agence'O), Guillaume Bouillon (Agence'O), Yevhenii Tretiak
 @version 1.2
 @date-created: 2016-07-12
 @last-update: 2016-08-12
 */

;(function ($) {

    // Init du mur de video Youtube sur la Home

    var playlistId = playlistId || undefined;

    if (typeof gapi !== 'undefined') {
        gapi.load('client', youtubeLoadCallback);
    }

    if (typeof playlistId === 'undefined') {
        playlistId = 'PLHrHf9WmFK3nH-XDhi1KPJvOkrKsh6f2F';
    }

    function youtubeLoadCallback() {
        gapi.client.setApiKey('AIzaSyBxVUNwrx2w6WkvcTAMEE22Ov1tSscsaz4');
        gapi.client.load('youtube', 'v3', function () {
            handleAPILoaded();
        });
    }

    function handleAPILoaded() {
        var requestOptions = {
            playlistId: playlistId,
            part: 'snippet',
            maxResults: 16
        };

        var request = gapi.client.youtube.playlistItems.list(requestOptions);
        request.execute(function (response) {

            var playlistItems = response.result.items,
                sliderHtml = '';

            if (playlistItems.length) {
                /* avoid to create title tile */
                /*sliderHtml = createTitleTile(sliderHtml);*/

                $.each(playlistItems, function (index, item) {
                    sliderHtml = createTile(sliderHtml, item.snippet);
                });

              // On double pour avoir suffisamment de videos
                $.each(playlistItems, function (index, item) {
                  sliderHtml = createTile(sliderHtml, item.snippet);
                });

                $('#youTubeBlockVideo').html(sliderHtml);

                $('#youTubeBlockVideo').slick({
                    arrows: true,
                    //centerMode: true,
                    infinite: true,
                    lazyLoad: 'ondemand',
                    rows: 2,
                    slidesToShow: 6,
                    slidesToScroll: 4,
                    swipeToSlide: true,
                    variableWidth: true
                });
            }
        });
    }

    function createTitleTile(currentHtml) {
        var html_title = $('.block-video .block-title').html();

        currentHtml += '<div class="video-item video-block-title">' + html_title + '</div>';

        return currentHtml;
    }

    var tile_id = 0;

    function createTile(currentHtml, videoSnippet) {
        var title = videoSnippet.title,
            videoId = videoSnippet.resourceId.videoId,
            thumbUrl = videoSnippet.thumbnails.high.url;

        currentHtml += '<div class="video-item" data-tile-id="' + tile_id + '">' +
            '<a href="https://www.youtube.com/watch?v=' + videoId + '&list=' + playlistId + '&index=1" target="_blank">' +
            '<img src="' + thumbUrl + '" alt="' + title + '" title="' + title + '" />' +
            '<span class="video-title">' + title + '</span>' +
            '</a>' +
            '</div>';

        tile_id++;

        return currentHtml;
    }

// Fin des fonctions pour Youtube


})(jQuery);
