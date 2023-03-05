'use strict';

const { Schema, model, Types } = require('mongoose'); // Erase if already required
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

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
