const mongoose = require('../db/conn')
const {Schema} = mongoose
const User = require('./User')

const FavoriteList = mongoose.model(
    'FavoriteList',
    new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        user: Object,
        adopter: Object
    },
{timestamps: true})
)

module.exports = FavoriteList