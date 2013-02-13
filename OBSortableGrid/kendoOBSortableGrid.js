/*
 * Copyright (c) 2012. OnaBai Software Solutions.  All rights reserved.
 * If you do not own a commercial license, this file shall be governed by the
 * GNU General Public License (GPL) version 3.
 * For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
 */

(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    /**
     * Remove empty rows. Check every row in a sortable widget checking for empty
     * and removing it.
     * @param element Element belonging to a kendoSortable.
     * @private
     */
    function _cleanUnused(element) {
        var sortable = element.element.closest(".ob-sortable-grid");
        $.each(sortable.children(), function (idx, elem) {
            var row = $(elem);
            if (row.children().length === 1) {
                row.remove();
            }
        });
    }

    /**
     * Insert a new row.
     * @param ev Event.
     * @private
     */
    function _newRow(ev) {
        var drop = this.element;
        var drag = ev.draggable.currentTarget;
        if (drop.data("uid") !== drag.data("uid")) {
            var div = $("<div class='ob-sortable-grid-row'></div>");
            div.append(drag);
            var separator = $("<div class='ob-sortable-grid-separator'></div>");
            separator.kendoDropTarget({
                drop:_newRow
            });
            div.append(separator);
            div.insertAfter(drop.parent());
            _cleanUnused(this)
        }
    }

    var OBSortableGrid = Widget.extend({
        init   :function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;
            element.addClass("ob-sortable-grid");

            // Decorate element
            $.each(element.children(), function (i, elem) {
                var row = $(elem);
                row.addClass("ob-sortable-grid-row");
                $.each(row.children(), function (j, elem) {
                    var cell = $(elem);
                    cell.addClass("ob-sortable-grid-item");
                    cell.data("uid", kendo.guid());
                });
                row.append("<div class='ob-sortable-grid-separator'></div>");
            });

            var items = $(".ob-sortable-grid-item", element);

            items.kendoDraggable({
                hint:options.hint
            });

            items.kendoDropTarget({
                drop:function (ev) {
                    var drop = this.element;
                    var drag = ev.draggable.currentTarget;
                    if (drop.data("uid") !== drag.data("uid")) {
                        if (drag.position().left > drop.position().left) {
                            drag.insertBefore(drop);
                        } else {
                            drag.insertAfter(drop);
                        }
                    }
                    _cleanUnused(this);
                }
            });

            $(".ob-sortable-grid-row", element).kendoDropTarget({
                drop:function (ev) {
                    var drop = $(".ob-sortable-grid-separator", this.element);
                    var drag = ev.draggable.currentTarget;
                    drag.insertBefore(drop);
                    _cleanUnused(this);
                }
            });

            $(".ob-sortable-grid-separator", element).kendoDropTarget({
                drop:_newRow
            });
        },
        options:{
            name:"OBSortableGrid",
            hint:function (element) {
                return element.clone().addClass("ob-sortable-grid-item-being-dragged");
            }
        },
        events :[
        ]
    });
    ui.plugin(OBSortableGrid);
})(jQuery);
