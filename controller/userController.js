const fs = require('fs')
const { promisify } = require('util')
const { User } = require('../model/index')
const { createToken } = require('../util/jwt')

const rename = promisify(fs.rename)

// 用户注册
exports.register = async (req, res) => {
    console.log(req.body)
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    const user = dbBack.toJSON()
    delete user.password
    res.status(201).json({
        user
    })
}

// 用户登录
exports.login = async (req, res) => {
    // 客户端数据验证
    // 链接数据库查询
    let dbBack = await User.findOne(req.body)
    if (!dbBack) {
        res.status(402).json({ error: '邮箱或者密码不正确' })
    }
    // vscode 生成uuid --> shift + command + p
    // 数据返回
    dbBack = dbBack.toJSON()
    // dbBack.token = jwt.sign(dbBack, '0e07ff47-c174-4f28-94f1-70012a435318')
    dbBack.token = await createToken(dbBack)
    res.status(200).json(dbBack)
}

// 用户修改
exports.update = async (req, res) => {
    // console.log(req.user.userInfo._id)
    const id = req.user.userInfo._id;
    const dbBack = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(202).json({ user: dbBack })
}

// 用户头像上传
exports.headImg = async (req, res) => {
    console.log(req.file)
    // {
    //     fieldname: 'headImg',
    //     originalname: '��_20211222175541.png',
    //     encoding: '7bit',
    //     mimetype: 'image/png',
    //     destination: 'public/',
    //     filename: 'ca27bb1bcd952f3a2efb0fa25c71b906',
    //     path: 'public/ca27bb1bcd952f3a2efb0fa25c71b906',
    //     size: 79145
    //   }
    let fillArr = req.file.originalname.split('.');
    const fileType = fillArr[fillArr.length - 1];
    console.log(fileType)
   
    try {
       await rename('./public/' + req.file.filename, './public/' + req.file.filename + '.' + fileType)
       res.status(201).json({ filePath: req.file.filename + '.' + fileType })
    } catch(err) {
        res.status(500).json({ error: err })
    }
}


exports.list = async (req, res) => {
    console.log(req.user)
    res.send('/user-list')
}


exports.delete = async (req, res) => {
    console.log(`${req.method}`)
    res.send('/delete-list')
}