import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Search from '../ui/search';
import Loader from '../../utils/loader';
import Pagination from '../common/pagination';
import GroupList from '../common/groupList';
import paginate from '../../utils/paginate';
import { useType } from '../../hooks/useType';
import { useSize } from '../../hooks/useSize';
import { useSelector } from 'react-redux';
import { getFurniturs } from '../../store/furniturs';
import FurnitursListPage from './furnitursListPage';
import { useParams, Link } from 'react-router-dom';
import { getUserId } from '../../services/localstorage.service';
import { getUsersById } from '../../store/users';

const FurnitursList = () => {
  const furniturs = useSelector(getFurniturs())
  const userId = getUserId()
  const userById = useSelector(getUsersById(userId))
  const { furnitursId } = useParams()
  const { types, isLoading: isLoadingType } = useType()
  const { sizes, isLoading: isLoadingSizes } = useSize()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  // Блок поиска по тексту
  const handleChangeSearch = ({ target }) => {
    setSearch(target.value)
  }
  // Блок для поиска товаров
  const filterSearchText = furniturs.filter((furniture) => (
    furniture.name.toLowerCase().includes(search.toLowerCase()))
  )
  // счетчик страниц пагинация
  const count = furniturs.length
  const pageSize = 4 // число товаров на стр
  const handleChangePage = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const userCrop = paginate(furniturs, currentPage, pageSize)
  // ф-я покупки товара
  const handleBuy = () => {
    console.log('click');
    const furnitursBuy = furniturs.find((f) => f._id === furnitursId)
    console.log(furnitursBuy);
  }
  return (
    <>
      <div className='d-flex'>

        {!isLoadingType && !isLoadingSizes && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList types={types} sizes={sizes} />
          </div>)}
        <div className="d-flex flex-column ">
          <Search
            type="text"
            value={search}
            onChange={handleChangeSearch}
          />
          {userById && userById.name === 'Администратор' && (<><hr />
            <h3>Создание нового товара</h3>
            <Link to={'/registrationProduct'}>Создать новый товар</Link>
            <hr />
          </>)}
          {furniturs.length > 0
            ? <>
              <div className="d-flex col">
                <FurnitursListPage furnitustList={search === '' ? userCrop : filterSearchText} onChange={handleBuy} />
              </div>
              <div className="d-flex justify-content-center">
                <Pagination
                  itemsCount={search === '' ? count : filterSearchText}
                  size={pageSize}
                  currentPage={currentPage}
                  onPageChange={handleChangePage} />
              </div>
            </>
            : <Loader />
          }
        </div>

      </div >

    </>

  );
}
FurnitursList.propTypes = {
  furniturs: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default FurnitursList;
