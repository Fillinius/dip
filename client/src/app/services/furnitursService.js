import httpService from './http.service'

const furnitureEndPoint = 'furniturs/'

const furnitursService = {
  get: async () => {
    const { data } = await httpService.get(furnitureEndPoint)
    return data
  },
  removeFurniturs: async (furnitureId) => {
    const { data } = await httpService.delete(furnitureEndPoint + furnitureId)
    return data
  },
  getUpdateFurniturs: async (payload, furnitureId) => {
    const { data } = await httpService.patch(
      furnitureEndPoint + furnitureId,
      payload
    )
    return data
  },
  getFurnitursByBasket: async () => {
    const { data } = await httpService.get(furnitureEndPoint)
    return data
  },
}

export default furnitursService
