import React from 'react';
import PropTypes from 'prop-types';
import FurnitureCard from '../ui/furnitureCard';
import QualityCard from '../ui/qualityCard';
import SizeCard from '../ui/sizeCard';
import Comments from '../common/comments/comments';
import { getUserId } from '../../services/localstorage.service';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersById } from '../../store/users';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { removeFurniturs } from '../../store/furniturs';

const FurniturePage = ({ furniture }) => {
  const userId = getUserId()
  const userById = useSelector(getUsersById(userId))
  const dispatch = useDispatch()
  const { furnitureId } = useParams()
  const history = useHistory()
  const handleDeleteFurniturs = () => {
    dispatch(removeFurniturs(furnitureId))
  }
  const handleChangeFurniturs = () => {
    history.push(`${furnitureId}/edit`)
    // history.push(`/edit`)
  }
  return (
    <div className='container'>
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
