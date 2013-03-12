KendoUI
=======

This GitHub contains a series of Kendo UI widgets and code utilities that I've developed.

Some of the widgets have been developed trying to solve own problems. Others come from questions
that I receive in my blog: http://onabai.wordpress.com and I have considered general enough to
deserve a public answer.

Contains:

* OBButton : Convenience widget that allows you to create a Button (UI) and assign a handler in
one single action.
* OBSortableGrid : Enable a group of DOM elements to be sortable (similar to jQuery UI sortable
 -http://jqueryui.com/sortable/-). Implemented as a KendoUI widget.
* OBPanel : Create a minimum KendoUI Panel Bar with one single Panel. This is used as a Kendo UI
window but being able of limiting its positioning to float only inside a container element and
resizing its width to 100% of the container.
* OBPanelGrid : Defines a container that are one or more columns and each contain one or more
 KendoOBPanels. OBPanels are draggable between columns allowing users define dynamically a page
 layout.