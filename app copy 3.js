const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

const PORT = process.env.PORT || 3005

// 以下为应用级别的中间件用法
// app.use((req, res, next) => {
  
// })

// 请求中间件
// app.get('/user', (req, res, next) => {
  
// })

// 请求中间件，可在请求中拦截、处理所需逻辑
// app.get('/user', (req, res, next) => {
//   console.log(req.method)
//   next() // 仅针对/user路由处理
// }, (req, res, next) => {
//    console.log('666')
//    next()
// })

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
