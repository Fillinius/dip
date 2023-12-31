import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, login } from '../../store/users';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const loginError = useSelector(getAuthErrors())
  const history = useHistory()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  // const [enterError, setEnterError] = useState(null)
  const handleChange = ({ target }) => {
    setData((prevstate) => ({
      ...prevstate,
      [target.name]: target.value
    }))
    // setEnterError(null)
  }

  const validatorConfig = {
    email: {
      isRequared: {
        message: 'Электронная почта обязательна для заполнения'
      }
    },
    password: {
      isRequared: {
        message: 'Пароль обязателен для заполнения'
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
    const redirect = history.location.state ? history.location.state.from.pathname : '/furniturs'
    dispatch(login({ payload: data, redirect }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email} />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password} />
      {loginError && (<p className='text-danger'>{loginError}</p>)}
      <button
        type='submit'
        disabled={!isValid}
        className='btn btn-primary'
      >Submit</button>
    </form>
  );
}

export default LoginForm;
