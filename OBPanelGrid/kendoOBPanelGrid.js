/*
 * Copyright (c) 2012-2013. OnaBai Software Solutions.  All rights reserved.
 * If you do not own a commercial license, this file shall be governed by the
 * GNU General Public License (GPL) version 3.
 * For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
 */
(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var OBPanelGrid = Widget.extend({
        init:    function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            console.log("is", that.element, that.element.is("ul"));
            element = that.element;
            options = that.options;
            element.addClass("ob-panelgrid k-popup");
            // Create columns and move PanelBars into them
            $.each(options.columns, function (i, col) {
                var div = $("<div class='k-widget ob-panelgrid-row'></div>");
                $.each(col, function (j, panel) {
                    div.append(panel.hasClass("k-panelbar") ? panel : panel.closest("ul"));
                });
                element.append(div);
            });
            element.kendoOBSortableGrid(options);
        },
        options: {
            name:    "OBPanelGrid",
            columns: []
        },
        events:  [
        ]
    });
    ui.plugin(OBPanelGrid);
})(jQuery);