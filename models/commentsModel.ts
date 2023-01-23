import mongoose, { Schema } from 'mongoose';

interface Comment {
  username: string;
  title: string;
  content: string;
  createdAt: Date;
}

const commentsSchema = new Schema({
  username: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comments = mongoose.model<Comment>('Comments', commentsSchema);
export default Comments;