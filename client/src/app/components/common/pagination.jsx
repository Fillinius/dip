import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, size, onPageChange, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / size)
  // Получение массива через цикл (можно lodash метод range)
  const arrayPage = []
  for (let i = 1; i <= pageCount; i++) {
    arrayPage.push(i)
  }
  if (pageCount === 1) return null // условие если на стр меньше объектов чем число pageCount
  return (
    <nav >
      <ul className="pagination">
        {arrayPage.map((page) => (
          <li
            key={'page' + page}
            className={'page-item ' + (page === currentPage ? 'active' : '')}>
            <a
              onClick={() => onPageChange(page)}
              className="page-link">{page}
            </a>
          </li>))}
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}
export default Pagination;
