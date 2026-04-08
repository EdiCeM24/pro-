import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const adminSchema = sequelize.define('admintable', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    required: true,
    trim: true,
    allowNull: false,
  },
  surName: {
     type: DataTypes.STRING,
    required: true,
    trim: true,
    allowNull: false,
  },
  username: {
     type: DataTypes.STRING,
    required: true,
    trim: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
    trim: true,
    allowNull: false,
  },
  profile: {
    type: DataTypes.BLOB,
    required: true,
    unique: true,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
    minLength: [14, 'User mobile number must be at lease 14 digits.'],
    maxLength: [16, 'User mobile number must not exceed 16 digits.'],
    unique: true, // Prevents duplicate phone numbers
      validate: {
      // Basic validation: ensure it's 10-15 digits
      len: [10, 15], 
      // Ensure only digits, '+', '(', ')', and '-' are allowed
      // is: /^[0-9+()-\s]+$/i,
      // Optional: Custom validation for E.164 format (e.g., +1234567890)
      is: /^\+[1-9]\d{1,15}$/ 
    },
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  token: { 
    type: DataTypes.STRING,
    required: true,
    unique: true,
    default: null,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    default: "admin",
  },
}, {timestamps: true});

const Admin = adminSchema;

export default Admin;

