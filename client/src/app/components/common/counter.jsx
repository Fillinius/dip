import React from 'react';
import PropTypes from 'prop-types'

const Counter = ({ id, name, price, onDelete, count, increment, decrement }) => {
  // блок реализация функционала корзины
  const formatCount = () => {
    return count === 0 ? 'empty ' : count
  }
  const getBagleClasses = () => {
    let classes = 'badge m-2 '
    classes += count === 0 ? 'bg-warning' : 'bg-primary'
    return classes
  }

  return (
    <div className='card'>
      <div className='list-group'>
        <div className='d-flex justify-content-between align-items-center'>
          <span>{name}</span>
          <div>
            <span className={getBagleClasses()}>{formatCount()}</span>
            <button
              className='btn btn-primary btn-sm m-2'
              onClick={() => increment(id)}>+</button>
            <button
              className='btn btn-primary btn-sm m-2'
              onClick={() => decrement(id)}>-</button>
            <span>{`${price} руб.`}</span>
            <button
              type="button"
              className="btn btn-outline-danger m-2"
              onClick={() => onDelete(id)}>delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Counter.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  increment: PropTypes.func,
  decrement: PropTypes.func
}
export default Counter;
