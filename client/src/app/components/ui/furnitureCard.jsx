import React from 'react';
import Type from '../ui/type';
import PropTypes from 'prop-types';

const FurnitureCard = ({ furniture }) => {
  return (
    <div className="card">
      {furniture && (<>
        <img src={furniture.image} className="card-img-top" alt="Foto furniture" style={{ height: '500px' }} />
        <div className="card-boby">
          <div className="class-text">
            <h2>Тип товара- (<Type type={furniture.type} />) </h2>
            <p>Название товара -{furniture.name} </p>
            <p>Стоимость товара - {furniture.price},00 руб.</p>
          </div>
        </div>
      </>)}
    </div>
  );
}
FurnitureCard.propTypes = {
  furniture: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default FurnitureCard;
