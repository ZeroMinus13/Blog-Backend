import { Schema, model } from 'mongoose'

interface Comment {
  username: string
  content: string
  createdAt: Date
}

const commentsSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Comments = model<Comment>('comments', commentsSchema)
export default Comments
