import React, { useEffect } from 'react';
import FurnitursList from '../components/page/furnutursList';
import { useParams } from 'react-router-dom';
import Furniture from '../components/ui/furniture';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatusFurnitur, loadFurnitursList } from '../store/furniturs';
// import EditFurniturePage from '../components/page/editFurniturePage';

const Furniturs = () => {
  const { furnitureId } = useParams()
  const dataStatus = useSelector(getDataStatusFurnitur())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadFurnitursList)
    }
  }, [])
  if (!dataStatus) return 'Loading furniturs...'
  return (<>
    {furnitureId
      ? (<Furniture id={furnitureId} />)
      : (<FurnitursList />)
    }
  </>
  );
}
export default Furniturs;
