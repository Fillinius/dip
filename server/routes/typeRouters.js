const express = require('express')
const router = express.Router({ mergeParams: true })
const Types = require('../models/Type')

router.get('/', async (req, res) => {
  try {
    const types = await Types.find()
    res.status(200).send(types)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

module.exports = router
