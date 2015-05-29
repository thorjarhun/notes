var svg = d3.select("svg");
svg.on("click", function() {
    console.log(d3.mouse(this));
});




var matrix = [
  [ 0,  1,  2,  3],
  [ 4,  5,  6,  7],
  [ 8,  9, 10, 11],
  [12, 13, 14, 15],
];
d3.select("body")
  .append("table")
    .selectAll("tr")
      .data(matrix)
    .enter().append("tr")
      .selectAll("td")
        .data(function(d) { return d; })
      .enter().append("td")
        .text(function(d) { return d; });

var td = d3.selectAll("table tr").selectAll("td");
td.style("color", function(d, i, j) {
                    console.log(d + " in column " + i + " of row " + j);
                    return null;
                  });


var dataset = [ 5, 10, 15, 20, 25 ];
var body = d3.select("body");   // body = [[0: <body>, length: 1, parentNode: <html>], length: 1]
// d3.select("body") !== d3.select("body")
var p = body.selectAll("p");    // p = [[length: 0, parentNode: <body>], length: 1]
// body.selectAll("p") !== body.selectAll("p")
var p_data = p.data(dataset);   // p_data = [[length: 5, parentNode: <body>], length: 1, enter: function, exit: function]
// body[0][0] === p[0].parentNode === p_data[0].parentNode
// p_data.enter() === p_data.enter()
// p_data.exit() === p_data.exit()
var p_data_enter = p_data.enter();  // p_data_enter = [[0: { __data__: 5 }, ..., 4: { __data__: 25 }, length: 5, parentNode: <body>, update: [length:5, parentNode: <body>]]]
// p_data[0] === p_data_enter[0].update
var p_data_enter_p = p_data_enter.append("p");  // this assigns new elements to p_data_enter_p[0] and adds their references to p_data_enter[0].update and p_data[0] but does not modify p
// (p_data[0] === p_data_enter[0].update) !== p_data_enter_p[0]



Notes:
  - .selectAll often preceeds .data for two reasons
    - .selectAll will return a new selection with a parentNode set to the preceeding selection (or the document element if using d3.selectAll)
    - .data uses the selection from .selectAll to create the three virtual selections (enter/update/exit)
  - With .selectAll, every element in the old selection becomes a group in the new selection; each group contains an old element's matching
    descendant elements.
  - Selections returned by d3.select and d3.selectAll have exactly one group and a parentNode set to the document element (document.documentElement).
  - .select preserves the existing grouping because there is exactly one element in the new selection for each element in the old selection. Thus,
    .select also propagates data from parent to child, whereas selectAll does not (hence the need for a data-join)! The parentNode does not change.
  - .append and .insert are wrappers on top of select, so they also preserve grouping and propagate data.

select vs selectAll:
  - select preserves the existing grouping
  - selectAll creates a new grouping
  - calling select preserves the data, index, and even the parent node of the original selection