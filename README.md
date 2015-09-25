# colm.js
Colm provides responsive columns (like Pinterest or Masonry) with minimal setup.

## Basic usage
* Download `colm.js` to your script directory.
* Add `<script type="text/javascript" src="path/to/colm.js"></script>` anywhere in your HTML.
* Add `data-colm-width="[desired column width in pixels]"` to the container element or elements which you wish to convert into columns.

You are done. No other files to import, no javascript to call. 

You can now use regular CSS, including `@media` queries to control the width of your container(s) and hence the actual number and width of columns. When the window is resized, colm checks if the number of column needs to be changed, and if so, lays out the elements again.

## What just happened
Colm scans your HTML for elements containing the `data-colm-width` attribute, and lays out all their immediate children into the number of columns that best fit the desired column width. This is achieved by placing the appropriate number of simple `<div>` elements into the container to represent columns, and then looping through all the original children and placing each into the shortest column. 


## Advanced usage
* Use `colm()` to layout any newly added column containers
* Use `colm.appendTo(selector,content)` to add new children to a container. Content can be a single element, an array or node list of elements or an HTML string.
* Use the `data-colm-place` attribute on child elements to force them into a particular column. Use negative numbers for counting from the right. The most useful values are `"1"` and `"-1"`, especially when used on the first few children. This can be used to place content reliably in top left and right corners, and gracefully collapse it into a single column on narrower displays.

## Things to consider
* Colm sizes all columns equally, dividing up all the container width. This may cause your columns to have varying widths in different contexts. If you want to have fixed column widths, use CSS including `@media` queries on the container to set its width to multiples of the desired column width.
* Colm changes your HTML by inserting a `<div>` element between your container and its children (but may not run at all if e.g. JavaScript is disabled in a browser). Bear this in mind when constructing CSS selectors.
* Colm doesn't resize the children in any way. Things will work best on all browsers if all the children are regular block elements.
