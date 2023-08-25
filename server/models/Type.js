const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    type: { type: String },
  },
  {
    timestamps: true,
  }
)
module.exports = model('Type', schema)
