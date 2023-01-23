import mongoose, { Schema } from 'mongoose';

interface Blogs {
  title: string;
  content: string;
  createdAt: Date;
}

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  comments: { type: Schema.Types.ObjectId, ref: 'Comments' },
});

const Blogdata = mongoose.model<Blogs>('BlogData', blogSchema);
export default Blogdata;
