import React from 'react';
import PropTypes from 'prop-types';
import Type from './types';

const TypesList = ({ types }) => {
  return (
    <div>
      {types.map((i) => (
        <span key={i._id}> <Type {...i} /> </span>
      ))}
    </div>
  );
}
TypesList.propTypes = {
  types: PropTypes.array
}

export default TypesList;
