import React from "react";
import ReactDom from 'react-dom';

import d3Chart from '../graphs/d3Chart.js';

const data = [
  { id: '5fbmzmtc', x: 7, y: 41 },
  { id: 's4f8phwm', x: 11, y: 45 },
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
      domain: {x: [0, 30], y: [0, 100]}
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
