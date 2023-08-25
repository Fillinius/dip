import React from 'react';
import PropTypes from 'prop-types';

const Type = ({ type, _id }) => {
  return (
    <span key={_id} className='btn btn-outline-dark'> {type}</span>
  );
}
Type.propTypes = {
  type: PropTypes.string,
  _id: PropTypes.string
}

export default Type;
