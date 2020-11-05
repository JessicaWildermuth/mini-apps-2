/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

const Pagination = (props) => (
  <div id="nav">
    <button type="button" id={props.first} className="first" onClick={props.changePage}>First</button>
    <button type="button" id={props.previous} className="previous" onClick={props.changePage}>Previous</button>
    <button type="button" id={props.next} className="next" onClick={props.changePage}>Next</button>
    <button type="button" id={props.last} className="last" onClick={props.changePage}>Last</button>
  </div>
);

export default Pagination;
