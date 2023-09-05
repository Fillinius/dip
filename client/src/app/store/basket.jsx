import { createAction, createSlice } from '@reduxjs/toolkit';
import basketService from '../services/basketService';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true
    },
    basketReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    basketReguestField: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    basketCreatedItem: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [...state.entities, state.entities]
      }
      state.entities.push(action.payload)
    },
    itemRemove: (state, action) => {
      state.entities = state.entities.filter(
        (state) => state._id !== action.payload
      )
    },
    cleaningBasket: (state) => {
      state.entities = null
    }
  },
}
)
const { reducer: basketReducer, actions } = basketSlice
const {
  basketRequested,
  basketReceved,
  basketReguestField,
  basketCreatedItem,
  itemRemove,
  cleaningBasket
} = actions

const basketCreateItemRequested = createAction('basket/basketCreateItemRequested')
const basketCreateItemFailed = createAction('basket/basketCreateItemFailed')
const itemRemoveRequested = createAction('basket/itemRemoveRequested')
const itemRemoveFailed = createAction('basket/itemRemoveFailed')
const cleaningBasketRequested = createAction('basket/cleaningBasketRequested')
const cleaningBasketFailed = createAction('basket/cleaningBasketFailed')

export const loadbasketList = (userId) => async (dispatch) => {
  dispatch(basketRequested())
  try {
    const data = await basketService.createItem(userId)
    dispatch(basketReceved(data))
  } catch (error) {
    dispatch(basketReguestField(error.message))
  }
}
export const getbasket = () => (state) => state.basket.entities

export const getbasketLoading = () => (state) => state.basket.isLoading

export const createItemBasket = (payload) => async (dispatch) => {
  dispatch(basketCreateItemRequested())
  try {
    const data = await basketService.createItem(payload)
    dispatch(basketCreatedItem(data))
  } catch (error) {
    dispatch(basketCreateItemFailed(error.message))
  }
}

export const removeItemBasket = (id) => async (dispatch) => {
  dispatch(itemRemoveRequested())
  try {
    const data = await basketService.removeItem(id)
    if (!data) {
      dispatch(itemRemove(id))
    }
  } catch (error) {
    dispatch(itemRemoveFailed(error.message))
  }
}

export const cleaningItemBasket = () => async (dispatch) => {
  dispatch(cleaningBasketRequested())
  try {
    dispatch(cleaningBasket())
  } catch (error) {
    dispatch(cleaningBasketFailed(error.message))
  }
}

export default basketReducer
