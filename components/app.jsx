import React from "react";
import ReactDom from 'react-dom';

import d3Chart from '../graphs/d3Chart.js';

const data = [
  { id: '1', x: 2010, y: 50 },
  { id: '2', x: 2011, y: 60 },
  { id: '3', x: 2016, y: 80 },
  { id: '4', x: 2015, y: 60 },
  { id: '5', x: 2018, y: 90 },
  { id: '6', x: 2020, y: 20 },
  { id: '7', x: 2017, y: 50 },
  { id: '8', x: 2013, y: 40 },
  { id: '9', x: 2016, y: 80 },
  { id: '10', x: 2010, y: 30 }
]

const lineData = [
  { id: '1', x: 2010, y: 5 },
  { id: '2', x: 2011, y: 10 },
  { id: '3', x: 2012, y: 6 },
  { id: '4', x: 2013, y: 8 },
  { id: '5', x: 2014, y: 0 },
  { id: '6', x: 2015, y: 3 },
  { id: '7', x: 2016, y: 6 },
  { id: '8', x: 2017, y: 8 },
  { id: '9', x: 2018, y: 5 },
  { id: '10', x: 2019, y: 8 }
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
      domain: {x: [new Date('Jan 01, 2010'), new Date('Jan 01, 2020')], y: [100, 0]},
      lineData: lineData
    };
  }

  componentWillUnmount() {
    d3Chart.destroy(this.DOMNode);
  }

  render() {
    return (
      <div className="react-graphs-app" />
    );
  }
}

export default App;
