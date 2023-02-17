const express = require('express')
const router = require('./router/index')
const routerVideo = require('./router/video')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

// all 可匹配所有类型的请求
// app.all('/xxx', (req, res) => {
//   res.send('xxx')
// })

// 路由匹配支撑正则规则匹配
// app.get('/us?er', (req, res) => {
//   res.send(`${req.method}---${req.url}`)
// })

// 请求参数匹配, ':'后的名称，会作为params 存储对象的key,路径上的值，会作为其对应的value
// app.get('/user/:id', (req, res) => {
//   console.log(req.params)  // 路径参数存储位置  eg: { id: '5' }
//   res.send(`${req.method}---${req.url}`)
// })

// 同一请求路径有多个 ':'参数时，名称不可相同，否则后者会覆盖前者，如'/user/:id/video/:id', 最终获取数据为{ id: '9' }
// app.get('/user/:id/video/:vid', (req, res) => {
//   console.log(req.params)  // 路径参数存储位置  eg: { id: '5', vid: '9' }
//   res.send(`${req.method}---${req.url}`)
// })

// 路由的链式调用
// app
// .get('/user', (req, res) => {
//     res.send(`${req.method}--${req.url}`)
// })
// .post('/video', (req, res) => {
//     res.send(`${req.method}--${req.url}`)
// })

// 数据返回方法，可以使用链式调用
app
.get('/user', (req, res) => {
    // res.send(`${req.method}--${req.url}`)
    // res.download() // 数据下载
    // res.end()  // 数据返回结束
    // res.json()  // 以json方式返回数据
    // res.redirect()  // 路径重定向
    // res.render()  // 静态模板渲染
    // res.status()  // 设置状态码
    // res.sendStatus()  // 数据以状态码的形式返回给客户端

    // 链式调用
    res.status(200).json()
})
.post('/video', (req, res) => {
    res.send(`${req.method}--${req.url}`)
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
