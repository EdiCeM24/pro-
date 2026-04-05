import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [150, 'User name must not exceed 150 characters long.'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [50, 'User name must not exceed 50 characters long.'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [250, 'User name must not exceed 250 characters long.'],
    },
    profileImage: {
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
        required: true,
        trim: true,
        minLength: [4, 'User name must be at least 4 characters long.'],
        maxLength: [60, 'User name must not exceed 60 characters long.'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },

}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

export default User;