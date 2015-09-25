# Colm - Column maker
Colm provides responsive columns (like Pinterest or Masonry) with minimal setup.

For demos and more, visit [Colm's website](http://zocky.github.io/colm.js).

## Basic usage
* Download `colm.js` to your script directory.
* Add `<script type="text/javascript" src="path/to/colm.js"></script>` anywhere in your HTML.
* Add `data-colm-width="[desired column width in pixels]"` to the container element or elements which you wish to convert into columns.
* Optionally add `data-colm-align-columns` and `data-colm-align-items` attributes to the container. See [Advanced usage](#advanced-usage) for details.

You are done. No other files to import, no javascript to call. 

You can now use regular CSS, including `@media` queries to control the width of your container(s) and hence the actual number and width of columns. When the window is resized, colm checks if the number of column needs to be changed, and if so, lays out the elements again.

## How does it look?
See [the demo](http://zocky.github.io/colm.js/demo).

## What just happened
Colm scans your HTML for elements containing the `data-colm-width` attribute, and lays out all their immediate children into the number of columns that best fit the desired column width. This is achieved by placing the appropriate number of simple `<div>` elements into the container to represent columns, and then looping through all the original children and placing each into the shortest column. 

## Advanced usage

### <code>colm()</code>
Use `colm()` to programmatically trigger layouting on the page. This is automatically called on page load and resize.

### <code>colm.appendTo(*selector*,*content*)</code>
Use `colm.appendTo` to add new children to a container. Content can be a single element, an array or node list of elements or an HTML string.

### <code>data-colm-align-columns="*alignment*"</code>
Use the `data-colm-align-columns` attribute on the container element to control distribution of left over space, if the width of the container isn't an exact multiple of the column width.
Can have the following values: 
* `left` aligns columns to the left of the container
* `right` aligns columns to the right of the container
* `center` centers columns horizontally within the container
* `justify` adds equal space between columns
* `space` adds equal space between and around columns
* `stretch` stretches columns to fill the container

### <code>data-colm-align-items="*alignment*"</code>
Use the `data-colm-align-columns` attribute on the container element to control distribution of left over space within each column.
Can have the following values: 
* `top` aligns items to the top of the column
* `bottom` aligns items to the bottom of the column
* `center` centers items vertically within the container
* `justify` adds equal space between items
* `space` adds equal space between and around items
* `stretch` stretches items to fill the column

### <code>data-colm-min-width="*width in pixels*"</code>
Use the `data-colm-min-width` attribute on the container element if you want to allow your columns to shrink somewhat to fit another column in the container. 

### <code>data-colm-place="*column*"</code>
Use the `data-colm-place` attribute on child elements to force them into a particular column. Use negative numbers for counting from the right. The most useful values are `"1"` and `"-1"`, especially when used on the first few children. This can be used to place content reliably in top left and right corners, and gracefully collapse it into a single column on narrower displays.

## Things to consider
* Colm doesn't provide explicit spacing or gutters. Use CSS, especially `margin` on child elements to control spacing. Alternatively, set your container widths exactly and use `justify` or `space` column alignment. 
* Colm doesn't resize the children in any way. Things will work best on all browsers if all the children are regular block elements.
* Colm changes your HTML by inserting a `<div>` element between your container and its children (but may not run at all if e.g. JavaScript is disabled in a browser). Bear this in mind when constructing CSS selectors.
* The container is assigned the attribute `data-colm-columns` with the current number of columns. Individual columns are assigned attributes `data-colm-column` (column number), as well as `data-colm-first`, `data-colm-not-first`, `data-colm-last` and `data-colm-not-last` as appropriate. You can use these to style columns. Try things like:
````
  #content > [data-colm-column] { 
    border-left: solid 1px silver;
  }
  #content[data-colm-columns="1"] .hide-on-narrow { 
    display:none;
  }
  #content > [data-colm-not-first] { 
    border-left: solid 1px silver;
  }
````
