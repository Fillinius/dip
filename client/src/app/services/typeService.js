import httpService from './http.service'

const typeEndPoind = 'types/'
const typeService = {
  get: async () => {
    const { data } = await httpService.get(typeEndPoind)
    return data
  },
}
export default typeService
