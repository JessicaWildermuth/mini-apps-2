import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-10-01&end=2020-11-01',
    })
      .then((reponse) => {
        console.log(reponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        REACT SUCCESSFULLY BUNDLED AND RENDERED
      </div>
    );
  }
}

export default App;
