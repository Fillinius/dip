import React from 'react';
import PropTypes from 'prop-types';
import SizesList from './sizes/sizesList'

const SizeCard = ({ furniture }) => {
  return (
    <div className="card">
      <div className="card-boby">
        {furniture && (<div className="class-text">
          <h3>Cписок возможных размеров</h3>
          {<SizesList sizes={furniture.sizes} />}
        </div>)}
      </div>
    </div>
  );
}
SizeCard.propTypes = {
  furniture: PropTypes.object
}
export default SizeCard;
