const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    content: { type: String, require: true },
    // на чьей стр находится коммент
    pageId: { type: Schema.Types.ObjectId, ref: 'Furnitur', require: true },
    // кто оставил коммент
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  },
  {
    timestamps: { createdAt: 'create_at' },
  }
)
module.exports = model('Comment', schema)
