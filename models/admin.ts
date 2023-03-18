import { Schema, model } from 'mongoose'

const adminSchema = new Schema({
  username: { type: String, unique: true, minLength: 3 },
  password: { type: String, required: true, minLength: 3 },
  createdAt: { type: Date, default: Date.now },
})

const Admin = model('Admin', adminSchema)

export default Admin
