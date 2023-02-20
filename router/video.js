const express = require('express')
const router = express.Router()

const videoController = require('../controller/videoController')
const vodController = require('../controller/vodController')
const { verifyToken } = require('../util/jwt');
const { videoValidator } = require('../middleware/validator/videoValidator')

router
.get('/likeList', verifyToken(), videoController.likeList)
.get('/dislike/:videoId', verifyToken(), videoController.dislikeVideo)
.get('/like/:videoId', verifyToken(), videoController.likeVideo)
.delete('/comment/:videoId/:commentId', verifyToken(), videoController.deleteComment)
.get('/commentList/:videoId', videoController.commentList)
.post('/comment/:videoId', verifyToken(), videoController.comment)
.get('/videoList', videoController.videoList)
.get('/video/:videoId', verifyToken(false), videoController.video)
.get('/getVod', verifyToken(), vodController.getVod)
.post('/createVideo', verifyToken(), videoValidator, videoController.createVideo)

module.exports = router