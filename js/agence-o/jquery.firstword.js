/**!
 First words
 Select/wrap first words of a sentence

 @contributors: Guillaume Bouillon (Agence'O)
 @date-created: 2016-08-26
 @last-update: 2016-08-26
 */

;(function ($) {

    /**
     * @description Select/wrap first words of a sentence
     * @param {Array} options
     * @parameters: limit (int), tagName (string), className (string)
     */
    $.fn.firstWord = function (options) {
        var settings = $.extend({
            limit: 1,
            tagName: "span",
            className: "first-word"
        }, options);

        return this.each(function () {
            var $_this = $(this);
            var $wrapper = $("<" + settings.tagName + " />").addClass(settings.className);

            var node = $_this.contents().filter(function () {
                // check if node is a text_node
                return this.nodeType === 3;
            }).first();

            var text = node.text();
            var first = text.split(" ", settings.limit).join(" ");

            if (!node.length)
                return;

            node[0].nodeValue = text.slice(first.length);
            $wrapper.html(first);
            node.before($wrapper);
        });
    };

})(jQuery);