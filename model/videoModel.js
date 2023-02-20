const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')
// 数据模型
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    vodVideoId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    cover: {
        type: String,
        default: false
    },
    commentCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    dislikeCount: {
        type: Number,
        default: 0
    },
    ...baseModel
})

module.exports = videoSchema