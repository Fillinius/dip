import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FurniturePage from '../page/furniturePage';
import { useSelector } from 'react-redux';
import { getFurnitursById, getFurnitursLoading } from '../../store/furniturs';

const Furniture = ({ id }) => {
  const history = useHistory()
  const isLoading = useSelector(getFurnitursLoading())
  const furniture = useSelector(getFurnitursById(id))
  const handleReturn = () => {
    history.push('/furniturs')
  }
  return (
    <div className='container'>
      <div>
        {furniture && !isLoading
          ? <FurniturePage furniture={furniture} />
          : `Furniture with id ${id} not found`}
      </div>

      <button
        className="btn btn-primary"
        onClick={handleReturn}
      > Вернуться к списку</button>
    </div>
  );
}
Furniture.propTypes = {
  id: PropTypes.string.isRequired,
  furniturs: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default Furniture;
