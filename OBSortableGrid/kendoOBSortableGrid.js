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

    var OBSortableGrid = Widget.extend({
        init:    function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;
            element.addClass("ob-sortablegrid");
            // Decorate element
            $.each(element.children(), function (i, elem) {
                var row = $(elem);
                row.addClass("ob-sortablegrid-row");
                $.each(row.children(), function (j, elem) {
                    var cell = $(elem);
                    cell.addClass("ob-sortablegrid-item");
                    cell.data("uid", kendo.guid());
                });
            });
            var items = $(".ob-sortablegrid-item", element);
            items.kendoDraggable({
                container:  $(".ob-sortablegrid"),
                hint:       options.hint,
                dragstart:  function (ev) {
                    ev.currentTarget.addClass("ob-sortablegrid-original");
                },
                dragend:    function (ev) {
                    ev.currentTarget.removeClass("ob-sortablegrid-original");
                    this.hint.hide();
                },
                dragcancel: function (ev) {
                    ev.currentTarget.removeClass("ob-sortablegrid-original");
                }
            });
            items.kendoDropTarget({
                dragenter: function (ev) {
                    var drop = this.element;
                    var drag = ev.draggable.currentTarget;
                    if (drop.data("uid") !== drag.data("uid")) {
                        var left = drag.position().left - drop.position().left;
                        var top = drag.position().top - drop.position().top;
                        if (Math.abs(left) > Math.abs(top)) {
                            if (left > 0) {
                                drag.insertBefore(drop);
                            } else {
                                drag.insertAfter(drop);
                            }
                        } else {
                            if (top > 0) {
                                drag.insertBefore(drop);
                            } else {
                                drag.insertAfter(drop);
                            }
                        }
                    }
                }
            });
            $(".ob-sortablegrid-row", element).kendoDropTarget({
                dragenter: function (ev) {
                    var drop = this.element;
                    var drag = ev.draggable.currentTarget;
                    drop.append(drag);
                }
            });

        },
        options: {
            name: "OBSortableGrid",
            hint: function (element) {
                var width = element.width();
                var height = element.height();
                var clone = element
                    .clone()
                    .addClass("ob-sortablegrid-clone")
                    .width(width)
                    .height(height);
                element.addClass("ob-sortablegrid-original");
                return clone;
            }
        },
        events:  [
        ]
    });
    ui.plugin(OBSortableGrid);
})(jQuery);