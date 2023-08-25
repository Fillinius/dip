import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualitiesReducer from './qualities'
import furnitursReducer from './furniturs'
import usersReducer from './users'
import commentsReducer from './comments'

const rootReducers = combineReducers({
  qualities: qualitiesReducer,
  furniturs: furnitursReducer,
  users: usersReducer,
  comments: commentsReducer,
})

export function createStore() {
  return configureStore({
    reducer: rootReducers,
  })
}
