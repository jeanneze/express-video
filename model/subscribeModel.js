const mongoose = require('mongoose')
const md5 = require('../util/md5')
const baseModel = require('./baseModel')
// 数据模型
const subscribeSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'  // 关联表/模型
    },
    channel: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'  // 关联表/模型
    },
    ...baseModel
})

module.exports = subscribeSchema