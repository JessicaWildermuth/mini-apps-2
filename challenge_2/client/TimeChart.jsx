/* eslint-disable react/prop-types */
import React from 'react';
import Chart from 'chart.js';

class TimeChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { current } = this.chartRef;
    const { prices, dates } = this.props;
    this.myChart = new Chart(current, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Price for BitCoin',
          data: prices,
          backgroundColor: [
            'transparent',
          ],
        //  borderWidth: 1,
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }

  render() {
    return (
      <canvas ref={this.chartRef} />
    );
  }
}

export default TimeChart;
