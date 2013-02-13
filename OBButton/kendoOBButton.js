/*
 * Copyright (c) 2012. OnaBai Software Solutions.  All rights reserved.
 * If you do not own a commercial license, this file shall be governed by the
 * GNU General Public License (GPL) version 3.
 * For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
 */

(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        CLICK = "click";

    var OBButton = Widget.extend({
        init:   function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;

            var span = $("<span class='k-icon " + options.imageClass + "'></span>");
            if (options.showImage && options.showText) {
                var text = this.element.html();
                $(element)
                    .html(text || options.text)
                    .addClass("k-button k-button-icontext")
                    .prepend(span);
            } else if (options.showImage) {
                $(element)
                    .addClass("k-button k-button-icon")
                    .html(span);
            } else {
                $(element)
                    .html(text || options.text)
                    .addClass("k-button k-button-icontext")

            }
            element.bind(CLICK, $.proxy(that._click, that));
        },
        options:{
            name:      "OBButton",
            imageClass:"k-i-custom",
            showImage: true,
            showText:  true,
            text:      null
        },
        events: [
            CLICK
        ],
        _click: function () {
            this.trigger(CLICK);
        }
    });
    ui.plugin(OBButton);
})(jQuery);
