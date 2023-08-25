const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)
module.exports = model('User', schema)
