import React from 'react';
import PropTypes from 'prop-types';
import FurnitureCard from '../ui/furnitureCard';
import QualityCard from '../ui/qualityCard';
import SizeCard from '../ui/sizeCard';
import Comments from '../common/comments/comments';

const FurniturePage = ({ furniture }) => {
  return (
    <div className='container'>
      <FurnitureCard furniture={furniture} />
      <QualityCard furniture={furniture} />
      <SizeCard furniture={furniture} />
      <div>
        <Comments />
      </div>
    </div>
  );
}
FurniturePage.propTypes = {
  furniture: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default FurniturePage;
