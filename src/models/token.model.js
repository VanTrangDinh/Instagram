'use strict';
const { tokenTypes } = require('../configs/config.token');
const { Schema, model, Types } = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'Token';
const COLLECTION_NAME = 'Tokens';
var tokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    },
);

//Export the model

module.exports = model(DOCUMENT_NAME, tokenSchema);
