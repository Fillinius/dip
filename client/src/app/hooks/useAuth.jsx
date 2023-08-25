import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import localStorageService, { setTokens } from '../services/localstorage.service';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const histoty = useHistory()

  // ф-я обновления пользователя
  async function updateUserData(data) {
    try {
      const content = await userService.getUpdateCurrentUser(data)
      setCurrentUser(content)
      console.log(content);
    } catch (error) {
      errorCatcher(error)
    }
  }
  // ф-я входа в систему
  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword?`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await getUserData()
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(code, message);
      if (code === 400) {
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = { email: 'Пользователь с такой почтой не зарегистрирован' }
          throw errorObject
        }
        if (message === 'INVALID_PASSWORD') {
          const errorObject = { email: ' Не верный пароль' }
          throw errorObject
        }
        if (message === 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.') {
          const errorObject = { email: 'Слишком много попыток ввода, попробуйте позже ' }
          throw errorObject
        }
      }
    }
  }
  // Ф-я выхода из системы
  function logOut() {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    histoty.push('/furniturs')
  }
  // функция регистрации
  async function singUp({ email, password, ...rest }) {
    const url = `accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        image: `https://avatars.dicebear.com/api/avataaars/${(
          Math.random() + 1
        )
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
      console.log(data);
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      console.log(code, message)
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = { email: 'Пользователь с таким Email уже зарегистрирован' }
          throw errorObject
        }
      }
      // throw new Error
    }
  }
  async function createUser(data) {
    try {
      const content = await userService.create(data)
      setCurrentUser(content)
      console.log(content);
    } catch (error) {
      errorCatcher(error)
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  async function getUserData() {
    try {
      const content = await userService.getCurrentUser()
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else { setIsLoading(false) }
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <AuthContext.Provider value={{ singUp, currentUser, logIn, logOut, updateUserData }}>
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider
