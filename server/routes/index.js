const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./authRoutes'))
router.use('/types', require('./typeRouters'))
router.use('/qualities', require('./qualityRoutes'))
router.use('/sizes', require('./sizeRouters'))
router.use('/users', require('./userRoutes'))
router.use('/furniturs', require('./furnitureRoutes'))
router.use('/comments', require('./commentRoutes'))

module.exports = router
