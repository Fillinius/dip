import { createAction, createSlice } from '@reduxjs/toolkit';
// import basketService from '../services/basketService';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    entities: [],
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
      state.entities = state.entities.concat(action.payload)
    },
    itemRemove: (state, action) => {
      state.entities = state.entities.filter(
        (state) => state._id !== action.payload
      )
    },
    cleaningBasket: (state) => {
      state.entities = []
    }
  },
}
)
const { reducer: basketReducer, actions } = basketSlice
const {
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

export const getbasket = () => (state) => state.basket.entities

export const getbasketLoading = () => (state) => state.basket.isLoading

export const createItemBasket = (payload) => async (dispatch) => {
  dispatch(basketCreateItemRequested())
  try {
    dispatch(basketCreatedItem(payload))
  } catch (error) {
    dispatch(basketCreateItemFailed(error.message))
  }
}

export const removeItemBasket = (id) => async (dispatch) => {
  dispatch(itemRemoveRequested())
  try {
    dispatch(itemRemove(id))
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
