import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, loadUsersList } from '../../../store/users';
import { getDataStatusFurnitur, getFurnitursLoading, loadFurnitursList } from '../../../store/furniturs';
import { loadQualitiesList, getQualitiesLoading } from '../../../store/qualities';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const furnitursStatusLoading = useSelector(getFurnitursLoading())
  const qualitiesStatusLoading = useSelector(getQualitiesLoading())
  const dataStatus = useSelector(getDataStatusFurnitur())
  useEffect(() => {
    if (dataStatus) { dispatch(loadQualitiesList()) }

    dispatch(loadFurnitursList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn, dataStatus])

  if (furnitursStatusLoading && qualitiesStatusLoading) return 'Loading furniturs and qualities'
  return (
    children
  );
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default AppLoader;
