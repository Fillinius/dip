import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities'
import furnitursReducer from './furniturs'
import usersReducer from './users'
import commentsReducer from './comments'
import basketReducer from './basket'

const rootReducers = combineReducers({
  qualities: qualitiesReducer,
  furniturs: furnitursReducer,
  users: usersReducer,
  comments: commentsReducer,
  basket: basketReducer,
})

export function createStore() {
  return configureStore({
    reducer: rootReducers,
  })
}
