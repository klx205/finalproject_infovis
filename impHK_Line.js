(function(){// set the dimensions and margins of the graph
var margin = { top: 50, right: 30, bottom: 30, left: 100 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// read the data

var years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
var values = [63205760.0, 85996782.0, 63792750.0, 23683550.0, 27645833.0, 17172087.0, 17570085.0, 19954900.0, 20049543.0, 24408096.0, 19686000.0]
var data = years.map((year, index) => {
    return { date: new Date(year, 0, 1), value: values[index] };
});

// add title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("China's imports from Hong Kong");

// add x axis
var x = d3.scaleTime()
    .domain(d3.extent(data, function (d) { return d.date; }))
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// add x axis label
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top - 20)
    .text("Year");

// add y axis
var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return +d.value; })])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));
// add y axis label
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top - 20)
    .text("Total trade volume (USD)");
// add the line
svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.value) })
    );})();
