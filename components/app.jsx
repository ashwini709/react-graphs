import React from "react";
import ReactDom from 'react-dom';

import d3Chart from '../graphs/d3Chart.js';

const data = [
  { id: '1', x: 2010, y: 50 },
  { id: '2', x: 2011, y: 60 },
  { id: '1', x: 2016, y: 80 },
  { id: '2', x: 2015, y: 60 },
  { id: '1', x: 2018, y: 90 },
  { id: '2', x: 2020, y: 20 },
  { id: '1', x: 2017, y: 50 },
  { id: '2', x: 2013, y: 40 },
  { id: '1', x: 2016, y: 80 },
  { id: '2', x: 2010, y: 30 }
]

class App extends React.Component {


  componentDidMount() {
    this.DOMNode = ReactDom.findDOMNode(this);
    d3Chart.create(this.DOMNode, {
      width: '600',
      height: '300'
    }, this.getChartState());
  }

  componentDidUpdate() {
    d3Chart.update(this.DOMNode, this.getChartState());
  }

  getChartState() {
    return {
      data: data,
      domain: {x: [new Date('Jan 01, 2010'), new Date('Jan 01, 2020')], y: [100, 0]}
    };
  }

  componentWillUnmount() {
    d3Chart.destroy(this.DOMNode);
  }

  render() {
    return (
      <div className="react-graphs-app">
        <div className="chart"></div>
      </div>
    );
  }
}

export default App;
