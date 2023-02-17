const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { uuid } = require('../config/config.default')
const toJwt = promisify(jwt.sign);
const verify = promisify(jwt.verify);
// 生成token
// const token = jwt.sign({ foo: 'hello' }, '555')
// console.log(token)
// 验证生成token
// const jwtRes = jwt.verify(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJoZWxsbyIsImlhdCI6MTY3NjYxOTQxMH0.wVVGZUP5VQSHNSA_B62wC-1qEtEBFFAwNn-h5ZbzIAU',
//     '555'
// )
// console.log(jwtRes)

module.exports.createToken = async (userInfo) => {
  return await toJwt({ userInfo }, uuid, {
    expiresIn: 60 * 60 * 24,
  });
};

module.exports.verifyToken = async (req, res, next) => {
//    console.log(req.headers.authorization)
   let token = req.headers.authorization;
   token = token ? token.split('Bearer ')[1] : null;
   if (!token) {
      res.status(402).json({ error: '请传入token' })
   }
   try {
     const userInfo = await verify(token, uuid)
     req.user = userInfo
   } catch(err) {
     res.status(402).json({ error: '无效的token' })
   }
   next()
}
