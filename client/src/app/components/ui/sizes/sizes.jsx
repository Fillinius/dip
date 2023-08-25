import React from 'react';
import PropTypes from 'prop-types';

const Size = ({ size, _id }) => {
  return (
    <span key={_id} className='btn btn-outline-dark'> {size}</span>
  );
}
Size.propTypes = {
  size: PropTypes.string,
  _id: PropTypes.string
}

export default Size;
