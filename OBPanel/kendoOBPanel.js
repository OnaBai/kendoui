/*
 * Copyright (c) 2012-2013. OnaBai Software Solutions.  All rights reserved.
 * If you do not own a commercial license, this file shall be governed by the
 * GNU General Public License (GPL) version 3.
 * For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
 */
(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        template = kendo.template("<ul>" +
            "<li class='k-state-active'>" +
            "<span class='k-link k-state-selected k-state-focused'>" +
            "# if (imageUrl) { #" +
            "<img class='k-image' alt='' src='#= imageUrl #'/>" +
            "# } #" +
            "# if (cssClass) { #" +
            "<div class='k-sprite #= cssClass #'></div>" +
            "# } #" +
            "#= title #" +
            "</span>" +
            "</li>" +
            "</ul>");

    var OBPanel = Widget.extend({
        wrapper: undefined,
        init:    function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            element = that.element;
            var parent = element.parent();
            options = that.options;
            that.wrapper = $(template(options));
            element.before(that.wrapper);
            that.wrapper.find("span").after(element);
            that.wrapper.kendoPanelBar({});
            if (options.content) {
                $(element).load(options.content);
            }
        },
        options: {
            name:     "OBPanel",
            title:    "Panel",
            imageUrl: null,
            cssClass: null,
            content:  null
        },
        events:  [
        ]
    });
    ui.plugin(OBPanel);
})(jQuery);