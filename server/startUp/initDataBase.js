const qualitiesMock = require('../mock/qualities.json')
const sizeMock = require('../mock/size.json')
const typeMock = require('../mock/type.json')
const Quality = require('../models/Quality')
const Type = require('../models/Type')
const Size = require('../models/Size')

module.exports = async () => {
  const types = await Type.find()
  if (types.length !== typeMock.length) {
    await createInitialEntity(Type, typeMock)
  }
  const sizes = await Size.find()
  if (sizes.length !== sizeMock.length) {
    await createInitialEntity(Size, sizeMock)
  }
  const qualities = await Quality.find()
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async (item) => {
      console.log(item, 'item')
      try {
        // строку item.Id закоментировать если нужны id как в мок данных
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (error) {
        console.log(error.message)
        return error
      }
    })
  )
}
