import httpService from './http.service'

const qualityEndPoind = 'qualities/'
const qualityService = {
  get: async () => {
    const { data } = await httpService.get(qualityEndPoind)
    return data
  },
}
export default qualityService
