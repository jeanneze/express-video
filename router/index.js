const express = require('express')

const router = express.Router()

// router.get('/', (req, res, next) => {
//     console.log(req.method)
//     res.send('/index')
// })

// router.get('/user', (req, res, next) => {
//     console.log(req.method)
//     res.send('/user')
// })
router.use('/user', require('./user'))
router.use('/video', require('./video'))


module.exports = router