import { createSlice } from '@reduxjs/toolkit'
import furnitursService from '../services/furnitursService'

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
  },
})

const { reducer: furnitursReducer, actions } = furnitursSlice
const { furnitursRequested, furnitursRecived, furnitursRequestFiled } = actions

export const loadFurnitursList = () => async (dispatch) => {
  dispatch(furnitursRequested())
  try {
    const content = await furnitursService.get()
    dispatch(furnitursRecived(content))
  } catch (error) {
    dispatch(furnitursRequestFiled(error))
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
