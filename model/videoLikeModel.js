const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')
// 数据模型
const videoLikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    video: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Video'
    },
    like: {
        type: Number,
        enum: [1, -1],
        required: true
    },
    ...baseModel
})

module.exports = videoLikeSchema