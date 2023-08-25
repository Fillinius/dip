import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SelectField from '../common/form/selectField';
import { deliveryList } from '../../utils/deliveryList';
import RadioField from '../common/form/radioField';
import { floorList } from '../../utils/floorList';
import CheckBoxField from '../common/form/checkBoxField';

const OrderForm = () => {
  const [data, setData] = useState({
    email: '',
    text: '',
    deliveryType: '',
    needLiftFloor: 'no',
    agreement: false
  })
  // console.log(data);
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const handleReturnBasket = () => {
    history.push('/basket')
  }
  const handleChange = ({ target }) => {
    setData((prevstate) => ({
      ...prevstate,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    email: {
      isRequared: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    text: {
      isRequared: {
        message: 'Поле обязателено для заполнения'
      },
      isCapitalSymbol: {
        message: 'Поле должено содержать заглавные буквы'
      },
      // isContainDigit: {
      //   message: 'Пароль должен содержать хотя бы одно число'
      // },
      minWord: {
        message: 'Пароль должен состоями минимум из 3 символов',
        value: 3
      }
    },
    deliveryType: {
      isRequared: {
        message: 'Поле обязательно для заполнения'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()

    if (!isValid) return
    console.log(data)
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 .offset-md-3 shadow p-4'>
          <form onSubmit={handleSubmit}>
            <h3>Оформление заказа</h3>
            <TextField
              label="ФИО"
              type="text"
              name="text"
              value={data.text}
              onChange={handleChange}
              error={errors.text} />
            <TextField
              label="Электронная почта"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email} />
            <SelectField
              label='Вид доставки'
              name='deliveryType'
              value={data.deliveryType}
              onChange={handleChange}
              options={deliveryList}
              error={errors.deliveryType}
              defaultOption='Выберите вариант доставки' />
            <RadioField
              label='Нужен подъем на этаж?'
              options={floorList}
              name='needLiftFloor'
              value={data.needLiftFloor}
              onChange={handleChange}
            />
            <CheckBoxField
              name='agreement'
              value={data.agreement}
              onChange={handleChange}
            ><a>Согласие на отбработку персональных данных</a></CheckBoxField>
            <button
              type='submit'
              disabled={!isValid}
              className='btn btn-primary'
            >Оформить</button>
          </form>
          <button onClick={handleReturnBasket} className='btn btn-danger'>Вернуться к заказу</button>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
