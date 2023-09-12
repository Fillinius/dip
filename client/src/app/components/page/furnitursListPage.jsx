import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const FurnitursListPage = ({ furnitustList }) => {
  // const history = useHistory()
  // ${history.location.pathname}
  return (
    <>
      {furnitustList ? (furnitustList.map((furniture) => (
        <Link key={furniture._id} to={`/furniturs/${furniture._id}`} >
          <img className="w-50 h-50" src={furniture.image} alt="foto" />
          <h5>{furniture.name}</h5>
          <p>Описание товара и прочее</p>
          <p>{furniture.price},руб.</p>
        </Link>
      ))
      ) : 'Loading list...'}</>
  );
}
FurnitursListPage.propTypes = {
  furnitustList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func
}
export default FurnitursListPage;
