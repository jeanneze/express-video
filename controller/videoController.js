const { Video, VideoComment, VideoLike, Subscribe } = require('../model/index');

exports.videoList = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body;
  const videoList = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 }) // 根据创建时间倒序
    .populate('user'); // 关联模型，查询展示对应模型数据

  const videoCount = await Video.countDocuments(); // 获取video条数
  res.status(200).json({ videoList, videoCount });
};

exports.video = async (req, res) => {
  // console.log(req.params) // 获取路径参数
  const { videoId } = req.params;
  let videoInfo = await Video.findById(videoId).populate(
    'user',
    '_id username cover'
  ); // 第二个参数，所需展示字符key，用空格分隔的字符串

  videoInfo = videoInfo.toJSON()
  videoInfo.isLike = false
  videoInfo.isDislike = false
  videoInfo.isSubscribe = false

  if (req.user.userInfo) {
    const userId = req.user.userInfo._id
    if (await VideoLike.findOne({
        user: userId,
        video: videoId,
        like: 1
    })) {
        videoInfo.isLike = true
    }

    if (await VideoLike.findOne({
        user: userId,
        video: videoId,
        like: -1
    })) {
        videoInfo.isDislike = true
    }

    if (await Subscribe.findOne({
        user: userId,
        channel: videoInfo.user._id
    })) {
        videoInfo.isSubscribe = true
    }
  }
  res.status(200).json(videoInfo);
};

exports.createVideo = async (req, res) => {
  let body = req.body;
  body.user = req.user.userInfo._id;
  const videoModel = new Video(body);
  try {
    const dbBack = await videoModel.save(); // 存储入mongodb
    res.status(201).json({ dbBack });
  } catch (err) {
    res.status(500).json({ error: err });
  }
  // console.log(req.body)
  // res.send(req.body)
};

exports.comment = async (req, res) => {
  const { videoId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: '视频不存在' });
  }
  const comment = await new VideoComment({
    content: req.body.content,
    video: videoId,
    user: req.user.userInfo._id,
  }).save();
  videoInfo.commentCount++;
  await videoInfo.save();
  res.status(201).json(comment);
};

exports.commentList = async (req, res) => {
  const videoId = req.params.videoId;
  const { pageNum = 1, pageSize = 10 } = req.body;
  const comments = await VideoComment.find({
    video: videoId,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate('user', '_id username image');

  const commentCount = await VideoComment.countDocuments({ video: videoId });
  res.status(200).json({ comments, commentCount });
};

exports.deleteComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const videoInfo = await Video.findById(videoId);
  if (!videoInfo) {
    return res.status(404).json({ error: '视频不存在' });
  }
  const comment = await VideoComment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ error: '评论不存在' });
  }
  if (!comment.user.equals(req.user.userInfo._id)) {
    return res.status(403).json({ error: '评论不可删除' });
  }
  await comment.remove();
  videoInfo.commentCount--;
  await videoInfo.save();
  res.status(200).json({ msg: '删除成功' });
};

exports.likeVideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.userInfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ error: '视频不存在' });
  }
  let doc = await VideoLike.findOne({
    user: userId,
    video: videoId,
  });

  let isLike = true;

  if (doc && doc.like === 1) {
    await doc.remove();
    isLike = false;
  } else if (doc && doc.like === -1) {
    doc.like = 1;
    await doc.save();
  } else {
    await new VideoLike({
      user: userId,
      video: videoId,
      like: 1,
    }).save();
    isLike = false;
  }

  video.likeCount = await VideoLike.countDocuments({
    video: videoId,
    like: 1,
  });

  video.dislikeCount = await VideoLike.countDocuments({
    video: videoId,
    like: -1,
  });

  await video.save();

  res.status(200).json({
    ...video.toJSON(),
    isLike,
  });
};

exports.dislikeVideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.userInfo._id;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ error: '视频不存在' });
  }
  let doc = await VideoLike.findOne({
    user: userId,
    video: videoId,
  });

  let isDislike = true;

  if (doc && doc.like === -1) {
    await doc.remove();
  } else if (doc && doc.like === 1) {
    doc.like = -1;
    await doc.save();
    isDislike = false;
  } else {
    await new VideoLike({
      user: userId,
      video: videoId,
      like: -1,
    }).save();
    isDislike = false;
  }

  video.likeCount = await VideoLike.countDocuments({
    video: videoId,
    like: 1,
  });

  video.dislikeCount = await VideoLike.countDocuments({
    video: videoId,
    like: -1,
  });

  await video.save();

  res.status(200).json({
    ...video.toJSON(),
    isDislike,
  });
};

exports.likeList = async (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.body;
  let likes = await VideoLike.find({
    like: 1,
    user: req.user.userInfo._id,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .populate('video', '_id vodVideoId user');

    let likeCount = await VideoLike.countDocuments({
        like: 1,
        user: req.user.userInfo._id,
    })

  res.status(200).json({
    likes,
    likeCount
  });
};
