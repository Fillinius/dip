import React, { useState } from 'react';
import PropTypes from 'prop-types'

const Counter = ({ id, name, price, onDelete }) => {
  // блок реализация функционала корзины
  const [count, setCount] = useState(0)
  const formatCount = () => {
    return count === 0 ? 'empty ' : count
  }
  const getBagleClasses = () => {
    let classes = 'badge m-2 '
    classes += count === 0 ? 'bg-warning' : 'bg-primary'
    return classes
  }
  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }
  const handleDecrement = () => {
    count > 0 && setCount((prev) => prev - 1)
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
              onClick={handleIncrement}>+</button>
            <button
              className='btn btn-primary btn-sm m-2'
              onClick={handleDecrement}>-</button>
            <span>{`${price * count} руб.`}</span>
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
  onDelete: PropTypes.func.isRequired
}
export default Counter;
