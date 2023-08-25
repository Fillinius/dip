import httpService from './http.service'

const furnitureEndPoint = 'furniturs/'

const furnitursService = {
  get: async () => {
    const { data } = await httpService.get(furnitureEndPoint)
    return data
  },
}

export default furnitursService
