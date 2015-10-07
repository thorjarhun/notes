var bodySelection = d3.select("body");

var svgContainer = bodySelection.append("svg")
                                .attr("width", 200)
                                .attr("height", 200)
                                .style("border", "1px solid black");

var circ;
/*
var circ = svgContainer.selectAll("circle")
                       .data(spaceCircles);

var circles = circ.enter()
                  .append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return d; })
                       .attr("cy", function (d) { return d; })
                       .attr("r", 20 );
*/

var spaceCircles = [30, 70, 110];
console.log('spaceCircles : ', spaceCircles);
console.log('circ = svgContainer.selectAll("circle").data(spaceCircles) : ',
            circ = svgContainer.selectAll("circle")
                               .data(spaceCircles));
console.log('circ.enter().append("circle") : ',
            circ.enter()
                .append("circle"));
spaceCircles = [30, 110];
console.log('spaceCircles : ', spaceCircles);
console.log('circ.exit() : ', circ.exit());
console.log('circ = svgContainer.selectAll("circle").data(spaceCircles) : ',
            circ = svgContainer.selectAll("circle")
                               .data(spaceCircles));
console.log('circ.exit() : ', circ.exit());

spaceCircles = [30, 80, 110];
console.log('spaceCircles : ', spaceCircles);
console.log('circ.enter() : ', circ.enter());
console.log('circ = svgContainer.selectAll("circle").data(spaceCircles) : ',
            circ = svgContainer.selectAll("circle")
                               .data(spaceCircles));
console.log('circ.enter() : ', circ.enter());

spaceCircles = [30, 40, 80, 110];
console.log('spaceCircles : ', spaceCircles);
console.log('circ.enter() : ', circ.enter());
console.log('circ = svgContainer.selectAll("circle").data(spaceCircles) : ',
            circ = svgContainer.selectAll("circle")
                               .data(spaceCircles));
console.log('circ.enter() : ', circ.enter());
/*
circles.attr("cx", function (d) { return d; })
       .attr("cy", function (d) { return d; })
       .attr("r", 20 );
*/