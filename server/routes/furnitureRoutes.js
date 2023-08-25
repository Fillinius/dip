const express = require('express')
const Furniture = require('../models/Furniture')
const auth = require('../middleware/auth.middleware')
const { generateData } = require('../utils/helpers')
const router = express.Router({ mergeParams: true })

// Получение карточки
router.get('/', async (req, res) => {
  try {
    const furniture = await Furniture.find()
    res.status(200).send(furniture)
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

// Создание карточки furniture
router.post('/', async (req, res) => {
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
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

// изменение карточки по id
router.patch('/:furnitureId', auth, async (req, res) => {
  try {
    const { furnitureId } = req.params
    console.log(req.furniture)
    if (furnitureId === req.furniture._id) {
      const updatedFurniture = await Furniture.findByIdAndUpdate(
        furnitureId,
        req.body,
        { new: true }
      )
      res.status(201).send(updatedFurniture)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

// Удаление карточки товара
router.delete('/:remove', auth, async (req, res) => {
  try {
    const { remove } = req.params
    const removeFurniture = await Furniture.findById(remove)
    await removeFurniture.remove()
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    })
  }
})

module.exports = router
