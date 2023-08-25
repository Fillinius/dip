const express = require('express')
const Size = require('../models/Size')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const sizes = await Size.find()
    res.status(200).send(sizes)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

module.exports = router
