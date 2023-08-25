import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, loadUsersList } from '../../../store/users';
import { getFurnitursLoading, loadFurnitursList } from '../../../store/furniturs';
import { loadQualitiesList } from '../../../store/qualities';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const furnitursStatusLoading = useSelector(getFurnitursLoading())
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadFurnitursList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])
  if (furnitursStatusLoading) return 'Loading furniturs'
  return (
    children
  );
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default AppLoader;
