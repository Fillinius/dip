import React from 'react';
import PropTypes from 'prop-types'

const Search = ({ type, value, onChange }) => {
  return (
    <div className='search'>
      <form className="d-flex ms-2" role="search">
        <label htmlFor="search"></label>
        <input
          type={type}
          id="search"
          value={value}
          placeholder="Search for name..."
          onChange={onChange}
          className="btn btn-outline-success" />
      </form>
    </div>
  );
}

Search.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}
export default Search;

/*
 Name:
       <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
*/
