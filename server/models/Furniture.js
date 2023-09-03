const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    vendor_code: { type: String, require: true },
    name: { type: String },
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    image: { type: String },
    sizes: [{ type: Schema.Types.ObjectId, ref: 'Size' }],
    qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
    price: Number,
  },
  {
    timestamps: true,
  }
)
module.exports = model('Furnitur', schema)
