import React, { useEffect, useState } from 'react';
import Counter from '../components/common/counter';
import StatusBuyItems from '../components/common/statusBuyItems';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserData } from '../store/users';
import { cleaningItemBasket, getbasket, removeItemBasket } from '../store/basket';

const Basket = () => {
  const furnitursBasket = useSelector(getbasket())
  const [furniturs, setFurniturs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (furniturs && furnitursBasket) {
      setFurniturs(furnitursBasket)
    }
  }, [furnitursBasket, furniturs])
  useEffect(() => {
    if (furniturs && isLoading) {
      setIsLoading(false)
    }
  }, [furniturs])
  const currentUser = useSelector(getCurrentUserData())

  if (furniturs) {
    useEffect(() => {
      setTotal(furniturs.reduce((acc, item) => {
        return acc + item.price
      }, 0))
    }, [furniturs])
  }

  const handleDeleteItem = (id) => {
    dispatch(removeItemBasket(id))
  }
  const hahdleReset = () => {
    dispatch(cleaningItemBasket())
  }
  const renderitemsList = () => {
    return furniturs && (
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
        <h3>Итоговая стоимость: {total} руб.</h3>
        <button
          className='btn btn-secondary'
          onClick={hahdleReset}>Очистка корзины</button>
        {currentUser
          ? (<Link to='/basket/order'>Оформить заказ</Link>)
          : <Link to='/Login'>Оформить заказ</Link>}
      </div>
    )
  }
  if (furniturs) {
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
    <>
      {
        <div className='m-5'>
          <h1>Корзина</h1>
          <span className={'badge' + (furniturs ? 'bg-primary' : 'bg-danger')}>Вы еще не положили товары в корзину</span>
        </div>
      }
    </>
  )
}

export default Basket;
