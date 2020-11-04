/* eslint-disable react/no-unused-state */
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
      currentPage: 0,
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
    if (e) {
      e.preventDefault();
    }
    const { search } = this.state;
    axios({
      method: 'get',
      url: `http://localhost:3000/events?q=${search}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        const { offset, perPage } = this.state;
        const { data } = response;
        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((pd) => (
          <>
            <p>
              {pd.date}
              {'\n'}
              {pd.description}
            </p>
          </>
        ));

        this.setState({
          pageCount: Math.ceil(data.length / perPage),

          postData,
        });
      });
  }

  changePage(e) {
    const { perPage } = this.state;
    const page = e.selected;
    const offset = page * perPage;
    this.setState({
      currentPage: page,
      offset,
    }, () => {
      this.search();
    });
  }

  render() {
    const { search, postData, pageCount } = this.state;
    return (
      <div>
        <form onSubmit={this.search}>
          <label htlmfor="search"> Search For Historical Event </label>
          <input type="text" value={search} onChange={this.updateSearch} />
          <input type="submit" onSubmit={this.search} />
        </form>
        <div>
          {postData}
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.changePage}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    );
  }
}

export default App;
