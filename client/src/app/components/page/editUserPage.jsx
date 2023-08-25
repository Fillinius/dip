import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserData, getUpdateUserData } from '../../store/users';

const EditUserPage = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUserData())
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState(null)
  const [data, setData] = useState()

  useEffect(() => {
    setData(currentUser)
  }, [currentUser])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

  // блок событие ввода данных в форму
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  // блок отправки данных
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return
    dispatch(getUpdateUserData(data))
  }
  // блок валидации по полю
  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  console.log(errors);
  const isValid = {}
  // const isValid = Object.keys(errors).length === 0

  // блок валидатор
  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна  к заполнению'
      }
    },
    name: {
      isRequired: {
        message: 'Поле обязательно  к заполнению'
      },
      isMinWord: {
        message: 'Имя должено содержать минимум 3 символа',
        value: 3
      }
    }
  }
  return (
    <div className='m-5'>
      {currentUser && !isLoading ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label='Почта'
            value={data.email}
            name='email'
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label='Выберите Ваше имя'
            type='text'
            value={data.name}
            name='name'
            onChange={handleChange}
            error={errors.name}
          />
          <button
            className="btn btn-primary w-100 mx-auto"
            type='submit'
            disabled={!isValid}
          >
            Submit</button>
        </form>
      ) : 'Loading...'
      }
    </div>
  );
}

export default EditUserPage;
