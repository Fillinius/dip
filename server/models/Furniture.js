const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    vendor_code: { type: String, require: true },
    name: { type: String },
    type: { type: String },
    image: { type: String },
    sizes: [{ type: String }],
    qualities: [{ type: String }],
    price: Number,
  },
  {
    timestamps: true,
  }
)
module.exports = model('Furnitur', schema)
