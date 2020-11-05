/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 1,
      first: null,
      previous: null,
      next: null,
      last: null,
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.search = this.search.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  updateSearch(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
  }

  search(e) {
    const { search, currentPage } = this.state;
    let url;
    if (!e.id) {
      e.preventDefault();
      url = `http://localhost:3000/events?_page=${currentPage}&q=${search}`;
    } else {
      url = e.id.slice(2, -1);
    }
    axios({
      method: 'get',
      url: url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        const { offset, perPage } = this.state;
        const { data } = response;
        let hasNext = true;
        if (!response.headers.link.includes('next')) {
          hasNext = false;
        }
        console.log(hasNext);
        const pages = response.headers.link.split(',');
        const links = [];
        for (let i = 0; i < pages.length; i += 1) {
          links.push(pages[i].split(';')[0]);
        }
        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((pd) => (
          <>
            <p>
              {pd.date}
              {pd.description}
            </p>

          </>
        ));
        let previous;
        let next;
        let last;
        if (links.length < 4 && hasNext) {
          previous = links[0];
          next = links[1];
          last = links[2];
        } else if (!hasNext) {
          previous = links[1];
          next = null;
          last = links[2];
        } else {
          previous = links[1];
          next = links[2];
          last = links[3];
        }
        this.setState({
          first: ` ${links[0]}`,
          previous,
          next,
          last,
        });

        this.setState({
          pageCount: Math.ceil(data.length / perPage),

          postData,
        });
      });
  }

  changePage(e) {
    const url = (e.target);
    this.search(url);
  }

  render() {
    const {
      search, postData, first, next, last, previous,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.search}>
          <label htlmfor="search"> Search For Historical Event </label>
          <input type="text" value={search} onChange={this.updateSearch} />
          <input type="submit" onSubmit={this.search} />
        </form>
        <div>
          {postData}
        </div>
        <div id="nav">
          <button type="button" id={first} className="first" onClick={this.changePage}>First</button>
          <button type="button" id={previous} className="previous" onClick={this.changePage}>Previous</button>
          <button type="button" id={next} className="next" onClick={this.changePage}>Next</button>
          <button type="button" id={last} className="last" onClick={this.changePage}>Last</button>
        </div>
      </div>
    );
  }
}

export default App;
