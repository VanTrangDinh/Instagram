'use strict';

const { Schema, model, Types } = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';
// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name'],
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, 'Please enter email'],
            unique: [true, 'Email already exists'],
        },
        username: {
            type: String,
            required: [true, 'Please enter username'],
            minlength: [6, 'Username must be of minimum 6 characters'],
            unique: [true, 'Username already exists'],
        },
        password: {
            type: String,
            required: [true, 'Please enter password'],
            minlength: [6, 'Password must be of minimum 6 characters'],
            select: false,
        },
        avatar: {
            type: String,
        },
        bio: {
            type: String,
            default: 'Welcome to my profile',
        },
        website: {
            type: String,
            trim: true,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        saved: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    },
);

// add plugin that converts mongoose to json

//Check if email is taken
//@param {string} email - The user's email
//@param {ObjectId} [excludeUserId] - The id of the user to be excluded
//@returns {Promise<boolean>}

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } }).lean();
    return !!user; //if user is true => return true
};

userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } }).lean();
    return !!user;
};

/**
 * logIn
 * Check if password matches the user's password
 * param {string} password
 * returns {Promise<boolean>}
 */

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};
//Save password

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

//Export the model

module.exports = model(DOCUMENT_NAME, userSchema);
