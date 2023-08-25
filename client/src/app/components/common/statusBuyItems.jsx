import React from 'react';
import PropTypes from 'prop-types'

const StatusBuyItems = ({ listItem }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) {
      return 'позиций';
    }
    if (lastOne === 1) return 'позиция';
    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'позиции';
    return 'позиция';
  };
  return (
    <h2>
      <span
        className="badge bg-primary"
      >
        {listItem > 0
          ? `${listItem + ' ' + renderPhrase(listItem)}   в твоей корзине`
          : 'Укажите колличество необходимого товара'}
      </span>
    </h2>
  );
};
StatusBuyItems.propTypes = {
  listItem: PropTypes.number.isRequired
}

export default StatusBuyItems;
