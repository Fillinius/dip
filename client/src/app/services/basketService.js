import httpService from './http.service'

const commentEndPoind = 'basket/'
const basketService = {
  createItem: async (payload) => {
    const { data } = await httpService.post(commentEndPoind, payload)
    return data
  },
  getItems: async (pageId) => {
    const { data } = await httpService.get(commentEndPoind, {
      orderBy: 'pageId',
      equalTo: `${pageId}`,
    })
    return data
  },
  removeItem: async (itemId) => {
    const { data } = await httpService.delete(commentEndPoind + itemId)
    return data
  },
}
export default basketService
