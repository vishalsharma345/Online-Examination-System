/* 
Author:  Armin Solecki

* Options: 
* action (open/close)
* size (small/medium/large) max-width of popUpWindow
* modal true/false
* buttons
* onClose
*/
;
(function ($, window, document, undefined) {

    // Create the defaults
    var pluginName = 'popUpWindow',
        defaults = {
            action: "open",
            size: "large",
            modal: false
        };

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        uniqueID: "pop-up-id-1",

        init: function () {
            var instance = this;

            //Generate random id
            var uniqueNumber = Math.floor(Math.random() * 10000),
                hasButtons = $.isArray(this.options.buttons) && this.options.buttons.length;
            this.uniqueID = "pop-up-id-" + uniqueNumber;

            var popUp =
                $('<div id="pop-up" class="pop-up ' + this.options.size + '" data-pop-up-id="' + this.uniqueID + '">' +
                    '  <div class="pop-up-content">' +
                    '    <div class="close"></div>' +
                    '    <div class="pop-up-main-content"></div>' +
                    (hasButtons ? '    <div class="pop-up-footer"></div>' : '') +
                    '  </div>' +
                    '</div>');

            //Close link click event
            var closeLink = $('<a href="#close" aria-hidden="true" title="Close" class="pop-up-close-trigger"><span class="screen-reader-text">Close</span></a>').click(function (e) {
                e.preventDefault();
                instance.close(instance.element, instance.options);
            });

            $('.close', popUp).append(closeLink);

            // create the background cover
            var bgCover = $('<div class="pop-up-background" data-pop-up-background-id="' + this.uniqueID + '"></div>').appendTo('body');

            //Background click event
            if (!instance.options.modal) {
                bgCover.click(function (e) {
                    e.preventDefault();
                    instance.close(instance.element, instance.options);
                });
            } else {
                bgCover.addClass("pop-up-background-modal");
            }

            //Create buttons
            if (hasButtons) {

                $.each(this.options.buttons, function (index, item) {
                    var icon = item.icon ? '<span class="icon ' + item.icon + '" aria-hidden="true"></span>' : "";
                    var showText = item.iconOnly ? "screen-reader-text" : "";
                    var cssClass = item.cssClass || "pop-up-btn";
                    var button = $('<a href="#" class="' + cssClass + '">' + icon + '<span class="' + showText + '">' + item.text + '</span></a>').click(function (e) {
                        e.preventDefault();
                       
                        // do the click, but set the context as the popup instance, going to pass through the button as a parameter
                        item.click && item.click.apply(instance, [this]);
                    });
                    $('.pop-up-footer', popUp).append(button);

                });
            }

            //Place content into pop-up body
            var element = $(this.element).removeClass('pop-up-display-content');
            $('.pop-up-main-content', popUp).append(element);

            //Append pop-up to body
            popUp.appendTo('body');

            //Open pop-up
            this.open(this.element, this.options);
        },

        //Opens pop-up
        open: function (el, options) {

            //console.log("Open");
            var popUpObject = $('*[data-pop-up-id="' + this.uniqueID + '"]');

            window.marginTop = $('body').scrollTop() > $('html').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();

            // android position absolute bug fix (http://code.google.com/p/android/issues/detail?id=6721)
            var isAndroid = navigator.userAgent.indexOf("Android");
            if (isAndroid > 0) {
                $('.page-wrapper').hide();
                popUpObject.show().css({ visibility: "visible" });
                $('html, body').scrollTop(0);
            } else {
                popUpObject
                    .removeClass("pop-up-fit-screen")
                    .css({ display: "block", visibility: "hidden", top: "" })
                    .find(".pop-up-content-scroller").height("");

                //Position pop-up in center of screen
                var windowSize = $(window).height();
                var contentSize = popUpObject.outerHeight();

                if (windowSize > contentSize) {
                    var contentOffset = Math.round(windowSize / 2) - Math.round(contentSize / 2);
                    popUpObject.css("top", window.marginTop + contentOffset + "px");
                } else {
                    popUpObject.css("top", window.marginTop + 20 + "px");
                }
                popUpObject.css({ display: "none", visibility: "visible" }).fadeIn(500);
                $('*[data-pop-up-background-id="' + this.uniqueID + '"]').fadeIn(500);
            }

            $.isFunction(options.onOpen) && options.onOpen.call(el);
			carouselConnect();//
        },

        //Closes pop-up
        close: function (el, options) {
            //console.log("Close");
            $(".pop-up-background").fadeOut(500);
            $(".pop-up").fadeOut(500);
            $('.page-wrapper').show();
            $('html, body').scrollTop(window.marginTop);

            $.isFunction(this.options.onClose) && this.options.onClose.call(el);

        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));

            } else {
                var pluginInstance = $.data(this, 'plugin_' + pluginName);
                switch (options.action) {
                    case "open":
                        return pluginInstance.open(this, options);
                    case "close":
                        return pluginInstance.close(this, options);
                    default:
                        return pluginInstance.open(this, options);
                }
            }
        });
    };

})(jQuery, window, document);