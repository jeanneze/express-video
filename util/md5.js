const crypto = require('crypto')
// console.log(crypto)
// const d = crypto.createHash('md5').update('zj'+'123').digest('hex')
// console.log(d)

// md5加密
module.exports = str => {
   return crypto.createHash('md5')
            .update('zj'+ str)
            .digest('hex')
}
