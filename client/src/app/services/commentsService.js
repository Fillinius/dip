import httpService from './http.service'

const commentEndPoind = 'comments/'
const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.post(commentEndPoind, payload)
    return data
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndPoind, {
      orderBy: 'pageId',
      equalTo: `${pageId}`,
    })
    return data
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndPoind + commentId)
    return data
  },
}
export default commentService
