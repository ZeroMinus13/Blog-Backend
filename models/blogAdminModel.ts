import mongoose, { Schema } from 'mongoose';

interface AdminTS {
  username: string;
  password: string;
}
const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model<AdminTS>('Admin', adminSchema);
export default Admin;
