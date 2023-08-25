const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    size: { type: String },
  },
  {
    timestamps: true,
  }
)
module.exports = model('Size', schema)
