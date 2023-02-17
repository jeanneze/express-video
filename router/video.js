const express = require('express')

const router = express.Router()

router
.get('/lists', (req, res, next) => {
    console.log(req.method)
    // JSON.parse('(')
    res.send('/video-list')
})
.get('/users', (req, res, next) => {
    console.log(req.method)
    res.send('/users')
})

module.exports = router