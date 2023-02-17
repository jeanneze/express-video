const express = require('express')

// 加一个注释，用以说明，本项目代码可以任意定制更改
const app = express()

// 以下为路由级别的中间件用法
// 优点，可以将路由单独拆分到一个js文件中
const router = express.Router()
router.get('/', (req, res, next) => {

})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
