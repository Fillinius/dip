import React from 'react';
import PropTypes from 'prop-types';
import QualitiesList from './qualities/qualitiesList';

const QualityCard = ({ furniture }) => {
  return (
    <div className="card">
      <div className="card-boby">
        <div className="class-text">
          <h3>Cписок возможных цветов</h3>
          <QualitiesList qualities={furniture.qualities} />
        </div>
      </div>
    </div>
  );
}
QualityCard.propTypes = {
  furniture: PropTypes.object
}
export default QualityCard;
