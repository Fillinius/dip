import React from 'react';
import PropTypes from 'prop-types';
import FurnitureCard from '../ui/furnitureCard';
import QualityCard from '../ui/qualityCard';
import SizeCard from '../ui/sizeCard';
import Comments from '../common/comments/comments';
import { getUserId } from '../../services/localstorage.service';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersById } from '../../store/users';
import { useHistory, useParams } from 'react-router-dom';
import { getFurnitursById, removeFurniturs } from '../../store/furniturs';
import { createItemBasket } from '../../store/basket';

const FurniturePage = ({ furniture }) => {
  const userId = getUserId()
  const userById = useSelector(getUsersById(userId))
  const dispatch = useDispatch()
  const { furnitureId } = useParams()
  const furnitureById = useSelector(getFurnitursById(furnitureId))
  const history = useHistory()

  const handleDeleteFurniturs = () => {
    dispatch(removeFurniturs(furnitureId))
    history.push('/furniturs')
  }
  const handleChangeFurniturs = () => {
    history.push(`${furnitureId}/edit`)
  }

  const handleBuy = () => {
    dispatch(createItemBasket({ ...furnitureById, pageId: furnitureId }))
    history.push('/basket')
  }
  return (
    <div className='container'>
      <button
        className='btn btn-info m-2'
        onClick={handleBuy}
      >Buy</button>
      {userById && userById.name === 'Администратор' && <>  (
        <button
          className='btn btn-success m-2'
          onClick={handleChangeFurniturs}
        >Change</button>
        <button
          className='btn btn-danger m-2'
          onClick={handleDeleteFurniturs}
        >Delete</button>)</>}
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
