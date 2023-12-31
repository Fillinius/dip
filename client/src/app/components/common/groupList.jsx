import React from 'react';
import PropTypes from 'prop-types';
import TypesList from '../ui/types/typesList';
// import SizesList from '../ui/sizes/sizesList';

const GroupList = ({ types, sizes }) => {
  const handleList = () => {
  }
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item active" aria-current="true">Каталог</li>
        <li className="list-group-item">
          По типу
          <button onClick={handleList}></button>
          <TypesList types={types} />
        </li>
      </ul>
    </>
  )
}
GroupList.propTypes = {
  types: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  sizes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
export default GroupList;
