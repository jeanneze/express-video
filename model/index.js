const mongoose = require('mongoose');
const { mongoPath } = require('../config/config.default');
mongoose.set('strictQuery', true);

async function main() {
  await mongoose.connect(mongoPath);
}

main()
  .then((res) => {
    console.log('mongo链接成功');
  })
  .catch((err) => {
    console.log('mongo链接失败-->', err);
  });

module.exports = {
  User: mongoose.model('User', require('./userModel')),
};
