import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'
import authService from '../services/authService'
import localStorageService from '../services/localstorage.service'
import history from '../utils/history'
import { generateAuthError } from '../utils/generateAuthError'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersReguestField: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFaild: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    userLoggedOut: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    userUpdate: (state, action) => {
      // изменяет данные, но не обновляет (обновление вручную)
      // state.entities.find((user) => user._id === action.payload._id)

      // изменяет и сразу обновляет данные
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload
    },
    authRequested: (state) => {
      state.error = null
    },
  },
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceved,
  usersReguestField,
  authRequestSuccess,
  authRequestFaild,
  // userCreated,
  userLoggedOut,
  userUpdate,
} = actions
const authRequested = createAction('users/authRequested')
// const userCreateRequested = createAction('users/usercreateRequested')
// const createUserFailed = createAction('users/createUserFailed')
const userUpdateRequested = createAction('users/userUpdateRequested')
const userUpdateFailed = createAction('users/userUpdateFailed')

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      localStorageService.setTokens(data)
      dispatch(authRequestSuccess({ userId: data.userId }))
      history.push(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestFaild(errorMessage))
      } else {
        dispatch(authRequestFaild(error.message))
      }
    }
  }

export const singUp = (payload) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.userId }))
    history.push('/furniturs')
  } catch (error) {
    dispatch(authRequestFaild(error.message))
  }
}

export const getUpdateUserData = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested())
  try {
    const content = await userService.getUpdateCurrentUser(payload)
    dispatch(userUpdate(content))
    history.push(`/users/${content._id}`)
  } catch (error) {
    dispatch(userUpdateFailed(error.message))
  }
}

// function createUser(payload) {
//   return async function (dispatch) {
//     dispatch(userCreateRequested())
//     try {
//       const content = await userService.create(payload)
//       console.log(content)
//       dispatch(userCreated(content))
//       history.push('/furniturs')
//     } catch (error) {
//       dispatch(createUserFailed(error.message))
//     }
//   }
// }

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const content = await userService.get()
    dispatch(usersReceved(content))
  } catch (error) {
    dispatch(usersReguestField())
  }
}

export const getUsers = () => (state) => state.users.entities

export const getUserloading = () => (state) => state.users.isLoading

export const getUsersById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId)
  }
}
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn

export const getDataStatusUser = () => (state) => state.users.dataLoaded

export const getCurrentUserId = () => (state) => state.users.auth.userId

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null
}

export const getAuthErrors = () => (state) => state.users.error

export default usersReducer
