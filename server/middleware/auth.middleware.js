const tokenService = require('../servises/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = tokenService.validateAccess(token)
    console.log('Decoder', data)
    req.user = data
    if (!data) {
      return res.status(401).json({ message: 'Unauthorized err' })
    }
    next()
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
