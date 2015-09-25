# colm.js
Minimal setup pinterest-like columns.

## Basic usage
* Download `colm.js` to your script directory.
* Add `<script type="text/javascript" src="path/to/colm.js"></script>` anywhere in your HTML.
* Add `data-colm-width="[desired column width in pixels]"` to the container element which you wish to convert into columns.

You are done. No other files to import, no javascript to call. 

## What just happened
Colm scans your HTML for elements containing the `data-colm-width` attribute, and lays out all their immediate children into the number of columns that best fit the desired column width. This is achieved by placing the appropriate number of simple `<div>` elements into the container to represent columns, and then looping through all the original children and placing each into the shortest column. 

Use regular CSS, including `@media` queries to control the width of your container and hence the actual number and width of columns. When the window is resized, colm checks if the number of column needs to be changed, and if so, lays out the elements again.

## Advanced usage
* Use `colm()` can be called to layout any newly added column containers
* Use `colm.appendTo(selector,content)` can be called to add new children to a container. Content can be a single element, an array or node list of elements or an HTML string.
* Use the `data-colm-place` attribute on child elements to force them into a particular column. Use negative numbers for counting from the right. The most useful values are `"1"` and `"-1"`, especially when used on the first few children. This can be used to place content reliably in top left and right corners, and gracefully collapse it into a single column on narrower displays.
