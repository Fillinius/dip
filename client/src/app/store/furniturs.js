import { createAction, createSlice } from '@reduxjs/toolkit'
import furnitursService from '../services/furnitursService'
import registrationProductService from '../services/registrationProductService'
import history from '../utils/history'

const furnitursSlice = createSlice({
  name: 'furniturs',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    dataLoaded: false,
  },
  reducers: {
    furnitursRequested: (state) => {
      state.isLoading = true
    },
    furnitursRecived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    furnitursRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    furnitursRegistration: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [...state.entities, state.entities]
      }
      state.entities.push(action.payload)
    },
    furnitursRemove: (state, action) => {
      state.entities = state.entities.filter(
        (state) => state._id !== action.payload
      )
    },
    furnitursUpdate: (state, action) => {
      state.entities[
        state.entities.findIndex((f) => f._id === action.payload._id)
      ] = action.payload
    },
  },
})

const { reducer: furnitursReducer, actions } = furnitursSlice
const {
  furnitursRequested,
  furnitursRecived,
  furnitursRequestFiled,
  furnitursRegistration,
  furnitursUpdate,
  furnitursRemove,
} = actions
const registrationRequested = createAction('furniturs/registrationRequested')
const registrationRequestFaild = createAction(
  'furniturs/registrationRequestFaild'
)
const furnitursRemoveRequested = createAction(
  'furniturs/furnitursRemoveRequested'
)
const furnitursRemoveFailed = createAction('furniturs/furnitursRemoveFailed')
const furnitursUdateRequested = createAction(
  'furniturs/furnitursUdateRequested'
)
const furnitursUpdateFailed = createAction('furniturs/furnitursUpdateFailed')

export const loadFurnitursList = () => async (dispatch) => {
  dispatch(furnitursRequested())
  try {
    const content = await furnitursService.get()
    dispatch(furnitursRecived(content))
  } catch (error) {
    dispatch(furnitursRequestFiled(error))
  }
}
export const registrationFurniturs = (payload) => async (dispatch) => {
  dispatch(registrationRequested())
  try {
    const data = await registrationProductService.registration(payload)
    dispatch(furnitursRegistration(data))
    history.push('/furniturs')
  } catch (error) {
    dispatch(registrationRequestFaild(error.message))
  }
}
export const getUpdateFurnitursData =
  (payload, furnitureId) => async (dispatch) => {
    dispatch(furnitursUdateRequested())
    try {
      const data = await furnitursService.getUpdateFurniturs(
        payload,
        furnitureId
      )
      dispatch(furnitursUpdate(data))
      history.push(`/furniturs/${data._id}`)
    } catch (error) {
      dispatch(furnitursUpdateFailed(error.message))
    }
  }

export const removeFurniturs = (id) => async (dispatch) => {
  dispatch(furnitursRemoveRequested())
  try {
    const data = await furnitursService.removeFurniturs(id)
    if (!data) {
      dispatch(furnitursRemove(id))
    }
  } catch (error) {
    dispatch(furnitursRemoveFailed(error.message))
  }
}

export const getFurniturs = () => (state) => state.furniturs.entities
export const getFurnitursLoading = () => (state) => state.furniturs.isLoading
export const getFurnitursById = (furnitureId) => (state) => {
  if (state.furniturs.entities) {
    return state.furniturs.entities.find((f) => f._id === furnitureId)
  }
}

export const getDataStatusFurnitur = () => (state) => state.furniturs.dataLoaded

export default furnitursReducer
