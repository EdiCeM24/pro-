import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  surName: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  profile: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minLength: [14, 'User mobile number must be at lease 14 digits.'],
    maxLength: [16, 'User mobile number must not exceed 16 digits.'],
  },
  password: {
    type: String,
  },
  token: { 
    type: String,
    required: true,
    unique: true,
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
