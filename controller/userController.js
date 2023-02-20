const fs = require('fs');
const { promisify } = require('util');
const lodash = require('lodash');

const { User, Subscribe } = require('../model/index');
const { createToken } = require('../util/jwt');

const rename = promisify(fs.rename);

// 用户注册
exports.register = async (req, res) => {
  console.log(req.body);
  const userModel = new User(req.body);
  const dbBack = await userModel.save();
  const user = dbBack.toJSON();
  delete user.password;
  res.status(201).json({
    user,
  });
};

// 用户登录
exports.login = async (req, res) => {
  // 客户端数据验证
  // 链接数据库查询
  let dbBack = await User.findOne(req.body);
  if (!dbBack) {
    res.status(402).json({ error: '邮箱或者密码不正确' });
  }
  // vscode 生成uuid --> shift + command + p
  // 数据返回
  dbBack = dbBack.toJSON();
  // dbBack.token = jwt.sign(dbBack, '0e07ff47-c174-4f28-94f1-70012a435318')
  dbBack.token = await createToken(dbBack);
  res.status(200).json(dbBack);
};

// 用户修改
exports.update = async (req, res) => {
  // console.log(req.user.userInfo._id)
  const id = req.user.userInfo._id;
  const dbBack = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(202).json({ user: dbBack });
};

// 用户头像上传
exports.headImg = async (req, res) => {
  console.log(req.file);
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
  console.log(fileType);

  try {
    await rename(
      './public/' + req.file.filename,
      './public/' + req.file.filename + '.' + fileType
    );
    res.status(201).json({ filePath: req.file.filename + '.' + fileType });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.subscribe = async (req, res) => {
  const userId = req.user.userInfo._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ error: '不能关注自己' });
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId,
  });
  if (!record) {
    await new Subscribe({
      user: userId,
      channel: channelId,
    }).save();
    const user = await User.findById(channelId);
    user.subscribeCount++;
    await user.save();
    res.status(200).json({ msg: '关注成功' });
  } else {
    res.status(401).json({ error: '已经订阅了此频道' });
  }
};

exports.unsubscribe = async (req, res) => {
  const userId = req.user.userInfo._id;
  const channelId = req.params.userId;
  if (userId === channelId) {
    return res.status(401).json({ error: '不能取消关注自己' });
  }
  const record = await Subscribe.findOne({
    user: userId,
    channel: channelId,
  });
  if (record) {
    await record.remove();
    const user = await User.findById(channelId);
    user.subscribeCount--;
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: '没有订阅了此频道' });
  }
};

exports.getUser = async (req, res) => {
  let isSubscribe = false;
  if (req.user) {
    const record = await Subscribe.findOne({
      channel: req.params.userId,
      user: req.user.userInfo._id,
    });
    if (record) {
      isSubscribe = true;
    }

    const user = await User.findById(req.params.userId);
    //    user.isSubscribe = isSubscribe
    res.status(200).json({
      ...lodash.pick(user, [
        '_id',
        'username',
        'image',
        'subscribeCount',
        'cover',
        'channelDesc',
      ]),
      isSubscribe,
    });
  }
};

exports.getSubscribe = async (req, res) => {
  let subscribeList = await Subscribe.find({
    user: req.params.userId,
  }).populate('channel');
  subscribeList = subscribeList.map((item) => {
    return lodash.pick(item.channel, [
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channelDesc',
    ]);
  });
  res.status(200).json(subscribeList);
};

exports.getChannel = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body;
  let channelList = await Subscribe.find({
    channel: req.user.userInfo._id,
  })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate('user');
  channelList = channelList.map((item) => {
    return lodash.pick(item.user, [
      '_id',
      'username',
      'image',
      'subscribeCount',
      'cover',
      'channelDesc',
    ]);
  });
  res.status(200).json(channelList);
};

exports.list = async (req, res) => {
  console.log(req.user);
  res.send('/user-list');
};

exports.delete = async (req, res) => {
  console.log(`${req.method}`);
  res.send('/delete-list');
};
