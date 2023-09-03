import httpService from './http.service'

const registrationProductEndPoind = 'registrationProduct/'

const registrationProductService = {
  registration: async (payload) => {
    const { data } = await httpService.post(
      registrationProductEndPoind,
      payload
    )
    console.log(data, 'service')
    return data
  },
}

export default registrationProductService
