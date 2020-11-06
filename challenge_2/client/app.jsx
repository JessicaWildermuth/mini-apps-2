/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import TimeChart from './TimeChart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: null,
      prices: null,
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-10-01&end=2020-11-01',
    })
      .then((response) => {
        this.setState({
          dates: Object.keys(response.data.bpi),
          prices: Object.values(response.data.bpi),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { prices, dates } = this.state;
    if (!prices && !dates) {
      return null;
    }
    return (
      <div>
        <TimeChart prices={prices} dates={dates} />
      </div>
    );
  }
}

export default App;
