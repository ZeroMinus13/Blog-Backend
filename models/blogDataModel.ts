import { Schema, model } from 'mongoose'

interface Blogs {
  title: string
  content: string
  createdAt: Date
  comments: string[]
}

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
})

const Blogdata = model<Blogs>('BlogData', blogSchema)
export default Blogdata
