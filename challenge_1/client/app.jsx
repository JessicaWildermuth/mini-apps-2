/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: null,
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.search = this.search.bind(this);
  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
  }

  search(e) {
    e.preventDefault();
    const { search } = this.state;
    console.log(search);
    axios({
      method: 'get',
      url: `http://localhost:3000/events?q=${search}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        console.log(response.data);
      });
  }

  render() {
    const { search } = this.state;
    return (
      <div>
        <form onSubmit={this.search}>
          <label htlmfor="search"> Search For Historical Event </label>
          <input type="text" value={search} onChange={this.updateSearch} />
          <input type="submit" onSubmit={this.search} />
        </form>
      </div>
    );
  }
}

export default App;
