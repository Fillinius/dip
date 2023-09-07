const express = require('express')
const auth = require('../middleware/auth.middleware')
const Furniture = require('../models/Furniture')
const { generateData } = require('../utils/helpers')
const router = express.Router({ mergeParams: true })

// /api/registationProduct
router.route('/').post(async (req, res) => {
  try {
    const { vendor_code, name } = req.body

    const existingName = await Furniture.findOne({ vendor_code })

    if (existingName) {
      return res.status(400).json({
        error: {
          message: 'VENDOR_CODE EXISTS',
          code: 400,
        },
      })
    }

    const newFurniture = await Furniture.create({
      ...generateData(),
      ...req.body,
    })

    res.status(201).send(newFurniture)
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже 11',
    })
  }
})

module.exports = router
