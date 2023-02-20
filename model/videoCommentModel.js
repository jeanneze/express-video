const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')
// 数据模型
const videoCommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    video: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Video'
    },
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    ...baseModel
})

module.exports = videoCommentSchema