const express = require('express')
const cors = require('cors')
const morgan = require('morgan')  // 日志收集

const router = require('./router')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))
app.use(cors())
app.use(morgan('dev'))
app.use('/api/v1', router)   // '/api/v1' 为路由前缀


const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
