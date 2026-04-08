import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const userSchema = sequelize.define("usertables", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        required: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [150, 'User name must not exceed 150 characters long.'],
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        trim: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [50, 'User name must not exceed 50 characters long.'],
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        trim: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [250, 'User name must not exceed 250 characters long.'],
        allowNull: false
    },
    profileImage: {
        type: DataTypes.BLOB,
        required: true,
        unique: true,
        allowNull: false
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
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        trim: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [60, 'User name must not exceed 60 characters long.'],
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user' // 'admin'
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'Order',
        key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        required: true,
        default: false,
        allowNull: false
    },

}, {timestamps: true});

const User = userSchema;

export default User;