const express = require('express')
const router = require('./router/index')
const routerVideo = require('./router/video')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

// app.use(router)

//  路由加前缀
app.use('/user', router)
app.use('/video', routerVideo)

// 前面所有路由都没有匹配到，执行下列路由
app.use((req, res, next) => {
  res.status(404).send('404 Not Found!')
})

// 错误处理的中间件, 回调函数如果有4个参数，会默认为是错误处理的函数
app.use((err, req, res, next) => {
   console.log('报错信息:', err)
   res.status(500).send('Service Error')
})


const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
