(function () {// set the dimensions and margins of the graph
    var width = 450
    var height = 450
    var margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    var data = {
        "food": 9363548.0,
        "chemicals/plastics": 17124019.0,
        "wood/metals": 23588164.0,
        "textiles": 5505690.0,
        "machinery/transportation": 202734668.0,
        "misc": 12720305.0
    }

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#my_dataviz2")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) { return d[1]; })
    var data_ready = pie(Object.entries(data))
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d) { return (color(d.data[0])) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    // Add a label
    svg.append("text")
        .attr("x", 0)
        .attr("y", -height / 2 - 10 + margin)
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .text("Exports to Hong Kong (2022)");

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
        .selectAll('mySlices')
        .data(data_ready)
        .enter()
        .append('text')
        .text(function (d) { return d.data[0] })
        .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", 15)

    // Adjust the position of the "textiles" label
    svg.selectAll('text')
        .filter(function (d) { return d && d.data.key === "textiles"; })
        .attr("transform", function (d) {
            var pos = arcGenerator.centroid(d);
            pos[1] -= 50; // move 20 pixels higher
            return "translate(" + pos + ")";
        });

    svg.selectAll('text')
        .filter(function (d) { return d && d.data.key === "food"; })
        .attr("transform", function (d) {
            var pos = arcGenerator.centroid(d);
            pos[1] -= 20; // move 20 pixels higher
            return "translate(" + pos + ")";
        });
})();