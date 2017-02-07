import React from "react";
import ReactDom from 'react-dom';

import d3Chart from '../graphs/d3Chart.js';

const data = [
  { id: '1', x: 10, y: 50 },
  { id: '2', x: 20, y: 60 },
  { id: '1', x: 30, y: 80 },
  { id: '2', x: 40, y: 60 },
  { id: '1', x: 50, y: 90 },
  { id: '2', x: 60, y: 20 },
  { id: '1', x: 70, y: 50 },
  { id: '2', x: 80, y: 40 },
  { id: '1', x: 90, y: 80 },
  { id: '2', x: 100, y: 30 }
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
      domain: {x: [0, 100], y: [100, 0]}
    };
  }

  componentWillUnmount() {
    d3Chart.destroy(this.DOMNode);
  }

  render() {
    return (
      // <div className="react-graphs-app">
      <div className="chart"></div>
      // </div>
    );
  }
}

export default App;
