import React from 'react';
import Counter from '../components/common/counter';
import StatusBuyItems from '../components/common/statusBuyItems';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import { getFurniturs } from '../store/furniturs';
import { getCurrentUserData } from '../store/users';

const Basket = () => {
  const furniturs = useSelector(getFurniturs())
  const currentUser = useSelector(getCurrentUserData())
  const totalPrice = furniturs.reduce((acc, item) => {
    return acc + item.price
  }, 0)

  const handleDeleteItem = (id) => {
    // setItems(prevStates => prevStates.filter((prevState) => prevState._id !== id))
  }
  const hahdleReset = () => {
    // setItems([])
  }
  const renderitemsList = () => {
    return furniturs.length !== 0 && (
      <div>
        {furniturs.map((item) => (
          <Counter
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            onDelete={handleDeleteItem}
          />
        ))}
        <h3>Итоговая стоимость: {totalPrice} руб.</h3>
        <button
          className='btn btn-secondary'
          onClick={hahdleReset}>Очистка корзины</button>
        {currentUser
          ? (<Link to='/basket/order'>Оформить заказ</Link>)
          : <Link to='/Login'>Оформить заказ</Link>}
      </div>
    )
  }
  if (furniturs.length !== 0) {
    return (
      <>
        <h1>Корзина</h1>
        <span>
          <StatusBuyItems
            listItem={furniturs.length}
          />
        </span>
        <ul>
          {renderitemsList()}
        </ul>
      </>
    )
  }
  return (
    <div className='m-5'>
      <h1>Корзина</h1>
      <span className={'badge' + (furniturs.length > 0 ? 'bg-primary' : 'bg-danger')}>Вы еще не положили товары в корзину</span>
    </div>
  )
}

export default Basket;
