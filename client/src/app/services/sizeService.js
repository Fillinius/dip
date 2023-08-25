import httpService from './http.service'

const sizeEndPoind = 'sizes/'
const sizeService = {
  get: async () => {
    const { data } = await httpService.get(sizeEndPoind)
    return data
  },
}
export default sizeService
