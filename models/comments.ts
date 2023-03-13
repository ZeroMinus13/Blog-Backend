import { Schema, model } from 'mongoose'

const commentsSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Comments = model('comments', commentsSchema)
export default Comments
