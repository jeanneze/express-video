const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

async function main () {
   await mongoose.connect('mongodb://localhost:27017/mytest')
}

main().then(res => {
    console.log('mongo链接成功')
}).catch(err => {
    console.log('mongo链接失败-->', err)
})

// 创建集合/模型
const user = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

// 使用集合
const userModel = mongoose.model('User', user)

const u = new userModel({
    username: 'lisi',
    age: 18
})

u.save()