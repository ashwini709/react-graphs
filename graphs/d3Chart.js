// reference: https://bost.ocks.org/mike/bar/3/
// http://codepen.io/ajskelton/pen/Lkniv

var d3 = require("d3");

require('../styles/d3Chart.less');

var d3Chart = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  //Create the Scale we will use for the Axis
  var xAxisScale = d3.scaleUtc()
                      .domain(state.domain.x)
                      .range([0, props.width]);

  //Create the Scale we will use for the Axis
  var yAxisScale = d3.scaleLinear()
                      .domain(state.domain.y)
                      .range([0, props.height]);

  var y1AxisScale = d3.scaleLinear()
                      .domain([10, 0])
                      .range([0, props.height]);

  //Create the Axis
  var xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.timeFormat("%Y"));
  var yAxis = d3.axisLeft(yAxisScale);
  var y1Axis = d3.axisRight(y1AxisScale);

  svg.append("g")
      .attr('class', 'y1-axis')
      .attr("transform", "translate("+props.width+", 0)")
      .call(y1Axis);

  svg.append("g")
      .attr('class', 'y-axis')
      .call(yAxis);

  svg.append("g")
      .attr('class', 'x-axis')
      .attr("transform", "translate(0, "+props.height+")")
      .call(xAxis);

  svg.append('g')
      .attr('class', 'd3-points');

  var clip = svg.append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", props.width)
      .attr("height", props.height);

  svg.append('g')
      .attr('class', 'd3-line-graph')
      .attr("clip-path", "url(#clip)")
      .style("stroke-width",2.5);

  this.update(el, props, state);
};

d3Chart.update = function(el, props, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data, props);

  var linedata = [{ values: state.lineData.map(function(d) { return { date: d.x, value: parseFloat(d.y,10) }; }) }];

  var lineScales = this._lineScales(el, linedata);

  var line = d3.line()
      .x(function(d) { return lineScales.x(d.date); })
      .y(function(d) { return lineScales.y(d.value); });

  this._drawLine(el, line, linedata);
};

d3Chart.destroy = function(el) {

};

d3Chart._drawLine = function(el, line, lineData) {
  var lineGraph = d3.select(el).selectAll(".d3-line-graph");

  var lines = lineGraph.selectAll('.d3-line')
                        .data(lineData)
                        .enter()
                        .append('path')
                        .attr("class", "d3-line")
                        .attr("d", function(d) { return line(d.values[0]); })
                        .transition()
                        .duration(2000)
                        .attrTween('d',function (d) {
                          var interpolate = d3.scaleQuantile()
                                                    .domain([0,1])
                                                    .range(d3.range(1, d.values.length+1));
                          return function(t) {
                            return line(d.values.slice(0, interpolate(t)));
                          };
                        });
};

d3Chart._lineScales = function(el, linedata) {
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scaleUtc()
    .domain([
      d3.min(linedata, function(c) { return d3.min(c.values, function(v) { return v.date; }); }),
      d3.max(linedata, function(c) { return d3.max(c.values, function(v) { return v.date; }); })
    ])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([
      d3.min(linedata, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
      d3.max(linedata, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
    ])
    .range([height, 0]);

  return {x: x, y: y};
};

d3Chart._scales = function(el, domain) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scaleUtc()
    .range([0, width])
    .domain(domain.x);

  var y = d3.scaleLinear()
    .range([0, height])
    .domain(domain.y);

  return {x: x, y: y};
};


d3Chart._drawPoints = function(el, scales, data, props) {
  var g = d3.select(el).selectAll('.d3-points');

  var barWidth = (props.width/data.length);

  var bars = g.selectAll('.d3-bar')
    .data(data, function(d) { return d.id; })
    .enter()
    .append('rect')
    .attr('class', 'd3-bar')
    .attr("x", function (d, i) { return barWidth*i; })
    .attr('width', function(d) { return (barWidth - 1); })
    .attr("y", function(d) { return props.height; })
    .attr('height', function(d) { return 0; })


  bars.transition()
    .duration(1000)
    .delay(100)
    .attr("y", function(d) { return scales.y(d.y); })
    .attr('height', function(d) { return (props.height - scales.y(d.y)); })

  // EXIT
  bars.exit()
      .remove();
};


// Sequential animation
//   var point = g.selectAll('.d3-point')
//     .data(data, function(d) { return d.id; });

//   var barWidth = (props.width/data.length);

//   // ENTER
//   point.enter().append('rect')
//       .attr('class', 'd3-point')
//       .merge(point)
//       .attr("x", function (d, i) { return barWidth*i; })
//       .attr('width', function(d) { return (barWidth - 1); })
//       .attr("y", function(d) { return props.height; })
//       .attr('height', function(d) { return 0; })
//       .transition()
//       .delay(function (d, i) { return i*100; })
//       .attr("y", function(d) { return scales.y(d.y); })
//       .attr('height', function(d) { return (props.height - scales.y(d.y)); })

//   // EXIT
//   point.exit()
//       .remove();
// };

export default d3Chart;
