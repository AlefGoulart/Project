const mongoose = require('../db/conn')
const {Schema} = mongoose
const User = require('./User')

const FavoriteList = mongoose.model(
    'FavoriteList',
    new Schema({
        title: {
            type: String,
            required: true
        }
    },
{timestamps: true})
)

FavoriteList.belongsTo(User)
User.hasMany(FavoriteList)

module.exports = User