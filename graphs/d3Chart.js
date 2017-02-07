// reference: https://bost.ocks.org/mike/bar/3/

var d3 = require("d3");

require('../styles/d3Chart.less');

var d3Chart = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);


  //Create the Scale we will use for the Axis
  var xAxisScale = d3.scaleLinear()
                          .domain([0, 100])
                          .range([0, 400]);

  //Create the Scale we will use for the Axis
  var yAxisScale = d3.scaleLinear()
                          .domain([100, 0])
                          .range([0, 300]);

  //Create the Axis
  var xAxis = d3.axisBottom(xAxisScale);
  var yAxis = d3.axisLeft(yAxisScale);

  svg.append("g")
      .attr('class', 'y-axis')
      .call(yAxis);

  svg.append("g")
      .attr('class', 'x-axis')
      .attr("transform", "translate(0, "+props.height+")")
      .call(xAxis);

  svg.append('g')
      .attr('class', 'd3-points');

  this.update(el, props, state);
};

d3Chart.update = function(el, props, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data, props);
};

d3Chart.destroy = function(el) {

};

d3Chart._scales = function(el, domain) {
  if (!domain) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scaleLinear()
    .range([0, width])
    .domain(domain.x);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain(domain.y);

  return {x: x, y: y};
};


d3Chart._drawPoints = function(el, scales, data, props) {
  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data, function(d) { return d.id; });

  // ENTER
  point.enter().append('rect')
      .attr('class', 'd3-point')
      .merge(point)
      .attr("x", function(d) { return scales.x(d.x); })
      .attr("y", function(d) { return scales.y(d.y); })
      .attr('width', function(d) { return 42; })
      .attr('height', function(d) { return (props.height - scales.y(d.y)); })

  // EXIT
  point.exit()
      .remove();
};

export default d3Chart;
